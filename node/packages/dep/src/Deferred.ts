import { AbortSignal } from ".";

export class Deferred<T> {
    readonly #promise: Promise<T>;
    readonly resolve: (value: T) => void;
    readonly reject: (error: unknown) => void;

    constructor(signal?: AbortSignal) {
        [this.#promise, this.resolve, this.reject] = deferredParts<T>();
        if (signal !== undefined) {
            const abort = () => this.reject(signal.reason);
            signal.addEventListener('abort', abort);
            this.#promise.finally(() => signal.removeEventListener('abort', abort));
        }
    }

    async wait(signal?: AbortSignal): Promise<T> {
        if (signal === undefined)
            return await this.#promise;
        return await Promise.race([
            this.#promise,
            new Deferred<never>(signal).wait()
        ])
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