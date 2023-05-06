import { IEndpoint } from "./IEndpoint";
import { IEndpointClient } from "./IEndpointClient";
import { IEndpointClientMiddleware } from "./middleware/IEndpointClientMiddleware";
import { IEndpointRequest } from "./IEndpointRequest";
import { IEndpointResponse } from "./IEndpointResponse";
import { AbortController, AbortSignal } from "@yadal/dep";

export class MiddlewareEndpointClient implements IEndpointClient {
    readonly #send: <TModel, TResult>(request: IEndpointRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>;

    constructor(middleware: Iterable<IEndpointClientMiddleware>) {
        this.#send = [...middleware]
            .reduceRight<<TModel, TResult>(request: IEndpointRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>>(
                (p, c) => (req, sig1) => c.handle(req, sig2 => p(req, mergeSignals(sig1, sig2)), sig1),
                () => { throw new Error('No middleware handled the request') }
            )
    }

    async send<TModel, TResult>(endpoint: IEndpoint<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TResult>(endpoint: IEndpoint<void, TResult>, model?: undefined, signal?: AbortSignal | undefined): Promise<TResult>
    async send<TModel, TResult>(endpoint: IEndpoint<TModel, TResult>, model: TModel, signal?: AbortSignal | undefined) {
        const response = await this.#send<TModel, TResult>(endpoint.createRequest(model), signal);
        return await response.model();
    }
}

function mergeSignals(...signals: Array<AbortSignal | undefined>) {
    const distinct = new Set(signals.filter(Boolean) as AbortSignal[]);
    if(distinct.size <= 1)
        return [...distinct][0];

    const controller = new AbortController();
    const abort = () => {
        controller.abort();
        distinct.forEach(s => s.removeEventListener('abort', abort));
    }
    distinct.forEach(s => s.addEventListener('abort', abort));
    return controller.signal;
}