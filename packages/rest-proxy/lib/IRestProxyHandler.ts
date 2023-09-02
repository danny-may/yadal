import { HttpMethod, IHttpRequest, IHttpResponse, Route } from '@yadal/rest';

export interface IRestProxyHandler {
    handleRequest<T extends object>(route: Route<HttpMethod, T>, params: Record<keyof T, string>, request: IHttpRequest, signal?: AbortSignal): PromiseLike<IHttpResponse>;
}
