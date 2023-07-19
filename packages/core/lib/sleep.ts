import { Deferred } from "./Deferred.js";
import { abortListener } from "./abortListener.js";
import { scopedTimeout } from "./scopedTimeout.js";

export async function sleep(durationMs: number, signal?: AbortSignal) {
    const waiter = new Deferred<void>();

    using scope = new DisposableStack();
    scope.use(abortListener(signal, waiter.reject));
    scope.use(scopedTimeout(waiter.resolve, durationMs));

    await waiter.promise;
}
