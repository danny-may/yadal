import { HttpHeaders, IHttpRequest, IHttpResponse, IRoute, RouteMatcher } from '@yadal/rest';
import { IDiscordRestProxyHandler } from './IDiscordRestProxyHandler.js';

export class DiscordRestProxy {
    readonly #handler: IDiscordRestProxyHandler;
    readonly #routes: RouteMatcher<object>;

    constructor(handler: IDiscordRestProxyHandler, routes: Iterable<IRoute<object>>) {
        this.#handler = handler;
        this.#routes = new RouteMatcher(routes);
    }

    async handle(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        const route = this.#routes.locate(request.url.href.slice(request.url.protocol.length));
        if (route === undefined)
            return notFound;

        return await this.#handler.handleRequest(route.route, route.model, request, signal);
    }
}

const notFound: IHttpResponse = {
    headers: new HttpHeaders(),
    status: 404,
    body: {
        async * stream() { }
    },
}