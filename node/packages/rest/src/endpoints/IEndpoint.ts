import { HttpMethod, IHttpResponse } from "../http";
import { IEndpointRequest } from "./IEndpointRequest";

export interface IEndpoint<TModel, TResult> {
    readonly method: HttpMethod;
    readonly globalRateLimit: boolean;
    createRequest(model: TModel): IEndpointRequest<TModel, TResult>;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}