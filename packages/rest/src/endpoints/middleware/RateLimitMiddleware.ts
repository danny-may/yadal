import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware";
import { IEndpointRequest } from "../IEndpointRequest";
import { IEndpointResponse } from "../IEndpointResponse";
import { IRateLimitManager, RateLimitHeaders } from "../../rateLimit";


export class RateLimitMiddleware implements IEndpointClientMiddleware {
    readonly #rateLimits: IRateLimitManager;

    constructor(rateLimits: IRateLimitManager) {
        this.#rateLimits = rateLimits;
    }

    async handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: () => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal | undefined): Promise<IEndpointResponse<TModel, TResult>> {
        const ratelimit = this.#rateLimits.get(request.http.method, request.endpoint.route, request.model);
        if (ratelimit === undefined)
            return await next();

        await ratelimit.wait(signal);
        const result = await next();
        ratelimit.update(new RateLimitHeaders(result.http.headers));
        return result;
    }
}
