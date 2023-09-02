import { HttpClient, HttpMethod, IHttpRequest, Route } from "@yadal/rest";
import { IRestProxyMiddleware } from "./IRestProxyMiddleware.js";


export class HttpRequestMiddleware implements IRestProxyMiddleware {
    readonly #client: HttpClient;

    constructor(client: HttpClient) {
        this.#client = client;
    }

    async handle<T extends object>(_route: Route<HttpMethod, T>, _params: Record<keyof T, string>, request: IHttpRequest, _: unknown, signal: AbortSignal | undefined) {
        return await this.#client.send(request, signal);
    }
}