import { IOperation } from "./IOperation.js";

export interface IOperationSender {
    send<TModel extends object, TResult>(operation: IOperation<TModel, TResult>, model: TModel, signal?: AbortSignal): PromiseLike<TResult>;
}
