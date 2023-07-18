import { Deferred } from "./Deferred.js";

export class Timeout<T = void> {
    readonly #waiter: Deferred<T>;
    readonly #id: number;
    readonly #ref: { ref?(): void; unref?(): void };

    constructor(callback: () => T, timeout: number) {
        this.#waiter = new Deferred<T>();
        const t = setTimeout(() => {
            this.#waiter.resolve(callback());
        }, timeout)
        this.#id = Number(t);
        this.#ref = typeof t === 'object' ? t : {};
    }

    cancel() {
        clearTimeout(this.#id);
        this.#waiter.reject(new Error('Timeout cancelled'));
    }

    ref() {
        this.#ref.ref?.();
        return this;
    }

    unref() {
        this.#ref.unref?.();
        return this;
    }

    wait() {
        return this.#waiter.wait();
    }

    [Symbol.dispose]() {
        clearTimeout(this.#id);
        this.#waiter.reject(new Error('Timeout disposed'));
    }
}