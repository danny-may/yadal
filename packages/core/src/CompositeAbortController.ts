export class CompositeAbortController extends AbortController implements Disposable {
    readonly #unbind: Array<() => void> = [];

    constructor(...args: AbortSignalConvertable[]) {
        super();
        this.#add(this.abort.bind(this), args);
    }

    #add(listener: () => void, value: AbortSignalConvertable) {
        if (value === undefined)
            return;
        if (Symbol.dispose in value && value[Symbol.dispose] !== undefined)
            this.#unbind.push(value[Symbol.dispose].bind(value));
        if ('signal' in value) {
            value = value.signal;
        } else if (!('addEventListener' in value)) {
            for (const v of value)
                this.#add(listener, v);
            return;
        }

        value.addEventListener('abort', listener);
        this.#unbind.push(value.removeEventListener.bind(value, 'abort', listener, undefined));
    }

    abort(reason?: any): void {
        super.abort(reason);
        this[Symbol.dispose]();
    }

    [Symbol.dispose]() {
        for (const fn of this.#unbind)
            fn();
        this.#unbind.length = 0;
    }
}


type MaybeDisposable = (Disposable | {})
type DisposableAbortSignal = AbortSignal & MaybeDisposable;
type DisposableAbortController = AbortController & MaybeDisposable & { readonly signal: DisposableAbortSignal };
type AbortSignalConvertable = DisposableAbortSignal | DisposableAbortController | undefined | Iterable<AbortSignalConvertable>