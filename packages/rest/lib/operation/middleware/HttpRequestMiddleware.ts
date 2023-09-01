import { HttpClient } from "../../http/index.js";
import { IOperationSenderMiddleware } from "./IOperationSenderMiddleware.js";
import { IOperationRequest } from "../IOperationRequest.js";


export class HttpRequestMiddleware implements IOperationSenderMiddleware {
    readonly #client: HttpClient;

    constructor(client: HttpClient) {
        this.#client = client;
    }

    async handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, _: unknown, signal: AbortSignal | undefined) {
        const response = await this.#client.send(request.http, signal);
        let result;
        return {
            operation: request.operation,
            get result() {
                return result ??= request.operation.readResponse(response)
            },
            set result(value) {
                result = value;
            },
            http: response
        }
    }
}