import { HttpMethod, IHttpResponse } from "../http/index.js";
import { IOperation } from "./IOperation.js";


export interface IOperationResponse<TModel extends object, TResult> {
    readonly operation: IOperation<HttpMethod, TModel, TResult>;
    result: TResult;
    http: IHttpResponse;
}
