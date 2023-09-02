import { URLResolverMiddleware, HeaderMiddleware, HttpRequestMiddleware, IOperationSenderMiddleware, MiddlewareOperationSender, RetryMiddleware, HttpClient, defineOperationClient } from "@yadal/rest";
import { IRateLimitService, RateLimitManager, RateLimitMiddleware, RateLimitService } from "./rateLimit/index.js";
import { ProtocolURLResolver, URlResolver, createUrlMerger } from "@yadal/core";
import { operations, defaultUserAgent, rateLimits } from "./defaults.js";

export class ApiClient extends defineOperationClient(operations) {
    readonly ratelimit: IRateLimitService;
    readonly http: HttpClient;

    constructor(options: ApiClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        const ratelimit = options.ratelimit ?? new RateLimitService({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        super(new MiddlewareOperationSender([
            new URLResolverMiddleware(makeUrlResolver(options.urlResolver)),
            new HeaderMiddleware({
                'Authorization': options.authHeader,
                'User-Agent': options.userAgent ?? defaultUserAgent
            }),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new RateLimitMiddleware(
                new RateLimitManager(
                    ratelimit,
                    Object.values(rateLimits)
                )
            ),
            new HttpRequestMiddleware(http)
        ]));
        this.ratelimit = ratelimit;
        this.http = http;
    }
}

function makeUrlResolver(options: ApiClientOptions['urlResolver']) {
    if (typeof options === 'object' && 'resolve' in options)
        return options;

    const { rest } = options ?? {};
    return new ProtocolURLResolver({
        ['api:']: typeof rest === 'function' ? rest : createUrlMerger(rest ?? new URL('https://discord.com/api/v10')),
    });
}

export interface ApiClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly urlResolver?: URlResolver | {
        readonly rest?: URL | ((url: URL) => URL);
    };
    readonly middleware?: Iterable<IOperationSenderMiddleware>;
    readonly ratelimit?: IRateLimitService;
    readonly userAgent?: `${string} (${string}, ${string})`;
}