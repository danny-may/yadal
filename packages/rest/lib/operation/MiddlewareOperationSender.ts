import { CompositeAbortController } from "@yadal/core";
import { IOperation } from "./IOperation.js";
import { IOperationSender } from "./IOperationSender.js";
import { IOperationRequest } from "./IOperationRequest.js";
import { IOperationResponse } from "./IOperationResponse.js";
import { IOperationSenderMiddleware } from "./middleware/IOperationSenderMiddleware.js";

type Send = <TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IOperationResponse<TModel, TResult>>;

export class MiddlewareOperationSender implements IOperationSender {
    readonly #send: Send;

    constructor(middleware: Iterable<IOperationSenderMiddleware>) {
        this.#send = [...middleware]
            .reduceRight<Send>(
                (p, c) => (req, sig1) => c.handle(req, async sig2 => {
                    if (sig2 === undefined)
                        return await p(req, sig1);
                    using controller = new CompositeAbortController(sig1, sig2);
                    return await p(req, controller.signal)
                }, sig1),
                () => { throw new Error('No middleware handled the request') }
            )
    }

    async send<TModel extends object, TResult>(operation: IOperation<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TResult>(operation: IOperation<{}, TResult>, model?: undefined, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TModel extends object, TResult>(operation: IOperation<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined) {
        let request;
        const { result } = await this.#send<TModel, TResult>({
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