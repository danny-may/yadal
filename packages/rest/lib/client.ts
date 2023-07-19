import { BaseUrlMiddleware, EndpointHeaderMiddleware, HttpRequestMiddleware, IEndpoint, IEndpointClientMiddleware, MiddlewareEndpointClient, RateLimitMiddleware, RetryMiddleware, apiEndpoints, cdnEndpoints } from "./endpoints/index.js";
import { HttpClient } from "./http/index.js";
import { IRateLimitService, RateLimitManager, RateLimitService, apiRateLimits, cdnRateLimits } from "./rateLimit/index.js";
import pkg from '../package.json' assert { type: 'json' };

type RestMethods<T extends Record<PropertyKey, IEndpoint<object, unknown>>> = {
    [P in keyof T]: T[P] extends IEndpoint<infer Model, infer Result> ? [{}] extends [Model]
    ? (signal?: AbortSignal) => Promise<Result>
    : (request: Model, signal?: AbortSignal) => Promise<Result>
    : never;
}

const defaultUserAgent = `${pkg.name} (${pkg.repository.url}, ${pkg.version})`;

export interface DiscordRestClient extends RestMethods<typeof apiEndpoints>, RestMethods<typeof cdnEndpoints> { }
export class DiscordRestClient {
    readonly ratelimit: IRateLimitService;
    readonly http: HttpClient;
    readonly #apiClient: MiddlewareEndpointClient;

    static {
        for (const endpoints of [apiEndpoints, cdnEndpoints] as const) {
            for (const [key, endpoint] of Object.entries(endpoints)) {
                const send = (client: DiscordRestClient, args: unknown[]) => (client.#apiClient.send as Function)(endpoint, ...args);
                Object.defineProperty(this.prototype, key, {
                    configurable: false,
                    enumerable: false,
                    writable: false,
                    value: {
                        async [key](this: DiscordRestClient, ...args: unknown[]) {
                            if (args[0] instanceof AbortSignal)
                                args.unshift({});
                            else
                                args[0] ??= {};
                            return await send(this, args);
                        }
                    }[key]
                });
            }
        }
    }

    constructor(options: DiscordRestClientOptions = {}) {
        this.ratelimit = options.ratelimit ?? new RateLimitService({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        this.http = options.http ?? new HttpClient();
        this.#apiClient = new MiddlewareEndpointClient([
            new EndpointHeaderMiddleware({
                'Authorization': options.authHeader,
                'User-Agent': options.userAgent ?? defaultUserAgent
            }),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new RateLimitMiddleware(
                new RateLimitManager(
                    this.ratelimit,
                    [
                        ...Object.values(apiRateLimits),
                        ...Object.values(cdnRateLimits)
                    ]
                )
            ),
            new BaseUrlMiddleware({
                ['api:']: options.apiUrl ?? new URL('https://discord.com/api/v10'),
                ['cdn:']: options.cdnUrl ?? new URL('https://cdn.discordapp.com/')
            }),
            new HttpRequestMiddleware(this.http)
        ]);
    }
}

export interface DiscordRestClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly apiUrl?: URL;
    readonly cdnUrl?: URL;
    readonly middleware?: Iterable<IEndpointClientMiddleware>;
    readonly ratelimit?: IRateLimitService;
    readonly userAgent?: `${string} (${string}, ${string})`;
}