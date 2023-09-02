import { HttpHeaders, IHttpRequest, IHttpResponse, IRouteMatcher } from '@yadal/rest';
import { IRestProxyHandler } from './IRestProxyHandler.js';
import { IRestProxy } from './IRestProxy.js';


export class RouteBasedRestProxy<T extends object> implements IRestProxy {
    readonly #handler: IRestProxyHandler;
    readonly #routes: IRouteMatcher<T>;

    constructor(handler: IRestProxyHandler, routes: IRouteMatcher<T>) {
        this.#handler = handler;
        this.#routes = routes;
    }

    async handle(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        for (const route of this.#routes.matchAll(request.method, request.url.href.slice(request.url.protocol.length) as `/${string}`))
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