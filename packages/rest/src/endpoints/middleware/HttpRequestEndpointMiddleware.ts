import { IEndpointResponse } from "../IEndpointResponse";
import { HttpClient } from "../../http";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware";
import { IEndpointRequest } from "../IEndpointRequest";


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

function removeMiddleSlashes(value: string, index: number, array: string[]): string {
    if (index > 0)
        value = value.replace(/^\/+/, '');
    if (index < array.length + 1)
        value = value.replace(/\/+$/, '');
    return value;
}