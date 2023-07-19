import { IHttpRequest, IHttpResponse, IRoute } from '@yadal/rest';

export interface IDiscordRestProxyHandler {
    handleRequest<T extends object>(route: IRoute<T>, params: T, request: IHttpRequest, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
