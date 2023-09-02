import { CompositeAbortController } from "@yadal/core";
import { HttpMethod, IHttpRequest, IHttpResponse, Route } from "@yadal/rest";
import { IRestProxyHandler } from './IRestProxyHandler.js';
import { IRestProxyMiddleware } from "./middleware/index.js";

export class MiddlewareRestProxyHandler implements IRestProxyHandler {
    readonly #send: IRestProxyHandler['handleRequest'];

    constructor(middleware: Iterable<IRestProxyMiddleware>) {
        this.#send = [...middleware]
            .reduceRight<IRestProxyHandler['handleRequest']>(
                (p, c) => (route, params, req, sig1) => c.handle(route, params, req, async sig2 => {
                    if (sig2 === undefined)
                        return await p(route, params, req, sig1);
                    using controller = new CompositeAbortController(sig1, sig2);
                    return await p(route, params, req, controller.signal);
                }, sig1),
                () => { throw new Error('No middleware handled the request') }
            )
    }

    async handleRequest<T extends object>(route: Route<HttpMethod, T>, params: Record<keyof T, string>, request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        return await this.#send(route, params, request, signal);
    }
}

