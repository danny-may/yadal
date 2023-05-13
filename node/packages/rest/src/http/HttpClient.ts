import { AbortController, AbortSignal, Timeout, chainAbort } from "@yadal/dep";
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
        const s = this.#makeAbortSignal(signal);
        try {
            return await this.#handler(request, s);
        } finally {
            s.dispose();
        }
    }

    abort() {
        const controller = this.#abortInflight;
        this.#abortInflight = new AbortController();
        controller.abort();
    }

    #makeAbortSignal(signal?: AbortSignal) {
        const requestController = new AbortController();
        const signals = [this.#abortInflight.signal];
        if (signal !== undefined)
            signals.push(signal);

        return Object.assign(requestController.signal, { dispose: chainAbort(requestController, signals) });
    }
}

export interface IHttpClientOptions {
    handler?: IHttpHandler;
    defaultTimeoutMs?: number;
}