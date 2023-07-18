import { Deferred } from "./Deferred.js";
import { Timeout } from "./Timeout.js";

export class KeepAlive {
    #timer: { ref?(): void; unref?(): void; } = {}

    constructor() {
        this.#renew()
    }

    enable() {
        this.#timer.ref?.();
    }
    disable() {
        this.#timer.unref?.();
    }

    #renew() {
        const result: ReturnType<typeof setTimeout> | number = setTimeout(() => this.#renew(), 1 << 30);
        if (typeof result === 'object') {
            this.#timer = result;
        } else {
            this.#timer = {};
        }
    }
}

export async function sleep(durationMs: number, signal?: AbortSignal) {
    const waiter = new Deferred<void>(signal);
    const timeout = new Timeout(waiter.resolve, durationMs);
    try {
        await waiter.wait();
    } finally {
        timeout.cancel();
    }
}

export function abortListener(signal: AbortSignal | undefined, handler: (reason: unknown) => void): Disposable {
    if (signal === undefined)
        return { [Symbol.dispose]() { } };
    const fn = () => handler(signal.reason)
    signal.addEventListener('abort', fn);
    return {
        [Symbol.dispose]() {
            signal.removeEventListener('abort', fn);
        }
    }
}