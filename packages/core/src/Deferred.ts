import { abortable } from "./util";

export class Deferred<T> {
    readonly #promise: Promise<(signal?: AbortSignal) => T | PromiseLike<T>>;
    readonly resolve: (value: T) => void;
    readonly reject: (error: unknown) => void;
    readonly defer: (action: (signal?: AbortSignal) => T | PromiseLike<T>) => void;

    constructor(signal?: AbortSignal) {
        const [promise, resolve, reject] = deferredParts<(signal?: AbortSignal) => T | PromiseLike<T>>();
        this.resolve = v => resolve(() => v);
        this.reject = err => reject(err);
        this.defer = resolve;
        this.#promise = promise;

        if (signal !== undefined) {
            const abort = () => this.defer(() => { throw signal.reason });
            signal.addEventListener('abort', abort);
            this.#promise.finally(() => signal.removeEventListener('abort', abort));
        }
    }

    async wait(signal?: AbortSignal): Promise<T> {
        const result = await abortable(this.#promise, signal);
        return await result(signal);
    }
}

function deferredParts<T>() {
    let resolve: (value: T) => void;
    let reject: (error: unknown) => void;
    return [
        new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
        }),
        resolve!,
        reject!
    ] as const
}