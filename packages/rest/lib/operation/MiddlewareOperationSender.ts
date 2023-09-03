import { IMiddlewareInvoker, combineMiddleware } from "@yadal/core";
import { IOperation } from "./IOperation.js";
import { IOperationSender } from "./IOperationSender.js";
import { IOperationRequest } from "./IOperationRequest.js";
import { IOperationResponse } from "./IOperationResponse.js";
import { IOperationSenderMiddleware } from "./middleware/IOperationSenderMiddleware.js";
import { HttpMethod } from "../http/index.js";

export class MiddlewareOperationSender implements IOperationSender {
    readonly #send: IMiddlewareInvoker<IOperationRequest<object, unknown>, IOperationResponse<object, unknown>>;

    constructor(middleware: Iterable<IOperationSenderMiddleware>) {
        this.#send = combineMiddleware(middleware, () => {
            throw new Error('No middleware handled the request')
        })
    }

    async send<TModel extends object, TResult>(operation: IOperation<HttpMethod, TModel, TResult>, model: TModel, signal?: AbortSignal): Promise<TResult>
    async send(operation: IOperation<HttpMethod, object, unknown>, model: object, signal?: AbortSignal) {
        let request;
        const { result } = await this.#send({
            operation,
            model,
            get http() {
                return request ??= this.operation.createRequest(this.model);
            },
            set http(value) {
                request = value;
            }
        }, signal);
        return result;
    }
}