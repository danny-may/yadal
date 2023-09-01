import { HttpClient, HttpMethod, IHttpRequest, Route } from "@yadal/rest";
import { IDiscordRestProxyMiddleware } from "./IDiscordRestProxyMiddleware.js";


export class HttpRequestMiddleware implements IDiscordRestProxyMiddleware {
    readonly #client: HttpClient;

    constructor(client: HttpClient) {
        this.#client = client;
    }

    async handle<T extends object>(_route: Route<HttpMethod, T>, _params: T, request: IHttpRequest, _: unknown, signal: AbortSignal | undefined) {
        return await this.#client.send(request, signal);
    }
}