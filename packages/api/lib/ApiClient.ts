import { URLResolverMiddleware, HeaderMiddleware, HttpRequestMiddleware, IOperationSenderMiddleware, MiddlewareOperationSender, RetryMiddleware, HttpClient, defineOperationClient, AuthorizeMiddleware, AuthorizationProvider } from "@yadal/rest";
import { IRateLimitService, RateLimitManager, RateLimitMiddleware, RateLimitService } from "./rateLimit/index.js";
import { ProtocolURLResolver, createUrlMerger } from "@yadal/core";
import { operations, defaultUserAgent, rateLimits } from "./defaults.js";

export class ApiClient extends defineOperationClient(operations) {
    static readonly rateLimits = rateLimits;
    static get defaultBaseUrl() {
        return new URL('https://discord.com/api/v10');
    }
    static urlResolver(baseUrl?: URL) {
        return new ProtocolURLResolver({
            'api:': createUrlMerger(baseUrl ?? this.defaultBaseUrl)
        })
    }

    static readonly rateLimitBucketConfig = Object.freeze({
        globalLimit: 50,
        globalReset: 1000,
        fallbackReset: 60000
    });

    readonly rateLimit: IRateLimitService;
    readonly http: HttpClient;
    constructor(options: ApiClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        const rateLimit = options.rateLimit ?? new RateLimitService(ApiClient.rateLimitBucketConfig);
        const { authHeader = false } = options;
        super(new MiddlewareOperationSender([
            new URLResolverMiddleware(ApiClient.urlResolver(options.baseUrl)),
            new AuthorizeMiddleware(new AuthorizationProvider({
                'BotToken': () => authHeader,
                'Anonymous': () => null
            })),
            new HeaderMiddleware({
                'User-Agent': options.userAgent ?? defaultUserAgent
            }),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new RateLimitMiddleware(
                new RateLimitManager(
                    rateLimit,
                    Object.values(rateLimits)
                )
            ),
            new HttpRequestMiddleware(http)
        ]));
        this.rateLimit = rateLimit;
        this.http = http;
    }
}

export interface ApiClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly baseUrl?: URL;
    readonly middleware?: Iterable<IOperationSenderMiddleware>;
    readonly rateLimit?: IRateLimitService;
    readonly userAgent?: `${string} (${string}, ${string})`;
}