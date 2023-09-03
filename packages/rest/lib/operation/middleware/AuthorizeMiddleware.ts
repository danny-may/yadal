import { IAuthorizationProvider } from "../../authorization/index.js";
import { IOperationRequest } from "../IOperationRequest.js";
import { IOperationResponse } from "../IOperationResponse.js";
import { IOperationSenderMiddleware } from "./IOperationSenderMiddleware.js";

export class AuthorizeMiddleware implements IOperationSenderMiddleware {
    readonly #provider: IAuthorizationProvider;

    constructor(provider: IAuthorizationProvider) {
        this.#provider = provider;
    }

    handle<TModel extends object, TResult>(
        request: IOperationRequest<TModel, TResult>,
        next: (signal?: AbortSignal) => PromiseLike<IOperationResponse<TModel, TResult>>
    ): PromiseLike<IOperationResponse<TModel, TResult>> {
        const schemes = request.operation.route.authentication
        const auth = this.#provider.tryGetAuth(schemes);
        switch (auth) {
            case false:
                throw new Error(`${request.operation.name} requires one of the following authorization schemes: ${Object.keys(schemes).join(', ')}`);
            case null:
                break;
            default:
                request.http.headers.set('Authorize', auth);
        }

        return next();

    }
}