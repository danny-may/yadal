import { HttpHeaders } from "../../http/index.js";
import { IOperationSenderMiddleware } from "./IOperationSenderMiddleware.js";
import { IOperationRequest } from "../IOperationRequest.js";
import { IOperationResponse } from "../IOperationResponse.js";


export class HeaderMiddleware implements IOperationSenderMiddleware {
    readonly #headers: HttpHeaders;

    constructor(headers: HttpHeaders | Record<string, string | undefined>) {
        this.#headers = headers instanceof HttpHeaders
            ? new HttpHeaders(headers.toDict())
            : new HttpHeaders(headers);
    }

    handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, next: () => PromiseLike<IOperationResponse<TModel, TResult>>) {
        for (const [key, values] of this.#headers) {
            request.http.headers.set(key, values);
        }
        return next();
    }
}
