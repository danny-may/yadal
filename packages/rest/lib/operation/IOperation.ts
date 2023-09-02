import { HttpMethod, IHttpRequest, IHttpResponse } from "../http/index.js";
import { Route } from "../routes/index.js";

export interface IOperation<Method extends HttpMethod, TModel extends object, TResult> {
    readonly route: Route<Method, TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}