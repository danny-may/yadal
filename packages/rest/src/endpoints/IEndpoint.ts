import { HttpMethod, IHttpRequest, IHttpResponse } from "../http/index.js";
import { IRoute } from "../paths/index.js";

export interface IEndpoint<TModel extends object, TResult> {
    readonly name: string;
    readonly method: HttpMethod;
    readonly route: IRoute<TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}
