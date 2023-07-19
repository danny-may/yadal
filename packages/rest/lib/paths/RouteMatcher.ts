import { IRoute, RouteSegment } from "./IRoute.js";

export class RouteMatcher<T extends object> {
    readonly #root: PathTree<T>;
    #maxDepth = 0;

    constructor(routes: Iterable<IRoute<T>>) {
        this.#root = this.#newNode();
        for (const route of routes)
            this.#add(route);
    }

    #newNode(): PathTree<T> {
        return { [computed]: new Map() }
    }

    #add(route: IRoute<T>) {
        const segments = route.segments;
        this.#maxDepth = Math.max(this.#maxDepth, segments.length);
        let node = this.#root;
        for (const segment of segments) {
            if (typeof segment === 'string')
                node = node[segment] ??= this.#newNode();
            else {
                node[computed].set(segment, node = this.#newNode());
            }
        }
        node[result] = route;
    }

    *#locate(segments: readonly string[], index: number, node: PathTree<T>, values: Array<Record<PropertyKey, unknown>>): Generator<[node: PathTree<T>, values: Array<Record<PropertyKey, unknown>>], void> {
        const segment = segments[index++];
        if (segment === undefined) {
            yield [node, values];
            return;
        }

        let nextNode = node[segment];
        if (nextNode !== undefined)
            yield* this.#locate(segments, index, nextNode, values);
        for (const [s, n] of node[computed]) {
            const result = s.parse(segment);
            if (result.success) {
                values.push(result.model);
                yield* this.#locate(segments, index, n, values);
                values.pop();
            }
        }
    }

    locate(path: string): { route: IRoute<T>; model: T } | undefined {
        if (path.startsWith('/'))
            path = path.slice(1);
        const segments = path.split('/');
        if (segments.length > this.#maxDepth)
            return undefined;
        const [match] = this.#locate(segments, 0, this.#root, []);
        if (match === undefined)
            return undefined;
        const [node, values] = match;
        const def = node[result];
        if (def === undefined)
            return undefined;
        return {
            route: def,
            model: values.reduce((p, c) => Object.assign(c, p)) as T
        }
    }
}

const result = Symbol('result');
const computed = Symbol('computed');
interface PathTree<T extends object> {
    [key: string]: PathTree<T>;
    [computed]: Map<RouteSegment, PathTree<T>>;
    [result]?: IRoute<T>;
}