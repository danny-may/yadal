import { IHttpRequest, IHttpResponse, IRateLimitManager, IRoute, RateLimitHeaders } from "@yadal/rest";
import { IDiscordRestProxyMiddleware } from "./IDiscordRestProxyMiddleware.js";


export class RateLimitMiddleware implements IDiscordRestProxyMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<T extends object>(route: IRoute<T>, params: T, request: IHttpRequest, next: (signal?: AbortSignal | undefined) => PromiseLike<IHttpResponse>, signal?: AbortSignal | undefined): Promise<IHttpResponse> {
        const ratelimit = this.#rateLimits.get(request.method, route, params);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.headers));
        return result;
    }
}
