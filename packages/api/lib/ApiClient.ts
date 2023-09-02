import { URLResolverMiddleware, HeaderMiddleware, HttpRequestMiddleware, IOperationSenderMiddleware, MiddlewareOperationSender, RetryMiddleware, HttpClient, defineOperationClient } from "@yadal/rest";
import { IRateLimitService, RateLimitManager, RateLimitMiddleware, RateLimitService } from "./rateLimit/index.js";
import { ProtocolURLResolver, URlResolver, createUrlMerger } from "@yadal/core";
import { operations, defaultUserAgent, rateLimits } from "./defaults.js";

export class ApiClient extends defineOperationClient(operations) {
    static readonly rateLimits = rateLimits;

    readonly rateLimit: IRateLimitService;
    readonly http: HttpClient;

    constructor(options: ApiClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        const rateLimit = options.rateLimit ?? new RateLimitService({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        super(new MiddlewareOperationSender([
            new URLResolverMiddleware(ApiClient.makeUrlResolver(options.urlResolver)),
            new HeaderMiddleware({
                'Authorization': options.authHeader,
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

    static makeUrlResolver(options: ApiClientOptions['urlResolver']) {
        if (typeof options === 'object' && 'resolve' in options)
            return options;

        const { api } = options ?? {};
        return new ProtocolURLResolver({
            ['api:']: typeof api === 'function' ? api : createUrlMerger(api ?? new URL('https://discord.com/api/v10')),
        });
    }
}

export interface ApiClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly urlResolver?: URlResolver | {
        readonly api?: URL | ((url: URL) => URL);
    };
    readonly middleware?: Iterable<IOperationSenderMiddleware>;
    readonly rateLimit?: IRateLimitService;
    readonly userAgent?: `${string} (${string}, ${string})`;
}