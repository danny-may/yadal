import { IHttpRequest, IHttpResponse, IRoute } from "@yadal/rest";

export interface IDiscordRestProxyMiddleware {
    handle<T extends object>(route: IRoute<T>, params: T, request: IHttpRequest, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse>, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
