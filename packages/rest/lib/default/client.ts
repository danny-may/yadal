import pkg from '../../package.json' assert { type: 'json' };
import { URLResolverMiddleware, EndpointHeaderMiddleware, HttpRequestMiddleware, IEndpointClientMiddleware, MiddlewareEndpointClient, RateLimitMiddleware, RetryMiddleware } from "../endpoints/index.js";
import { HttpClient } from "../http/index.js";
import { IRateLimitService, RateLimitManager, RateLimitService } from "../rateLimit/index.js";
import { ProtocolURLResolver, URlResolver, createUrlMerger } from "@yadal/core";
import { defineEndpointClient } from "../defineEndpointClient.js";
import { endpoints } from "./endpoints.js";
import { rateLimits } from './rateLimits.js';

const defaultUserAgent = `${pkg.name} (${pkg.repository.url}, ${pkg.version})`;

export class DiscordRestClient extends defineEndpointClient(endpoints) {
    readonly ratelimit: IRateLimitService;
    readonly http: HttpClient;

    constructor(options: DiscordRestClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        const ratelimit = options.ratelimit ?? new RateLimitService({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        super(new MiddlewareEndpointClient([
            new EndpointHeaderMiddleware({
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
            new URLResolverMiddleware(makeUrlResolver(options.urlResolver)),
            new HttpRequestMiddleware(http)
        ]));
        this.ratelimit = ratelimit;
        this.http = http;
    }
}

function makeUrlResolver(options: DiscordRestClientOptions['urlResolver']) {
    if (typeof options === 'object' && 'resolve' in options)
        return options;

    const { api, cdn } = options ?? {};
    return new ProtocolURLResolver({
        ['api:']: typeof api === 'function' ? api : createUrlMerger(api ?? new URL('https://discord.com/api/v10')),
        ['cdn:']: typeof cdn === 'function' ? cdn : createUrlMerger(cdn ?? new URL('https://cdn.discordapp.com/'))
    });
}

export interface DiscordRestClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly urlResolver?: URlResolver | {
        readonly api?: URL | ((url: URL) => URL);
        readonly cdn?: URL | ((url: URL) => URL);
    };
    readonly middleware?: Iterable<IEndpointClientMiddleware>;
    readonly ratelimit?: IRateLimitService;
    readonly userAgent?: `${string} (${string}, ${string})`;
}