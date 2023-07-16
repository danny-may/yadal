import { HttpMethod, IHttpRequest, IHttpResponse } from "../http";
import { IRoute } from "../paths";

export interface IEndpoint<TModel extends object, TResult> {
    readonly name: string;
    readonly method: HttpMethod;
    readonly route: IRoute<TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}
