import { IHttpRequest } from "../http/index.js";
import { IEndpoint } from "./IEndpoint.js";


export interface IEndpointRequest<TModel extends object, TResult> {
    readonly endpoint: IEndpoint<TModel, TResult>;
    model: TModel;
    http: IHttpRequest;
}
