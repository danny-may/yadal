import { Deferred, WebSocket, DeferredIterable, Blob, URL, AbortSignal } from "@yadal/dep";

export class WebSocketConnection {
    readonly #open = new Deferred<void>();
    readonly #close = new Deferred<{ code?: number, reason?: string }>();
    readonly #socket: WebSocket;
    readonly #handlers = new Set<DeferredIterable<Blob>>();

    constructor(url: string | URL) {
        this.#socket = new WebSocket(url);
        this.#socket.binaryType = 'blob';
        this.#socket.addEventListener('open', () => this.#open.resolve());
        this.#socket.addEventListener('close', ({ code, reason }) => {
            this.#handlers.forEach(h => h.return());
            this.#close.resolve({ code, reason });
            this.#open.reject(new WebSocketClosedError(code, reason));
        });
        this.#socket.addEventListener('message', m => {
            const data = typeof m.data === 'string' || m.data instanceof ArrayBuffer
                ? new Blob([m.data], { type: 'text' })
                : m.data
            this.#handlers.forEach(h => h.yield(data));
        });
    }


    close(code?: number, reason?: string) {
        this.#socket.close(code, reason);
    }

    async send(message: Blob, signal?: AbortSignal) {
        await this.#open.wait(signal);
        this.#socket.send(message);
    }

    async waitOpen(signal?: AbortSignal) {
        return await this.#open.wait(signal);
    }

    async waitClose(signal?: AbortSignal) {
        return await this.#close.wait(signal);
    }

    async* messages(signal?: AbortSignal) {
        const messages = new DeferredIterable<Blob>(signal);
        this.#handlers.add(messages);
        try {
            yield* messages;
        } finally {
            this.#handlers.delete(messages);
        }
    }
}

export class WebSocketClosedError extends Error {
    readonly code?: number;
    readonly reason?: string;

    constructor(code?: number, reason?: string) {
        super('Socket was closed before it opened')
        this.code = code;
        this.reason = reason;
    }
}
