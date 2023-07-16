import { HttpHeaders, IEndpoint, IHttpRequest, IHttpResponse, IRoute } from '@yadal/rest';
import { randomUUID } from 'node:crypto';

export interface IDiscordRestProxyHandler {
    handleRequest<T extends object>(route: IRoute<T>, params: T, request: IHttpRequest): Promise<IHttpResponse>;
}

export class DiscordRestProxy {
    readonly #handler: IDiscordRestProxyHandler;
    readonly #routeReader: (path: string) => { route: IRoute<object>; values: object; } | undefined;

    constructor(handler: IDiscordRestProxyHandler, routes: Iterable<IRoute<object>>) {
        this.#handler = handler;
        this.#routeReader = createRouter(routes);
    }

    async handle(request: IHttpRequest): Promise<IHttpResponse> {
        const route = this.#routeReader(request.url.href.slice(request.url.protocol.length));
        if (route === undefined)
            return notFound;

        return await this.#handler.handleRequest(route.route, route.values, request);
    }
}

const notFound: IHttpResponse = {
    headers: new HttpHeaders(),
    status: 404,
    body: {
        async * stream() { }
    },
}

const result: unique symbol = Symbol('result');
const wildcard: unique symbol = Symbol('/.*?/');
interface PathTree<T extends object> {
    [key: string]: PathTree<T>;
    [result]?: { route: IRoute<T>, keys: readonly string[] };
    [wildcard]?: PathTree<T>;
}

function createRouter<T extends object>(routes: Iterable<IRoute<T>>): (path: string) => { route: IRoute<T>, values: T } | undefined {
    const id = randomUUID();
    const reads: string[] = [];
    const fakeData = new Proxy<never>({} as never, { get(_, name) { return `${id}${reads.push(String(name)) - 1}`; } });

    const matcher: PathTree<T> = {};
    let maxDepth = 0;

    for (const route of routes) {
        const example = route.getUrl(fakeData);
        const segments = example.href.slice(example.protocol.length + 1).split('/');
        maxDepth = Math.max(maxDepth, segments.length);
        const keys = [];
        let node = matcher;
        for (const segment of segments) {
            if (segment.startsWith(id)) {
                node = node[wildcard] ??= {};
                keys.push(reads[segment.slice(id.length) as `${number}`]!)
            } else {
                node = node[segment] ??= {};
            }
        }
        node[result] = { route, keys };
    }

    function* locate(segments: readonly string[], index: number, node: PathTree<T>, values: string[]): Generator<[node: PathTree<T>, values: string[]], void> {
        const segment = segments[index++];
        if (segment === undefined) {
            yield [node, values];
            return;
        }

        let nextNode = node[segment];
        if (nextNode !== undefined)
            yield* locate(segments, index, nextNode, values);
        nextNode = node[wildcard];
        if (nextNode !== undefined) {
            values.push(segment);
            yield* locate(segments, index, nextNode, values);
            values.pop();
        }
    }

    return path => {
        const segments = path.split('/');
        if (segments.length > maxDepth)
            return undefined;
        const match = locate(segments, 0, matcher, []).next().value;
        if (match === undefined)
            return undefined;
        const [node, values] = match;
        const def = node[result];
        if (def === undefined)
            return undefined;
        return {
            route: def.route,
            values: Object.fromEntries(def.keys.map((k, i) => [k, values[i]] as const)) as T
        }
    }
}