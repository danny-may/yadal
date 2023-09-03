import { IHttpResponse } from "@yadal/rest";
import { IRestProxyInvocation, IRestProxyMiddleware } from "@yadal/rest-proxy";
import { IRateLimitManager, RateLimitHeaders } from "@yadal/api";

export class RateLimitMiddleware implements IRestProxyMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<T extends object>(context: IRestProxyInvocation<T>, next: () => PromiseLike<IHttpResponse> | IHttpResponse, signal?: AbortSignal): Promise<IHttpResponse> {
        const ratelimit = this.#rateLimits.get(context.route, context.params);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.headers));
        return result;
    }
}
