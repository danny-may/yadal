export class TimedAbortController extends AbortController implements Disposable {
    readonly #timeout: ReturnType<typeof setTimeout>;

    constructor(timeoutMs: number) {
        super();

        this.#timeout = setTimeout(() => this.abort(), timeoutMs);
    }

    abort(reason?: any): void {
        super.abort(reason);
        this[Symbol.dispose]();
    }

    [Symbol.dispose]() {
        clearTimeout(this.#timeout);
    }
}