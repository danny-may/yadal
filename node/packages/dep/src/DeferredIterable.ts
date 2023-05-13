import { AbortSignal } from ".";
import { Deferred } from "./Deferred";

export class DeferredIterable<TYield, TReturn = void> {
    readonly #next: TYield[];
    readonly #finally?: () => void;
    #result?: () => TReturn;
    #updated: Deferred<void>;

    yield: (...values: TYield[]) => void;
    throw: (error?: unknown) => void;
    return: (value: TReturn) => void;

    constructor(signal?: AbortSignal) {
        this.#updated = new Deferred();
        this.#next = [];
        if (signal !== undefined) {
            const abort = () => this.throw(signal.reason);
            signal.addEventListener('abort', abort);
            this.#finally = () => signal.removeEventListener('abort', abort);
        }
        this.yield = (...values) => {
            if (this.#result !== undefined)
                return;
            this.#next.push(...values);
            this.#updated.resolve();
        }
        this.throw = error => {
            if (this.#result !== undefined)
                return;
            this.#result = () => { throw error; }
            this.#updated.resolve();
        }
        this.return = value => {
            if (this.#result !== undefined)
                return;
            this.#result = () => value;
            this.#updated.resolve();
        }
        const main = this[Symbol.asyncIterator]();
        this[Symbol.asyncIterator] = () => main;
    }

    async *[Symbol.asyncIterator]() {
        try {
            while (true) {
                await this.#updated.wait();
                this.#updated = new Deferred();
                yield* this.#next;
                this.#next.length = 0;
                if (this.#result !== undefined)
                    return this.#result();
            }
        } finally {
            this.#finally?.();
        }
    }
}