import { URLResolverMiddleware, HeaderMiddleware, HttpRequestMiddleware, IOperationSenderMiddleware, MiddlewareOperationSender, RetryMiddleware, HttpClient, defineOperationClient } from "@yadal/rest";
import { ProtocolURLResolver, URlResolver, createUrlMerger } from "@yadal/core";
import { operations, defaultUserAgent } from "./defaults.js";

export class CdnClient extends defineOperationClient(operations) {
    readonly http: HttpClient;

    constructor(options: CdnClientOptions = {}) {
        const http = options.http ?? new HttpClient();
        super(new MiddlewareOperationSender([
            new URLResolverMiddleware(makeUrlResolver(options.urlResolver)),
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

function makeUrlResolver(options: CdnClientOptions['urlResolver']) {
    if (typeof options === 'object' && 'resolve' in options)
        return options;

    const { cdn } = options ?? {};
    return new ProtocolURLResolver({
        ['cdn:']: typeof cdn === 'function' ? cdn : createUrlMerger(cdn ?? new URL('https://cdn.discordapp.com/'))
    });
}

export interface CdnClientOptions {
    readonly http?: HttpClient;
    readonly urlResolver?: URlResolver | {
        readonly cdn?: URL | ((url: URL) => URL);
    };
    readonly middleware?: Iterable<IOperationSenderMiddleware>;
    readonly userAgent?: `${string} (${string}, ${string})`;
}