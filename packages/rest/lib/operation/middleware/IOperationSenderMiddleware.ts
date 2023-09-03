import { IMiddleware } from "@yadal/core";
import { IOperationRequest } from "../IOperationRequest.js";
import { IOperationResponse } from "../IOperationResponse.js";

export interface IOperationSenderMiddleware extends IMiddleware<IOperationRequest<object, unknown>, IOperationResponse<object, unknown>> {
    handle<TModel extends object, TResult>(request: IOperationRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IOperationResponse<TModel, TResult>>, signal?: AbortSignal): PromiseLike<IOperationResponse<TModel, TResult>>;
}

