import { IMiddleware } from "@yadal/core";
import { HttpMethod, IHttpRequest, IHttpResponse, Route } from "@yadal/rest";


export interface IRestProxyMiddleware extends IMiddleware<IRestProxyInvocation<object>, IHttpResponse> {
    handle<T extends object>(context: IRestProxyInvocation<T>, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse> | IHttpResponse, signal?: AbortSignal): PromiseLike<IHttpResponse> | IHttpResponse;
}

export interface IRestProxyInvocation<T extends object> {
    readonly route: Route<HttpMethod, T>,
    readonly params: Record<keyof T, string>,
    readonly request: IHttpRequest
}