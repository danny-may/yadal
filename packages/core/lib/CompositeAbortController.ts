export class CompositeAbortController extends AbortController implements Disposable {
    readonly #unbind: Array<() => void> = [];

    constructor(...args: AbortSignalConvertable[]) {
        super();
        for (const signal of CompositeAbortController.#distinctSignals(args))
            this.#bind(signal);
    }

    #bind(signal: AbortSignal) {
        const listener = () => this.abort(signal.reason);
        signal.addEventListener('abort', listener);
        this.#unbind.push(signal.removeEventListener.bind(signal, 'abort', listener));
    }

    static * #distinctSignals(value: AbortSignalConvertable) {
        const seen = new Set<Abortable>();
        for (const signal of this.#findSignals(value))
            if (seen.size < seen.add(signal).size)
                yield signal;
    }

    static * #findSignals(value: AbortSignalConvertable): Generator<AbortSignal> {
        if (value === undefined)
            return;
        if ('signal' in value)
            yield value.signal;
        else if (Symbol.iterator in value)
            for (const x of value)
                yield* this.#findSignals(x);
        else
            yield value;
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

type Abortable = AbortSignal | { readonly signal: AbortSignal };
type AbortSignalConvertable = Abortable | undefined | Iterable<AbortSignalConvertable>