import { URLResolverMiddleware, HeaderMiddleware, HttpRequestMiddleware, IOperationSenderMiddleware, MiddlewareOperationSender, RetryMiddleware, HttpClient, defineOperationClient } from "@yadal/rest";
import { ProtocolURLResolver, createUrlMerger } from "@yadal/core";
import { operations, defaultUserAgent } from "./defaults.js";

export class CdnClient extends defineOperationClient(operations) {
    static get defaultBaseUrl() {
        return new URL('https://cdn.discordapp.com/')
    }

    static urlResolver(baseUrl?: URL) {
        return new ProtocolURLResolver({
            'cdn:': createUrlMerger(baseUrl ?? this.defaultBaseUrl)
        })
    }

    readonly http: HttpClient;

    constructor(options: CdnClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        super(new MiddlewareOperationSender([
            new URLResolverMiddleware(CdnClient.urlResolver(options.baseUrl)),
            new HeaderMiddleware({
                'User-Agent': options.userAgent ?? defaultUserAgent
            }),
            ...options.middleware ?? [],
            new RetryMiddleware(),
            new HttpRequestMiddleware(http)
        ]));
        this.http = http;
    }
}

export interface CdnClientOptions {
    readonly http?: HttpClient;
    readonly baseUrl?: URL;
    readonly middleware?: Iterable<IOperationSenderMiddleware>;
    readonly userAgent?: `${string} (${string}, ${string})`;
}