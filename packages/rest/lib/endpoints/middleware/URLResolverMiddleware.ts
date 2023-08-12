import { URlResolver } from "@yadal/core";
import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";

export class URLResolverMiddleware implements IEndpointClientMiddleware {
    readonly #resolver: URlResolver;

    constructor(resolver: URlResolver) {
        this.#resolver = resolver;
    }

    handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>) {
        const url = request.http.url;
        if (url.protocol === 'rel:')
            request.http.url = this.#resolver.resolve(url);
        return next();
    }
}