import { distinct, stringSort } from "@yadal/core";
import { HttpMethod } from "../index.js";
import { Route, RouteParameter } from "./Route.js";

export class RouteMatcher<T extends object> {
    readonly #root: RouteMatchNode<T>;

    constructor(routes: Iterable<Route<T>>) {
        this.#root = new RouteMatchTreeBuilder<T>()
            .add(...routes)
            .build();
    }

    match(method: HttpMethod, path: string) {
        return this.#root.match(method, path);
    }
}

class RouteMatchTreeBuilder<T> {
    readonly byExact: { [key: string]: RouteMatchTreeBuilder<T> } = {};
    readonly byPattern: { [key: string]: RouteMatchTreeBuilder<T> } = {};
    readonly byMethod: { [P in HttpMethod]?: Map<Route<T>, ReadonlyArray<RouteParameter<keyof T, T[keyof T]>>> } = {};

    build(): RouteMatchNode<T> {
        return new RouteMatchNode(this);
    }

    add(...routes: Route<T>[]) {
        for (const route of routes)
            this.#add(route, 0, []);
        return this;
    }

    #add(route: Route<T>, index: number, props: Array<RouteParameter<keyof T, T[keyof T]>>) {
        const segment = route[index];
        switch (typeof segment) {
            case 'string': {
                const next = this.byExact[segment] ??= new RouteMatchTreeBuilder();
                next.#add(route, index + 1, props);
                break;
            }
            case 'object': {
                const next = this.byPattern[segment.pattern.toString()] ??= new RouteMatchTreeBuilder();
                props.push(segment);
                next.#add(route, index + 1, props);
                break;
            }
            case 'undefined': {
                const byMethod = this.byMethod[route.method] ??= new Map();
                byMethod.set(route, props);
                break;
            }
        }
    }
}
class RouteMatchNode<T> {
    readonly #byExact: ReadonlyArray<{ readonly test: string; readonly next: RouteMatchNode<T> }>;
    readonly #byPattern: ReadonlyArray<{ readonly test: RegExp; readonly next: RouteMatchNode<T> }>;
    readonly #byMethod: {
        readonly [P in HttpMethod]?: ReadonlyMap<Route<T>, ReadonlyArray<RouteParameter<keyof T, T[keyof T]>>>
    };

    constructor(builder: RouteMatchTreeBuilder<T>) {
        this.#byMethod = { ...builder.byMethod };
        this.#byExact = Object.keys(builder.byExact)
            .sort(stringSort.byLength.descending)
            .map(test => ({
                test: test,
                next: builder.byExact[test]!.build()
            }));
        this.#byPattern = Object.keys(builder.byPattern)
            .sort(stringSort.byLength.descending)
            .map(test => ({
                test: new RegExp(test),
                next: builder.byExact[test]!.build()
            }))
    }

    * match(method: HttpMethod, path: string) {
        for (const { route, params, values } of this.#match(method, path, 0, [])) {
            const model = {} as { [P in keyof T]: T[P] };
            params.forEach((p, i) => model[p.key] = p.parse(values[i]!));
            yield { route, model };
        }
    }

    * #match(method: HttpMethod, path: string, index: number, values: string[]): Generator<{
        route: Route<T>;
        params: ReadonlyArray<RouteParameter<keyof T, T[keyof T]>>;
        values: string[];
    }> {
        if (index === path.length) {
            for (const [route, params] of this.#byMethod[method] ?? [])
                yield { route, params, values };
            return;
        }

        for (const { test, next } of this.#byExact) {
            const endIndex = this.#testLiteral(path, test, index)
            if (endIndex !== undefined)
                yield* next.#match(method, path, endIndex, values);
        }
        for (const { test, next } of this.#byPattern) {
            for (const { endIndex, value } of this.#testPattern(path, test, index, next)) {
                values.push(value);
                yield* next.#match(method, path, endIndex, values);
                values.pop();
            }
        }
    }

    #testLiteral(value: string, check: string, index: number) {
        if (value.length < check.length + index)
            return undefined;
        for (let i = 0; i < check.length; i++)
            if (value[i + index] !== check[i])
                return undefined;
        return index + check.length;
    }

    *#testPattern(value: string, check: RegExp, index: number, next: RouteMatchNode<T>) {
        for (const endIndex of distinct(this.#getSliceEndsForPattern(value, index, next))) {
            const v = value.slice(index, endIndex);
            if (check.test(v))
                yield { endIndex, value: v };
        }
    }

    * #getSliceEndsForPattern(value: string, index: number, next: RouteMatchNode<T>) {
        for (const { test } of next.#byExact) {
            const i = value.indexOf(test, index);
            if (i >= 0)
                yield i;
        }
        if (next.#byPattern.length > 0) {
            for (let i = index + 1; i <= value.length; i++)
                yield i;
            yield index;
        }
    }
}