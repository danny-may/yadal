import { IOperationSenderMiddleware, IOperationRequest, IOperationResponse } from "@yadal/rest";
import { IRateLimitManager } from "./IRateLimitManager.js";
import { RateLimitHeaders } from "./RateLimitHeaders.js";

export class RateLimitMiddleware implements IOperationSenderMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, next: () => PromiseLike<IOperationResponse<TModel, TResult>>, signal?: AbortSignal | undefined): Promise<IOperationResponse<TModel, TResult>> {
        const ratelimit = this.#rateLimits.get(request.operation.route, request.model);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.http.headers));
        return result;
    }
}
