import { HttpMethod, IHttpRequest } from "../http/index.js";
import { IOperation } from "./IOperation.js";


export interface IOperationRequest<TModel extends object, TResult> {
    readonly operation: IOperation<HttpMethod, TModel, TResult>;
    model: TModel;
    http: IHttpRequest;
}
