import { IEndpointRequest } from "../IEndpointRequest";
import { IEndpointResponse } from "../IEndpointResponse";


export interface IEndpointClientMiddleware {
    handle<TModel, TResult>(request: IEndpointRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal): PromiseLike<IEndpointResponse<TModel, TResult>>;
}
