import { ApiClient, IRateLimitService, RateLimitManager, RateLimitService } from '@yadal/api';
import { ProtocolURLResolver, URlResolver, createUrlMerger } from '@yadal/core';
import { HttpClient, RouteMatcher, RouteModel } from '@yadal/rest';
import { HttpRequestMiddleware, IRestProxyMiddleware, MiddlewareRestProxyHandler, RetryMiddleware, RouteBasedRestProxy, URLResolverMiddleware } from '@yadal/rest-proxy'
import { RateLimitMiddleware } from './RateLimitMiddleware.js';

export class ApiProxy extends RouteBasedRestProxy<RouteModel<Routes>> {
    readonly rateLimit: IRateLimitService;
    readonly http: HttpClient;

    constructor(options: ApiProxyOptions) {
        const http = options.http ?? new HttpClient();
        const rateLimit = options.rateLimit ?? new RateLimitService({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        super(new MiddlewareRestProxyHandler([
            new URLResolverMiddleware(makeUrlResolver(options.urlResolver)),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new RateLimitMiddleware(
                new RateLimitManager(
                    rateLimit,
                    Object.values(ApiClient.rateLimits)
                )
            ),
            new HttpRequestMiddleware(http)
        ]), matcher);
        this.rateLimit = rateLimit;
        this.http = http;
    }
}

function makeUrlResolver(options: ApiProxyOptions['urlResolver']) {
    if (typeof options === 'object' && 'resolve' in options)
        return options;

    const { rest } = options ?? {};
    return new ProtocolURLResolver({
        ['api:']: typeof rest === 'function' ? rest : createUrlMerger(rest ?? new URL('https://discord.com/api/v10')),
    });
}

const matcher = RouteMatcher.fromOperations(ApiClient.operations);
type Routes = typeof ApiClient['operations'][keyof typeof ApiClient['operations']]['route'];
export interface ApiProxyOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly urlResolver?: URlResolver | {
        readonly rest?: URL | ((url: URL) => URL);
    };
    readonly middleware?: Iterable<IRestProxyMiddleware>;
    readonly rateLimit?: IRateLimitService;
}