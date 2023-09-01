import { IOperationRequest } from "../IOperationRequest.js";
import { IOperationResponse } from "../IOperationResponse.js";

export interface IOperationSenderMiddleware {
    handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IOperationResponse<TModel, TResult>>, signal?: AbortSignal): PromiseLike<IOperationResponse<TModel, TResult>>;
}

