export class Deferred<T> {
    readonly #promise: Promise<() => T>;
    readonly resolve: (value: T) => void;
    readonly reject: (error: unknown) => void;

    constructor(signal?: AbortSignal) {
        const [promise, resolve] = deferredParts<() => T>();
        this.resolve = v => resolve(() => v);
        this.reject = v => resolve(() => { throw v; });
        this.#promise = promise;

        if (signal !== undefined) {
            const abort = () => this.reject(signal.reason);
            signal.addEventListener('abort', abort);
            this.#promise.finally(() => signal.removeEventListener('abort', abort));
        }
    }

    async #wait() {
        const res = await this.#promise;
        return res();
    }

    async #waitAbortable(signal: AbortSignal) {
        const abort = () => this.reject(signal.reason);
        signal.addEventListener('abort', abort);
        try {
            return await this.#wait();
        } finally {
            signal.removeEventListener('abort', abort);
        }
    }

    wait(signal?: AbortSignal): Promise<T> {
        return signal === undefined
            ? this.#wait()
            : this.#waitAbortable(signal)
    }

    [Symbol.dispose]() {
        this.reject(new Error('Deferred was disposed'));
    }
}

function deferredParts<T>() {
    let resolve: (value: T) => void;
    return [
        new Promise<T>(res => resolve = res),
        resolve!
    ] as const
}
