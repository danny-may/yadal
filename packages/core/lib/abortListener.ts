export function abortListener(signal: AbortSignal | undefined, handler: (reason: unknown) => void): Disposable {
    if (signal === undefined)
        return noOpDispose;

    const fn = () => handler(signal.reason);
    signal.addEventListener('abort', fn);
    return {
        [Symbol.dispose]() {
            signal.removeEventListener('abort', fn);
        }
    };
}
const noOpDispose = Object.freeze({ [Symbol.dispose]() { } });
