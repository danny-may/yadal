import { ApiClient, IRateLimitService, RateLimitManager, RateLimitService } from '@yadal/api';
import { HttpClient, RouteMatcher, RouteModel } from '@yadal/rest';
import { AuthorizationValidator, AuthorizeMiddleware, HttpRequestMiddleware, IRestProxyMiddleware, MiddlewareRestProxyHandler, RetryMiddleware, RouteBasedRestProxy, URLResolverMiddleware, toNodeHttp } from '@yadal/rest-proxy'
import { RateLimitMiddleware } from './RateLimitMiddleware.js';
import { IncomingMessage, ServerResponse } from 'http';

export class ApiProxy extends RouteBasedRestProxy<RouteModel<Routes>> {
    readonly rateLimit: IRateLimitService;
    readonly http: HttpClient;
    static get protocol(): typeof ApiClient.protocol {
        return ApiClient.protocol;
    }

    constructor(options: ApiProxyOptions) {
        const http = options.http ?? new HttpClient();
        const rateLimit = options.rateLimit ?? new RateLimitService(ApiClient.rateLimitBucketConfig);
        const header = ApiClient.botTokenHeader(options.token);
        super(new MiddlewareRestProxyHandler([
            new URLResolverMiddleware(ApiClient.urlResolver(options.baseUrl)),
            new AuthorizeMiddleware(new AuthorizationValidator({
                'BotToken': header === undefined
                    ? () => false
                    : (_, h) => h === header,
                'Anonymous': (_, h) => h === undefined,
            })),
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

    asRequestHandler<
        Request extends typeof IncomingMessage = typeof IncomingMessage,
        Response extends typeof ServerResponse = typeof ServerResponse,
    >(onError?: (error: unknown) => void) {
        return toNodeHttp<Request, Response>(ApiClient.protocol, this, onError)
    }
}

const matcher = RouteMatcher.fromOperations(ApiClient.operations);
type Routes = typeof ApiClient['operations'][keyof typeof ApiClient['operations']]['route'];
export interface ApiProxyOptions {
    readonly token?: string;
    readonly http?: HttpClient;
    readonly baseUrl?: URL;
    readonly middleware?: Iterable<IRestProxyMiddleware>;
    readonly rateLimit?: IRateLimitService;
}