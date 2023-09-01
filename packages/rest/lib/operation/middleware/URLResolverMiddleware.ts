import { URlResolver } from "@yadal/core";
import { IOperationRequest } from "../IOperationRequest.js";
import { IOperationResponse } from "../IOperationResponse.js";
import { IOperationSenderMiddleware } from "./IOperationSenderMiddleware.js";

export class URLResolverMiddleware implements IOperationSenderMiddleware {
    readonly #resolver: URlResolver;

    constructor(resolver: URlResolver) {
        this.#resolver = resolver;
    }

    handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IOperationResponse<TModel, TResult>>) {
        request.http.url = this.#resolver.resolve(request.http.url);
        return next();
    }
}