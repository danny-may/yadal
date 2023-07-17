import { Deferred } from "./Deferred.js";

export class DeferredIterable<TYield, TReturn = void> {
    readonly #next: Array<TYield | PromiseLike<TYield>>;
    readonly #finally?: () => void;
    #result?: () => TReturn | PromiseLike<TReturn>;
    #updated: Deferred<void>;
    items: AsyncGenerator<TYield, TReturn>;

    constructor(signal?: AbortSignal) {
        this.#updated = new Deferred();
        this.#next = [];
        if (signal !== undefined) {
            const abort = () => this.raise(signal.reason);
            signal.addEventListener('abort', abort);
            this.#finally = () => signal.removeEventListener('abort', abort);
        }
        this.items = this.#items();
        this.yield = this.yield.bind(this);
        this.raise = this.raise.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    yield(...values: Array<TYield | PromiseLike<TYield>>) {
        if (this.#result !== undefined)
            return;
        this.#next.push(...values);
        this.#updated.resolve();
    }

    raise(error?: unknown) {
        if (this.#result !== undefined)
            return;
        this.#result = () => { throw error; }
        this.#updated.resolve();
    }

    resolve(value: TReturn | PromiseLike<TReturn>) {
        if (this.#result !== undefined)
            return;
        this.#result = () => value;
        this.#updated.resolve();
    }

    async *#items() {
        try {
            while (true) {
                await this.#updated.wait();
                this.#updated = new Deferred();
                for (const elem of this.#next) {
                    try {
                        yield await elem;
                    } catch (error) {
                        this.#next.length = 0;
                        this.raise(error);
                        throw error;
                    }
                }
                this.#next.length = 0;
                if (this.#result !== undefined)
                    return this.#result();
            }
        } finally {
            this.#finally?.();
        }
    }
}