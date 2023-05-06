import { EndpointHeaderMiddleware, HttpRequestEndpointMiddleware, IEndpoint, IEndpointClientMiddleware, MiddlewareEndpointClient, RateLimitMiddleware, RetryMiddleware, endpoints } from "./endpoints";
import { HttpClient } from "./http";
import { IRateLimitManager, RateLimitManager } from "./rateLimit";
import packageJson from '../package.json';
import { AbortSignal, URL } from "@yadal/dep";

type RestMethods = {
    [P in keyof typeof endpoints]: typeof endpoints[P] extends IEndpoint<infer Model, infer Result> ? [void] extends [Model]
    ? (signal?: AbortSignal) => Promise<Result>
    : (request: Model, signal?: AbortSignal) => Promise<Result>
    : never;
};

const endpointKvp = Object.entries(endpoints);
const defaultUserAgent = `${packageJson.name} (${packageJson.repository.url.split('+').slice(-1)[0]}, ${packageJson.version})`;

export interface DiscordRestClient extends RestMethods { }
export class DiscordRestClient {
    readonly ratelimit: IRateLimitManager;
    readonly http: HttpClient;
    readonly #client: MiddlewareEndpointClient;

    static {
        for (const [key, endpoint] of endpointKvp) {
            Object.defineProperty(this.prototype, key, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: {
                    async [key](this: DiscordRestClient, ...args: unknown[]) {
                        if (args[0] instanceof AbortSignal)
                            args.unshift(undefined);
                        return await (this.#client.send as Function)(endpoint, ...args)
                    }
                }[key]
            });
        }
    }

    constructor(options: DiscordApiClientOptions = {}) {
        this.ratelimit = options.ratelimit ?? new RateLimitManager({
            globalLimit: 50,
            globalReset: 1000,
            fallbackReset: 60000
        });
        this.http = options.http ?? new HttpClient();
        this.#client = new MiddlewareEndpointClient([
            new EndpointHeaderMiddleware({
                'Authorization': options.authHeader,
                'User-Agent': options.userAgent ?? defaultUserAgent
            }),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new RateLimitMiddleware(this.ratelimit),
            new HttpRequestEndpointMiddleware(this.http, {
                'api': options.apiUrl ?? new URL('https://discord.com/api/v10'),
                'cdn': options.cdnUrl ?? new URL('https://cdn.discordapp.com/')
            })
        ]);
    }
}

export interface DiscordApiClientOptions {
    readonly authHeader?: string;
    readonly http?: HttpClient;
    readonly apiUrl?: URL;
    readonly cdnUrl?: URL;
    readonly middleware?: Iterable<IEndpointClientMiddleware>;
    readonly ratelimit?: IRateLimitManager;
    readonly userAgent?: `${string} (${string}, ${string})`;
}