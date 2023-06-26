import { IEndpointResponse } from "../IEndpointResponse";
import { HttpClient } from "../../http";
import { IEndpointClientMiddleware } from "./IEndpointClientMiddleware";
import { IEndpointRequest } from "../IEndpointRequest";


export class HttpRequestEndpointMiddleware implements IEndpointClientMiddleware {
    readonly #client: HttpClient;
    readonly #baseUrls: Record<string, URL>;

    constructor(client: HttpClient, baseUrls: Record<string, URL>) {
        this.#client = client;
        this.#baseUrls = { ...baseUrls };
    }

    async handle<TModel, TResult>(request: IEndpointRequest<TModel, TResult>, _: unknown, signal: AbortSignal | undefined) {
        let url = request.url;
        const baseUrl = this.#baseUrls[url.protocol.slice(0, -1)]
        if (baseUrl !== undefined) {
            const oldUrl = url;
            url = new URL(baseUrl.toString())
            url.pathname = [url.pathname, oldUrl.host || '.', oldUrl.pathname,].map(removeMiddleSlashes).join('/');
            for (const [name, value] of oldUrl.searchParams)
                url.searchParams.append(name, value);
            if (oldUrl.hash.length > 0)
                url.hash = oldUrl.hash;
        }

        const response = await this.#client.send({
            headers: request.headers,
            method: request.endpoint.method,
            url,
            body: await request.body?.()
        }, signal);
        const result: IEndpointResponse<TModel, TResult> = {
            request,
            status: response.status,
            headers: response.headers,
            body: response.body.bind(response),
            model: () => request.endpoint.readResponse(result)
        };
        return result;
    }
}

function removeMiddleSlashes(value: string, index: number, array: string[]): string {
    if (index > 0)
        value = value.replace(/^\/+/, '');
    if (index < array.length + 1)
        value = value.replace(/\/+$/, '');
    return value;
}