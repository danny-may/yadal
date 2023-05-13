import { HttpHeaders } from "../../http";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware";
import { IEndpointRequest } from "../IEndpointRequest";
import { IEndpointResponse } from "../IEndpointResponse";


export class EndpointHeaderMiddleware implements IEndpointClientMiddleware {
    readonly #headers: HttpHeaders;

    constructor(headers: HttpHeaders | Record<string, string | undefined>) {
        this.#headers = headers instanceof HttpHeaders
            ? new HttpHeaders(headers.toDict())
            : new HttpHeaders(headers);
    }

    handle<TModel, TResult>(request: IEndpointRequest<TModel, TResult>, next: () => PromiseLike<IEndpointResponse<TModel, TResult>>) {
        for (const [key, values] of this.#headers) {
            request.headers.add(key, values);
        }
        return next();
    }
}
