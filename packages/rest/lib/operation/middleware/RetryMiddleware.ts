import { sleep } from "@yadal/core";
import { HttpHeaders } from "../../http/index.js";
import { IOperationResponse } from "../IOperationResponse.js";
import { IOperationSenderMiddleware } from "./IOperationSenderMiddleware.js";

export class RetryMiddleware implements IOperationSenderMiddleware {
    async handle<TModel extends object, TResult>(_: unknown, next: (signal?: AbortSignal | undefined) => PromiseLike<IOperationResponse<TModel, TResult>>, signal?: AbortSignal | undefined) {
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
