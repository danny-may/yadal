import { IHttpResponse } from "@yadal/rest";
import { IRestProxyInvocation, IRestProxyMiddleware } from "./IRestProxyMiddleware.js";
import { URlResolver } from "@yadal/core";

export class URLResolverMiddleware implements IRestProxyMiddleware {
    readonly #resolver: URlResolver;

    constructor(resolver: URlResolver) {
        this.#resolver = resolver;
    }

    handle<T extends object>(context: IRestProxyInvocation<T>, next: () => PromiseLike<IHttpResponse>): PromiseLike<IHttpResponse> {
        const url = context.request.url;
        if (url.protocol === 'rel:')
            context.request.url = this.#resolver.resolve(url);
        return next();
    }
}
