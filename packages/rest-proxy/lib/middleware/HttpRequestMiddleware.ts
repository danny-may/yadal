import { HttpClient } from "@yadal/rest";
import { IRestProxyInvocation, IRestProxyMiddleware } from "./IRestProxyMiddleware.js";


export class HttpRequestMiddleware implements IRestProxyMiddleware {
    readonly #client: HttpClient;

    constructor(client: HttpClient) {
        this.#client = client;
    }

    async handle<T extends object>(context: IRestProxyInvocation<T>, _: unknown, signal?: AbortSignal) {
        return await this.#client.send(context.request, signal);
    }
}