import { AbortController, AbortSignal, Timeout } from "@yadal/dep";
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
        const cleanup = [(): void => requestController.signal.removeEventListener('abort', aborted)];
        const aborted = () => cleanup.forEach(c => c());
        const abortInflight = this.#abortInflight.signal;
        const abort = () => requestController.abort();

        requestController.signal.addEventListener('abort', aborted);
        abortInflight.addEventListener('abort', abort);
        cleanup.push(() => abortInflight.removeEventListener('abort', abort));
        if (signal !== undefined) {
            signal.addEventListener('abort', abort);
            cleanup.push(() => signal.removeEventListener('abort', abort));
        }
        else if (!isNaN(this.#defaultTimeoutMs)) {
            const timeout = new Timeout(abort, this.#defaultTimeoutMs).unref();
            cleanup.push(() => timeout.remove());
        }

        return Object.assign(requestController.signal, { dispose: aborted });
    }
}

export interface IHttpClientOptions {
    handler?: IHttpHandler;
    defaultTimeoutMs?: number;
}