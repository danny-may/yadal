import { Deferred } from "./Deferred";
import { AbortController, AbortSignal, Timeout } from "./globals";

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

export async function parallel<T>(source: AsyncIterable<T>, action: (value: T) => PromiseLike<unknown> | unknown) {
    const pending = new Set<Promise<void>>();
    const errors: unknown[] = [];
    const errored = new Deferred<null>();
    const erroredPromise = errored.wait();
    const actionAsync = async (value: T) => void await action(value);
    const iter = source[Symbol.asyncIterator]();
    try {
        while (true) {
            const nextPromise = iter.next();
            const reject = await Promise.race([erroredPromise, nextPromise]) === null;
            const next = await nextPromise;
            if (!next.done) {
                const promise = actionAsync(next.value)
                    .catch(err => {
                        errored.resolve(null);
                        errors.push(err);
                    })
                    .finally(() => pending.delete(promise));
                pending.add(promise);
            }
            if (reject)
                break;
        }
        await Promise.all(pending);
    } catch (err) {
        errors.push(err);
    }
    try {
        await iter.return?.();
    } catch (err) {
        errors.push(err);
    }
    if (errors.length > 0)
        throw new AggregateError(errors);
}

export async function asyncHandler<TEvent, TMessage>(event: TEvent, events: { [P in 'addEventListener' | 'removeEventListener']: (event: TEvent, handler: (message: TMessage) => Promise<void>) => void }, handler: (message: TMessage) => void | PromiseLike<void>, signal?: AbortSignal): Promise<void> {
    const done = new Deferred<void>();
    const pending = new Set<Promise<void>>();
    const errors: unknown[] = [];
    const handleImpl = async (m: TMessage) => handler(m);
    const handle = async (m: TMessage) => {
        const promise = handleImpl(m).catch(err => {
            errors.push(err);
            done.resolve();
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

export async function abortable<T>(promise: PromiseLike<T>, signal?: AbortSignal) {
    if (signal === undefined)
        return await promise;

    const deferred = new Deferred(signal);
    deferred.resolve(await promise);
    return await deferred.wait();
}