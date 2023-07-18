import { IRoute, IHttpRequest, IHttpResponse } from "@yadal/rest";
import { IDiscordRestProxyMiddleware } from "./IDiscordRestProxyMiddleware.js";

export class BaseUrlMiddleware implements IDiscordRestProxyMiddleware {
    readonly #baseUrls: Record<string, URL>;
    readonly #decompose: typeof decomposeByProtocol;

    constructor(baseUrls: Record<string, URL>, decompose = decomposeByProtocol) {
        this.#baseUrls = baseUrls;
        this.#decompose = decompose;
    }

    handle<T extends object>(_route: IRoute<T>, _params: T, request: IHttpRequest, next: (signal?: AbortSignal) => PromiseLike<IHttpResponse>): PromiseLike<IHttpResponse> {
        const [key, relative] = this.#decompose(request.url);
        if (key in this.#baseUrls) {
            request.url = new URL(relative, this.#baseUrls[key]);
        }
        return next();
    }
}

function decomposeByProtocol(url: URL): readonly [key: string, relative: string] {
    const { protocol, href } = url;
    return [protocol, href.slice(protocol.length + 1)] as const
}