import { HttpMethod } from "../http/index.js";
import { IOperation } from "../index.js";
import { Route, RouteModel } from "./Route.js";

export interface IRouteMatcher<T extends object> {
    match<M extends HttpMethod>(method: M, path: `/${string}`): { route: Route<M, T>, model: Record<keyof T, string> } | undefined
    matchAll<M extends HttpMethod>(method: M, path: `/${string}`): Iterable<{ route: Route<M, T>, model: Record<keyof T, string> }>
}

export class RouteMatcher<T extends object> implements IRouteMatcher<T> {
    readonly #locators: { [P in HttpMethod]?: IRouteLocator<P, T>; };
    static fromOperations<T extends Record<PropertyKey, IOperation<any, any>>>(operations: T) {
        return new RouteMatcher(Object.values(operations).map(o => o.route)) as RouteMatcher<RouteModel<T[keyof T]['route']>>;
    }

    constructor(routes: Iterable<Route<HttpMethod, T>>) {
        const builder = new RouteMatcherBuilder<T>();
        for (const route of routes)
            builder.add(route);
        this.#locators = builder.build();
    }


    match<M extends HttpMethod>(method: M, path: `/${string}`) {
        for (const match of this.matchAll(method, path))
            return match;
        return undefined;
    }

    * matchAll<M extends HttpMethod>(method: M, path: `/${string}`) {
        for (const route of this.#locators[method]?.find(path) ?? []) {
            const model = route.tryParse(path);
            if (model !== null)
                yield { route, model };
        }
    }
}

class RouteMatcherBuilder<T extends object> {
    readonly #builders: { [P in HttpMethod]?: RouteLocatorBuilder<P, T> }

    constructor() {
        this.#builders = {};
    }

    add<M extends HttpMethod>(route: Route<M, T>) {
        const builder = (this.#builders[route.method] as RouteLocatorBuilder<M, T>) ??= new RouteLocatorBuilder()
        builder.add(route);
    }

    build(): { [P in HttpMethod]?: IRouteLocator<P, T>; } {
        return Object.fromEntries(Object.entries(this.#builders).map(x => [x[0], x[1].build()])) as { [P in HttpMethod]?: IRouteLocator<P, T>; };
    }
}


interface IRouteLocator<M extends HttpMethod, T extends object> {
    find(path: `/${string}`): Iterable<Route<M, T>>;
}

class RouteLocatorBuilder<M extends HttpMethod, T extends object> {
    readonly #segments: Map<string, RouteLocatorBuilder<M, T>>;
    readonly #routes: Array<Route<M, T>>;
    #variable?: RouteLocatorBuilder<M, T>;

    constructor() {
        this.#segments = new Map();
        this.#routes = [];
    }

    add(route: Route<M, T>) {
        this.#add(route, route.template.toLowerCase().split(/\{.*?\}/g), 0);
    }

    #add(route: Route<M, T>, segments: string[], index: number): void {
        if (index === segments.length)
            return void this.#routes.push(route);

        this.#variable ??= new RouteLocatorBuilder();
        this.#variable.#nextBuilder(segments[index++]!)
            .#add(route, segments, index);
    }

    #nextBuilder(segment: string): RouteLocatorBuilder<M, T> {
        for (const [s, b] of this.#segments) {
            if (segment === s)
                return b;

            const commonLength = findCommonStart(segment, s);
            if (commonLength === 0)
                continue;

            if (commonLength === s.length)
                return b.#nextBuilder(segment.slice(commonLength));

            this.#segments.delete(s);
            const builder = new RouteLocatorBuilder<M, T>();
            this.#segments.set(segment.slice(0, commonLength), builder);
            builder.#segments.set(s.slice(commonLength), b);

            if (commonLength !== segment.length)
                return builder.#nextBuilder(segment.slice(commonLength));

            return builder;
        }

        const result = new RouteLocatorBuilder<M, T>()
        this.#segments.set(segment, result);
        return result;
    }

    build(): RouteLocator<M, T> {
        return (this.#variable ?? new RouteLocatorBuilder()).#build();
    }

    #build(): RouteLocator<M, T> {
        const variable = this.#variable ?? new RouteLocatorBuilder();
        return new RouteLocator(
            [...this.#segments].map(x => ({ segment: x[0], next: x[1].#build() })),
            [...variable.#segments].map(x => ({ segment: x[0], next: x[1].#build() })),
            this.#routes
        );
    }
}

function findCommonStart(s1: string, s2: string) {
    const end = Math.min(s1.length, s2.length);
    for (let i = 0; i < end; i++) {
        if (s1[i] !== s2[i])
            return i;
    }
    return end;
}

class RouteLocator<M extends HttpMethod, T extends object> implements IRouteLocator<M, T> {
    readonly #segments: readonly { readonly segment: string; readonly next: RouteLocator<M, T>; }[];
    readonly #variable: readonly { readonly segment: string; readonly next: RouteLocator<M, T>; }[];
    readonly #routes: readonly Route<M, T>[];

    constructor(
        segments: Iterable<{ readonly segment: string; readonly next: RouteLocator<M, T> }>,
        variable: Iterable<{ readonly segment: string; readonly next: RouteLocator<M, T> }>,
        routes: Iterable<Route<M, T>>
    ) {
        this.#segments = [...segments].sort((a, b) => b.segment.length - a.segment.length);
        this.#variable = [...variable].sort((a, b) => b.segment.length - a.segment.length);
        this.#routes = [...routes];
    }

    find(path: `/${string}`): Iterable<Route<M, T>> {
        return this.#find(path, 0);
    }

    * #find(path: `/${string}`, index: number): Iterable<Route<M, T>> {
        if (index === path.length)
            return yield* this.#routes;

        for (const { segment, next } of this.#segments) {
            if (path.startsWith(segment, index)) {
                yield* next.#find(path, index + segment.length);
                break;
            }
        }

        for (const { segment, next } of this.#variable) {
            let match = path.indexOf(segment, index);
            while (match !== -1) {
                const index = match + segment.length
                yield* next.#find(path, index);
                if (index >= path.length)
                    break;

                match = path.indexOf(segment, match + 1);
            }
        }
    }
}