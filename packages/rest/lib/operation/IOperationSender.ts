import { HttpMethod } from "../http/index.js";
import { IOperation } from "./IOperation.js";

export interface IOperationSender {
    send<TModel extends object, TResult>(operation: IOperation<HttpMethod, TModel, TResult>, model: TModel, signal?: AbortSignal): PromiseLike<TResult>;
}
