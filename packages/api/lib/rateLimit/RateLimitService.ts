import { RateLimitHeaders } from "./RateLimitHeaders.js";
import { Deferred, abortListener, keepAlive, scopedTimeout } from "@yadal/core";

export interface IRateLimitServiceOptions {
    readonly globalLimit: number;
    readonly globalReset: number;
    readonly fallbackReset: number;
}

export interface IRateLimitService {
    clear(key?: string): void;
    wait(key: string, global: boolean, signal?: AbortSignal): Promise<void>;
    update(key: string, headers: RateLimitHeaders): void;
}

export class RateLimitService implements IRateLimitService {
    readonly #idHashMap: Record<string, string>;
    readonly #hashBucketMap: Record<string, IRateLimitState>;
    readonly #requests: ProcessQueue<IQueuedRequest>;
    readonly #limit: number;
    readonly #resetDelay: number;
    readonly #fallbackReset: number;
    #remain: number;
    #reset?: Disposable | undefined;

    constructor(options: IRateLimitServiceOptions) {
        this.#idHashMap = {};
        this.#hashBucketMap = {};
        this.#requests = new ProcessQueue();
        this.#limit = this.#remain = options.globalLimit;
        this.#resetDelay = options.globalReset;
        this.#fallbackReset = options.fallbackReset;
    }

    clear(key?: string): void {
        const filter: (p: string) => boolean = key === undefined
            ? () => true
            : p => p === key

        for (const pending of this.#requests)
            if (filter(pending.key))
                pending.reject(new Error('Request was aborted'));
    }

    async wait(key: string, global: boolean, signal?: AbortSignal) {
        if (!this.#tryEnter(key, global))
            await this.#waitForEnter(key, global, signal)
    }

    update(key: string, headers: RateLimitHeaders) {
        if (headers.bucket !== undefined && this.#idHashMap[key] !== headers.bucket) {
            this.#idHashMap[key] = headers.bucket;
            const current = this.#hashBucketMap[key]
            if (current !== undefined) {
                this.#hashBucketMap[headers.bucket] ??= current;
                delete this.#hashBucketMap[key];
            }
        }

        const bucket = this.#getBucket(key);
        if (headers.limit !== undefined)
            bucket.limit = headers.limit;
        if (headers.remaining !== undefined)
            bucket.remain = headers.remaining;
        if (headers.isGlobal) {
            this.#remain = 0;
            if (headers.retryAfterS !== undefined) {
                this.#reset?.[Symbol.dispose]();
                this.#reset = undefined;
                this.#resetGlobal(headers.retryAfterS * 1000);
            }
        }

        const reset = this.#getReset(headers);
        if (reset === undefined) {
            if (bucket.reset === undefined)
                bucket.limit = bucket.remain = Infinity;
        } else if (bucket.reset === undefined || bucket.reset < reset) {
            bucket.reset = reset;
            bucket.timeout?.[Symbol.dispose]();
            bucket.timeout = scopedTimeout(() => this.#process(), Math.max(0, reset.valueOf() - Date.now()), false);
        }
    }

    #process() {
        for (const request of this.#requests) {
            if (this.#tryEnter(request.key, request.global)) {
                this.#requests.delete(request);
                request.resolve();
                if (this.#remain === 0)
                    break;
            }
        }

        if (this.#limit > this.#remain)
            this.#resetGlobal(this.#resetDelay);
    }

    #tryEnter(key: string, global: boolean): boolean {
        const bucket = this.#getBucket(key);
        const now = Date.now();

        const reset = bucket.reset ?? bucket.lastRequest + this.#fallbackReset;
        if (reset <= now) {
            bucket.timeout?.[Symbol.dispose]();
            bucket.remain = bucket.limit;
            delete bucket.reset;
        }

        if (bucket.remain <= 0 || (global && this.#remain-- <= 0))
            return false;

        bucket.remain--;
        bucket.lastRequest = now;
        return true;
    }

    async #waitForEnter(key: string, global: boolean, signal?: AbortSignal) {
        using scope = new DisposableStack();
        const waiter = scope.use(new Deferred<void>());
        scope.use(abortListener(signal, waiter.reject));
        const request = { key, global, ...waiter }
        this.#requests.add(request);
        try {
            await waiter.promise;
        } finally {
            this.#requests.delete(request);
        }
    }

    #resetGlobal(delayMs: number) {
        this.#reset ??= scopedTimeout(() => {
            this.#remain = this.#limit;
            this.#reset = undefined;
            this.#process();
        }, delayMs, false);
    }

    #getBucket(id: string) {
        return this.#hashBucketMap[this.#idHashMap[id] ?? id] ??= {
            limit: 1,
            remain: 1,
            lastRequest: Date.now()
        };
    }

    #getReset(details: RateLimitHeaders) {
        if (details.reset !== undefined)
            return details.reset.valueOf();
        if (details.resetAfterS !== undefined)
            return (details.timestamp?.valueOf() ?? Date.now()) + details.resetAfterS * 1000;
        if (details.retryAfterS !== undefined)
            return (details.timestamp?.valueOf() ?? Date.now()) + details.retryAfterS * 1000;
        return undefined;
    }
}

interface IRateLimitState {
    limit: number;
    remain: number;
    reset?: number | undefined;
    timeout?: Disposable | undefined;
    lastRequest: number;
}

interface IQueuedRequest {
    readonly key: string;
    readonly global: boolean;
    readonly resolve: () => void;
    readonly reject: (reason?: unknown) => void;
}

class ProcessQueue<T> {
    readonly #requests: Set<T>;
    #keepAlive: Disposable | undefined;

    constructor() {
        this.#requests = new Set();
    }

    *[Symbol.iterator]() {
        yield* this.#requests;
    }

    add(value: T) {
        if (this.#requests.size === 0)
            this.#keepAlive = keepAlive();
        this.#requests.add(value);
    }

    delete(value: T) {
        if (this.#requests.delete(value) && this.#requests.size === 0)
            this.#keepAlive?.[Symbol.dispose]();
    }
}