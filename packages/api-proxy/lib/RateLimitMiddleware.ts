import { IHttpResponse, Route, HttpMethod } from "@yadal/rest";
import { IRestProxyMiddleware } from "@yadal/rest-proxy";
import { IRateLimitManager, RateLimitHeaders } from "@yadal/api";

export class RateLimitMiddleware implements IRestProxyMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<T extends object>(route: Route<HttpMethod, T>, params: Record<keyof T, string>, _: unknown, next: (signal?: AbortSignal | undefined) => PromiseLike<IHttpResponse>, signal?: AbortSignal | undefined): Promise<IHttpResponse> {
        const ratelimit = this.#rateLimits.get(route, params);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.headers));
        return result;
    }
}
