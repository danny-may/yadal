import { CompositeAbortController } from "@yadal/core";
import { IHttpRequest, IHttpResponse, IRoute } from "@yadal/rest";
import { IDiscordRestProxyHandler } from './IDiscordRestProxyHandler.js';
import { IDiscordRestProxyMiddleware } from "./middleware/index.js";

export class MiddlewareDiscordRestProxyHandler implements IDiscordRestProxyHandler {
    readonly #send: IDiscordRestProxyHandler['handleRequest'];

    constructor(middleware: Iterable<IDiscordRestProxyMiddleware>) {
        this.#send = [...middleware]
            .reduceRight<IDiscordRestProxyHandler['handleRequest']>(
                (p, c) => (route, params, req, sig1) => c.handle(route, params, req, async sig2 => {
                    if (sig2 === undefined)
                        return await p(route, params, req, sig1);
                    using controller = new CompositeAbortController(sig1, sig2);
                    return await p(route, params, req, controller.signal);
                }, sig1),
                () => { throw new Error('No middleware handled the request') }
            )
    }

    async handleRequest<T extends object>(route: IRoute<T>, params: T, request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
        return await this.#send(route, params, request, signal);
    }
}

