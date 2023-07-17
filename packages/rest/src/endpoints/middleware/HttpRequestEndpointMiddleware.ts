import { HttpClient } from "../../http/index.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";
import { IEndpointRequest } from "../IEndpointRequest.js";


export class HttpRequestEndpointMiddleware implements IEndpointClientMiddleware {
    readonly #client: HttpClient;

    constructor(client: HttpClient) {
        this.#client = client;
    }

    async handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, _: unknown, signal: AbortSignal | undefined) {
        const response = await this.#client.send(request.http, signal);
        let result;
        return {
            endpoint: request.endpoint,
            get result() {
                return result ??= request.endpoint.readResponse(response)
            },
            set result(value) {
                result = value;
            },
            http: response
        }
    }
}