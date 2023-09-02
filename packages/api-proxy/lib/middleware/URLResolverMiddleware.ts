import { Route, IHttpRequest, IHttpResponse, HttpMethod } from "@yadal/rest";
import { IDiscordRestProxyMiddleware } from "./IDiscordRestProxyMiddleware.js";
import { URlResolver } from "@yadal/core";

export class URLResolverMiddleware implements IDiscordRestProxyMiddleware {
    readonly #resolver: URlResolver;

    constructor(resolver: URlResolver) {
        this.#resolver = resolver;
    }

    handle<T extends object>(_route: Route<HttpMethod, T>, _params: Record<keyof T, string>, request: IHttpRequest, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse>): PromiseLike<IHttpResponse> {
        const url = request.url;
        if (url.protocol === 'rel:')
            request.url = this.#resolver.resolve(url);
        return next();
    }
}
