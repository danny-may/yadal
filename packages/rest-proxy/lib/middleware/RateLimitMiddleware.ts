import { IHttpResponse, IRateLimitManager, Route, RateLimitHeaders } from "@yadal/rest";
import { IDiscordRestProxyMiddleware } from "./IDiscordRestProxyMiddleware.js";


export class RateLimitMiddleware implements IDiscordRestProxyMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<T extends object>(route: Route<T>, params: T, _: unknown, next: (signal?: AbortSignal | undefined) => PromiseLike<IHttpResponse>, signal?: AbortSignal | undefined): Promise<IHttpResponse> {
        const ratelimit = this.#rateLimits.get(route, params);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.headers));
        return result;
    }
}
