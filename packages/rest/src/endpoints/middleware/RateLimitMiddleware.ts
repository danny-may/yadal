import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware";
import { IEndpointRequest } from "../IEndpointRequest";
import { IEndpointResponse } from "../IEndpointResponse";
import { IRateLimitManager, RateLimitHeaders } from "../../rateLimit";
import { AbortSignal } from "@yadal/dep";


export class RateLimitMiddleware implements IEndpointClientMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    handle<TModel, TResult>(request: IEndpointRequest<TModel, TResult>, next: () => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal | undefined): PromiseLike<IEndpointResponse<TModel, TResult>> {
        return this.#rateLimits.request(
            request.rateLimitKey,
            request.endpoint.globalRateLimit,
            async () => {
                const result = await next();
                return {
                    headers: new RateLimitHeaders(result.headers),
                    value: result
                };
            },
            signal
        )
    }
}
