import { IHttpResponse } from "../http";
import { IEndpoint } from "./IEndpoint";


export interface IEndpointResponse<TModel extends object, TResult> {
    readonly endpoint: IEndpoint<TModel, TResult>;
    result: TResult;
    http: IHttpResponse;
}
