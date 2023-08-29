import { HttpHeaders, IHttpRequest, IHttpResponse, Route, RouteMatcher } from '@yadal/rest';
import { IDiscordRestProxyHandler } from './IDiscordRestProxyHandler.js';

export class DiscordRestProxy {
    readonly #handler: IDiscordRestProxyHandler;
    readonly #routes: RouteMatcher<object>;

    constructor(handler: IDiscordRestProxyHandler, routes: Iterable<Route>) {
        this.#handler = handler;
        this.#routes = new RouteMatcher(routes);
    }

    async handle(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        for (const route of this.#routes.match(request.method, request.url.href.slice(request.url.protocol.length) as `/${string}`))
            return await this.#handler.handleRequest(route.route, route.model, request, signal);
        return notFound;
    }
}

const notFound: IHttpResponse = {
    headers: new HttpHeaders(),
    status: 404,
    body: {
        async * stream() { }
    },
}