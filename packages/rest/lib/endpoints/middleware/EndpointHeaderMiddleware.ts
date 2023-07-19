import { HttpHeaders } from "../../http/index.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";
import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";


export class EndpointHeaderMiddleware implements IEndpointClientMiddleware {
    readonly #headers: HttpHeaders;

    constructor(headers: HttpHeaders | Record<string, string | undefined>) {
        this.#headers = headers instanceof HttpHeaders
            ? new HttpHeaders(headers.toDict())
            : new HttpHeaders(headers);
    }

    handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: () => PromiseLike<IEndpointResponse<TModel, TResult>>) {
        for (const [key, values] of this.#headers) {
            request.http.headers.set(key, values);
        }
        return next();
    }
}
