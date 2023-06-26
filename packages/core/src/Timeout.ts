import { Deferred } from "./Deferred";

export class Timeout<T = void> {
    readonly #waiter: Deferred<T>;
    readonly #timeout: NodeJS.Timeout;

    constructor(callback: () => T, timeout: number) {
        this.#waiter = new Deferred<T>();
        this.#timeout = setTimeout(() => {
            this.#waiter.resolve(callback() as T)
        }, timeout);
    }

    remove() {
        clearTimeout(this.#timeout);
    }

    ref() {
        this.#timeout.ref();
        return this;
    }

    unref() {
        this.#timeout.unref();
        return this;
    }

    wait() {
        return this.#waiter.wait();
    }
}