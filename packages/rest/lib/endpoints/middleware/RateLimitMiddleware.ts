import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";
import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";
import { IRateLimitManager, RateLimitHeaders } from "../../rateLimit/index.js";


export class RateLimitMiddleware implements IEndpointClientMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: () => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal | undefined): Promise<IEndpointResponse<TModel, TResult>> {
        const ratelimit = this.#rateLimits.get(request.endpoint.route, request.model);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.http.headers));
        return result;
    }
}
