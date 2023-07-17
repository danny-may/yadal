import { IHttpResponse } from "../http/index.js";
import { IEndpoint } from "./IEndpoint.js";


export interface IEndpointResponse<TModel extends object, TResult> {
    readonly endpoint: IEndpoint<TModel, TResult>;
    result: TResult;
    http: IHttpResponse;
}
