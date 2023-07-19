let interval: undefined | ReturnType<typeof setInterval>;
let refCount = 0;

export function keepAlive(): Disposable {
    if (refCount++ === 0)
        interval ??= setInterval(() => { }, 1 << 30);
    return {
        [Symbol.dispose]() {
            if (interval === undefined)
                return;
            if (--refCount === 0) {
                clearInterval(interval);
                interval = undefined;
            }
        }
    }
}