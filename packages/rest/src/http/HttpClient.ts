import { CompositeAbortController, TimedAbortController } from "@yadal/core";
import { IHttpHandler } from "./IHttpHandler.js";
import { IHttpRequest } from "./IHttpRequest.js";
import { defaultHttpHandler } from "./defaultHttpHandler.js";

export class HttpClient {
    readonly #handler: IHttpHandler;
    #abortInflight: AbortController;
    #defaultTimeoutMs: number;

    constructor(options: IHttpClientOptions = {}) {
        const {
            handler = defaultHttpHandler,
            defaultTimeoutMs = 300000
        } = options;
        if (handler === undefined) {
            throw new Error('No handler given and no default handler is available');
        }
        this.#handler = handler;
        this.#abortInflight = new AbortController();
        this.#defaultTimeoutMs = defaultTimeoutMs;
    }

    async send(request: IHttpRequest, signal?: AbortSignal) {
        using controller = new CompositeAbortController(
            new TimedAbortController(this.#defaultTimeoutMs),
            signal,
            this.#abortInflight
        );
        return await this.#handler(request, controller.signal);
    }

    abort() {
        const controller = this.#abortInflight;
        this.#abortInflight = new AbortController();
        controller.abort();
    }
}

export interface IHttpClientOptions {
    handler?: IHttpHandler;
    defaultTimeoutMs?: number;
}
