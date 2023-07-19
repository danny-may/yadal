export function scopedTimeout(callback: () => void, timeoutMs: number, ref = true) {
    let timeout: undefined | ReturnType<typeof setTimeout> = setTimeout(callback, timeoutMs);
    if (!ref && typeof timeout.unref === 'function')
        timeout.unref();

    return {
        [Symbol.dispose]() {
            if (timeout === undefined)
                return;

            clearTimeout(timeout);
            timeout = undefined;
        }
    };
}
