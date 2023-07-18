import { CompositeAbortController } from "@yadal/core";
import { IEndpoint } from "./IEndpoint.js";
import { IEndpointClient } from "./IEndpointClient.js";
import { IEndpointRequest } from "./IEndpointRequest.js";
import { IEndpointResponse } from "./IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./middleware/IEndpointClientMiddleware.js";

type Send = <TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>;

export class MiddlewareEndpointClient implements IEndpointClient {
    readonly #send: Send;

    constructor(middleware: Iterable<IEndpointClientMiddleware>) {
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

    async send<TModel extends object, TResult>(endpoint: IEndpoint<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TResult>(endpoint: IEndpoint<{}, TResult>, model?: undefined, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TModel extends object, TResult>(endpoint: IEndpoint<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined) {
        let request;
        const { result } = await this.#send<TModel, TResult>({
            endpoint,
            model,
            get http() {
                return request ??= this.endpoint.createRequest(this.model);
            },
            set http(value) {
                request = value;
            }
        }, signal);
        return result;
    }
}