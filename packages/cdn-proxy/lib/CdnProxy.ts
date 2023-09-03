import { CdnClient } from '@yadal/cdn';
import { HttpClient, RouteMatcher, RouteModel } from '@yadal/rest';
import { HttpRequestMiddleware, IRestProxyMiddleware, MiddlewareRestProxyHandler, RetryMiddleware, RouteBasedRestProxy, URLResolverMiddleware, toNodeHttp } from '@yadal/rest-proxy'
import { IncomingMessage, ServerResponse } from 'http';

export class CdnProxy extends RouteBasedRestProxy<RouteModel<Routes>> {
    readonly http: HttpClient;
    static get protocol(): typeof CdnClient.protocol {
        return CdnClient.protocol;
    }

    constructor(options: CdnProxyOptions) {
        const http = options.http ?? new HttpClient();
        super(new MiddlewareRestProxyHandler([
            new URLResolverMiddleware(CdnClient.urlResolver(options.baseUrl)),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new HttpRequestMiddleware(http)
        ]), matcher);
        this.http = http;
    }

    asRequestHandler<
        Request extends typeof IncomingMessage = typeof IncomingMessage,
        Response extends typeof ServerResponse = typeof ServerResponse,
    >(onError?: (error: unknown) => void) {
        return toNodeHttp<Request, Response>(CdnClient.protocol, this, onError)
    }
}

const matcher = RouteMatcher.fromOperations(CdnClient.operations);
type Routes = typeof CdnClient['operations'][keyof typeof CdnClient['operations']]['route'];
export interface CdnProxyOptions {
    readonly http?: HttpClient;
    readonly baseUrl?: URL;
    readonly middleware?: Iterable<IRestProxyMiddleware>;
}