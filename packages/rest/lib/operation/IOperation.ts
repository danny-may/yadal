import { HttpMethod, IHttpRequest, IHttpResponse } from "../http/index.js";
import { Route } from "../routes/index.js";

export interface IOperation<TModel extends object, TResult> {
    readonly route: Route<HttpMethod, TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}