import { IHttpRequest } from "../http";
import { IEndpoint } from "./IEndpoint";


export interface IEndpointRequest<TModel extends object, TResult> {
    readonly endpoint: IEndpoint<TModel, TResult>;
    model: TModel;
    http: IHttpRequest;
}
