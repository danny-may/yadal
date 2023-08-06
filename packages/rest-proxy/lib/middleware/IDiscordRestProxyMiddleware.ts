import { IHttpRequest, IHttpResponse, Route } from "@yadal/rest";

export interface IDiscordRestProxyMiddleware {
    handle<T extends object>(route: Route<T>, params: T, request: IHttpRequest, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse>, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
