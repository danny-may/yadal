export class Deferred<T> {
    readonly promise: Promise<T>;
    readonly resolve!: (value: T | PromiseLike<T>) => void;
    readonly reject!: (error?: unknown) => void;

    constructor() {
        this.promise = new Promise((res, rej) => {
            // @ts-expect-error
            this.resolve = res;
            // @ts-expect-error
            this.reject = rej;
        });
    }

    [Symbol.dispose]() {
        this.reject(new Error('Deferred was disposed'));
    }
}
