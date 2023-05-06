import { AbortSignal, Timeout } from "@yadal/dep";

export class KeepAlive {
    #timer: Timeout;

    constructor() {
        this.#timer = this.#renew();
    }

    enable() {
        this.#timer.ref();
    }

    disable() {
        this.#timer.unref();
    }

    #renew(): Timeout {
        return new Timeout(() => this.#timer = this.#renew(), 1 << 30);
    }
}

export async function sleep(durationMs: number, signal?: AbortSignal) {
    const waiter = new Deferred<void>(signal);
    const timeout = new Timeout(waiter.resolve, durationMs);
    try {
        await waiter.wait();
    } finally {
        timeout.remove();
    }
}

export class Deferred<T> {
    #promise: Promise<T>;
    readonly resolve: (value: T | PromiseLike<T>) => void;
    readonly reject: (reason?: unknown) => void;

    static #splitPromise<T>() {
        let resolve: (value: T | PromiseLike<T>) => void;
        let reject: (reason?: unknown) => void;
        return [
            new Promise<T>((res, rej) => {
                resolve = res;
                reject = rej;
            }),
            resolve!,
            reject!
        ] as const
    }

    constructor(signal?: AbortSignal) {
        [this.#promise, this.resolve, this.reject] = Deferred.#splitPromise<T>();
        if (signal !== undefined) {
            const abort = () => this.reject(signal.reason);
            signal.addEventListener('abort', abort);
            this.#promise = this.#promise.finally(() => signal.removeEventListener('abort', abort));
        }
    }

    async wait() {
        return await this.#promise;
    }
}