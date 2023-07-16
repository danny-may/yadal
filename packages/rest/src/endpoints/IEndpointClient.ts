import { IEndpoint } from "./IEndpoint.js";

export interface IEndpointClient {
    send<TModel extends object, TResult>(endpoint: IEndpoint<TModel, TResult>, model: TModel, signal?: AbortSignal): PromiseLike<TResult>;
}
