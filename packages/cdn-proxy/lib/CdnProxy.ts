import { CdnClient } from '@yadal/cdn';
import { HttpClient, RouteMatcher, RouteModel } from '@yadal/rest';
import { HttpRequestMiddleware, IRestProxyMiddleware, MiddlewareRestProxyHandler, RetryMiddleware, RouteBasedRestProxy, URLResolverMiddleware } from '@yadal/rest-proxy'
import { ProtocolURLResolver, createUrlMerger } from '@yadal/core';

export class CdnProxy extends RouteBasedRestProxy<RouteModel<Routes>> {
    readonly http: HttpClient;

    constructor(options: CdnProxyOptions) {
        const http = options.http ?? new HttpClient();
        super(new MiddlewareRestProxyHandler([
            new URLResolverMiddleware(
                new ProtocolURLResolver({
                    'cdn:': createUrlMerger(options.baseUrl ?? CdnClient.defaultBaseUrl)
                })
            ),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new HttpRequestMiddleware(http)
        ]), matcher);
        this.http = http;
    }
}

const matcher = RouteMatcher.fromOperations(CdnClient.operations);
type Routes = typeof CdnClient['operations'][keyof typeof CdnClient['operations']]['route'];
export interface CdnProxyOptions {
    readonly http?: HttpClient;
    readonly baseUrl?: URL;
    readonly middleware?: Iterable<IRestProxyMiddleware>;
}