import { Deferred } from "./Deferred.js";
import { Timeout } from "./Timeout.js";

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
        return new Timeout(() => {
            this.#timer = this.#renew()
        }, 1 << 30);
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

export async function asyncHandler<TEvent, TMessage>(event: TEvent, events: { [P in 'addEventListener' | 'removeEventListener']: (event: TEvent, handler: (message: TMessage) => Promise<void>) => void }, handler: (message: TMessage) => void | PromiseLike<void>, signal?: AbortSignal): Promise<void> {
    const done = new Deferred();
    const pending = new Set<Promise<void>>();
    const errors: unknown[] = [];
    const handleImpl = async (m: TMessage) => handler(m);
    const handle = async (m: TMessage) => {
        const promise = handleImpl(m).catch(err => {
            errors.push(err);
            done.resolve(undefined);
        });
        pending.add(promise);
        await promise;
        pending.delete(promise);
    }
    signal?.addEventListener('abort', done.resolve);
    events.addEventListener(event, handle);
    await done.wait();
    events.removeEventListener(event, handle);
    signal?.removeEventListener('abort', done.resolve);
    await Promise.all(pending);
    if (errors.length > 0)
        throw errors[0];
}

