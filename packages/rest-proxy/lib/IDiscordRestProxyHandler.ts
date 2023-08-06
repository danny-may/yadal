import { IHttpRequest, IHttpResponse, Route } from '@yadal/rest';

export interface IDiscordRestProxyHandler {
    handleRequest<T extends object>(route: Route<T>, params: T, request: IHttpRequest, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
