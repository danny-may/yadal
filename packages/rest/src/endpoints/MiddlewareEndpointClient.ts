import { IEndpoint } from "./IEndpoint.js";
import { IEndpointClient } from "./IEndpointClient.js";
import { IEndpointRequest } from "./IEndpointRequest.js";
import { IEndpointResponse } from "./IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./middleware/IEndpointClientMiddleware.js";

export class MiddlewareEndpointClient implements IEndpointClient {
    readonly #send: <TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>;

    constructor(middleware: Iterable<IEndpointClientMiddleware>) {
        this.#send = [...middleware]
            .reduceRight<<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>>(
                (p, c) => (req, sig1) => c.handle(req, sig2 => p(req, mergeSignals(sig1, sig2)), sig1),
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