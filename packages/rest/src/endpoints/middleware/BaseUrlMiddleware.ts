import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";

export class BaseUrlMiddleware implements IEndpointClientMiddleware {
    readonly #baseUrls: Record<string, URL>;

    constructor(baseUrls: Record<string, URL>) {
        this.#baseUrls = baseUrls;
    }

    handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>) {
        const { http: { url: { protocol, href } } } = request;
        if (protocol in this.#baseUrls) {
            request.http.url = new URL(href.slice(protocol.length + 1), this.#baseUrls[protocol]);
        }
        return next();
    }
}