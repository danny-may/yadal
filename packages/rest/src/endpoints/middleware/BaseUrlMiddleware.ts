import { IEndpointRequest } from "../IEndpointRequest.js";
import { IEndpointResponse } from "../IEndpointResponse.js";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware.js";

export class BaseUrlMiddleware implements IEndpointClientMiddleware {
    readonly #baseUrls: Record<string, URL>;
    readonly #decompose: typeof decomposeByProtocol;

    constructor(baseUrls: Record<string, URL>, decompose = decomposeByProtocol) {
        this.#baseUrls = baseUrls;
        this.#decompose = decompose;
    }

    handle<TModel extends object, TResult>(request: IEndpointRequest<TModel, TResult>, next: (signal?: AbortSignal) => PromiseLike<IEndpointResponse<TModel, TResult>>) {
        const [key, relative] = this.#decompose(request.http.url);
        if (key in this.#baseUrls) {
            request.http.url = new URL(relative, this.#baseUrls[key]);
        }
        return next();
    }
}

function decomposeByProtocol(url: URL): readonly [key: string, relative: string] {
    const { protocol, href } = url;
    return [protocol, href.slice(protocol.length + 1)] as const
}