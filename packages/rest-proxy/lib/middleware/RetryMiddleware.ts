import { HttpHeaders, HttpMethod, IHttpRequest, IHttpResponse, Route } from "@yadal/rest";
import { IRestProxyMiddleware } from "./IRestProxyMiddleware.js";
import { sleep } from "@yadal/core";

export class RetryMiddleware implements IRestProxyMiddleware {
    async handle<T extends object>(_route: Route<HttpMethod, T>, _params: Record<keyof T, string>, _request: IHttpRequest, next: (signal?: AbortSignal | undefined) => PromiseLike<IHttpResponse>, signal?: AbortSignal | undefined): Promise<IHttpResponse> {
        while (true) {
            const response = await next();
            const retryAfter = this.#getRetryAfter(response.headers);
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