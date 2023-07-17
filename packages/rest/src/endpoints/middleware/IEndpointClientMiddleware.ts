import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";

export interface IEndpointClientMiddleware {
    handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>, signal?: AbortSignal): PromiseLike<IEndpointResponse<TModel, TResult>>;
}

