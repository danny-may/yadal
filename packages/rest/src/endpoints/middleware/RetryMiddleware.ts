import { sleep } from "@yadal/core";
import { HttpHeaders } from "../../http/index.js";
import { IEndpointResponse } from "../IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";

export class RetryMiddleware implements IEndpointClientMiddleware {
    async handle<TModel extends object, TResult>(_: unknown, next: (signal?: AbortSignal | undefined) => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal | undefined) {
        while (true) {
            const response = await next();
            const retryAfter = this.#getRetryAfter(response.http.headers);
            if (retryAfter === undefined)
                return response;

            await sleep(retryAfter, signal);
        }
    }

    #getRetryAfter(headers: HttpHeaders) {
        const header = headers.get('Retry-After');
        if (header === undefined)
            return undefined;

        const retryAfter = Number(header);
        if (isNaN(retryAfter))
            return undefined;

        return retryAfter * 1000;
    }
}
