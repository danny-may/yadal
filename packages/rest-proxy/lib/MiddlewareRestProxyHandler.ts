import { IMiddlewareInvoker, combineMiddleware } from "@yadal/core";
import { HttpMethod, IHttpRequest, IHttpResponse, Route } from "@yadal/rest";
import { IRestProxyHandler } from './IRestProxyHandler.js';
import { IRestProxyInvocation, IRestProxyMiddleware } from "./middleware/index.js";

export class MiddlewareRestProxyHandler implements IRestProxyHandler {
    readonly #send: IMiddlewareInvoker<IRestProxyInvocation<object>, IHttpResponse>;

    constructor(middleware: Iterable<IRestProxyMiddleware>) {
        this.#send = combineMiddleware(middleware, () => {
            throw new Error('No middleware handled the request')
        });
    }

    async handleRequest<T extends object>(route: Route<HttpMethod, T>, params: Record<keyof T, string>, request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse>;
    async handleRequest(route: Route, params: Record<PropertyKey, string>, request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        return await this.#send(Object.freeze({ route, params, request }), signal);
    }
}

