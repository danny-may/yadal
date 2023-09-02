import { HttpMethod, IHttpRequest, IHttpResponse, Route } from "@yadal/rest";

export interface IDiscordRestProxyMiddleware {
    handle<T extends object>(route: Route<HttpMethod, T>, params: Record<keyof T, string>, request: IHttpRequest, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse>, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
