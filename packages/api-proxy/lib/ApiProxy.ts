import { ApiClient, ApiClientOptions, IRateLimitService, RateLimitManager, RateLimitService } from '@yadal/api';
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
            new URLResolverMiddleware(ApiClient.makeUrlResolver(options.urlResolver)),
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

const matcher = RouteMatcher.fromOperations(ApiClient.operations);
type Routes = typeof ApiClient['operations'][keyof typeof ApiClient['operations']]['route'];
export interface ApiProxyOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly urlResolver?: ApiClientOptions['urlResolver'];
    readonly middleware?: Iterable<IRestProxyMiddleware>;
    readonly rateLimit?: IRateLimitService;
}