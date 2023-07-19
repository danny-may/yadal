export function scopedInterval(callback: () => void, intervalMs: number, ref = true) {
    let interval: undefined | ReturnType<typeof setInterval> = setInterval(callback, intervalMs);
    if (!ref && typeof interval.unref === 'function')
        interval.unref();

    return {
        [Symbol.dispose]() {
            if (interval === undefined)
                return;

            clearInterval(interval);
            interval = undefined;
        }
    };
}
