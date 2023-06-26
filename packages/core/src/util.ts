import { Deferred } from "./Deferred";
import { Timeout } from "./Timeout";

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

export function chainAbort(controller: AbortController, signals: Iterable<AbortSignal>) {
    const handlers: Array<[AbortSignal, () => void]> = [];
    for (const signal of new Set(signals)) {
        const abort = () => controller.abort(signal.reason);
        signal.addEventListener('abort', abort);
        handlers.push([signal, abort]);
    }
    const detach = () => {
        for (const [signal, abort] of handlers)
            signal.removeEventListener('abort', abort);
        controller.signal.removeEventListener('abort', detach);
    };

    controller.signal.addEventListener('abort', detach);
    return detach;
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
        throw new AggregateError(errors);
}

export async function abortable<T>(promise: PromiseLike<T>, signal?: AbortSignal): Promise<T> {
    if (signal === undefined)
        return await promise;

    const deferred = new Deferred<never>(signal);
    const timeout = deferred.wait();

    // The timeout throwing but not being caught isnt a problem, this guarantees
    // that the error will never be unhandled and cause the process to crash
    timeout.catch(() => { });
    try {
        return await Promise.race([timeout, promise]);
    } finally {
        // Either the promise resolved first or the signal triggered.
        // If the promise resolved first, the timeout will never be re-awaited
        // If the timeout rejected first, this will do nothing
        deferred.resolve(undefined as never);
    }
}