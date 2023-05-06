import { RateLimitHeaders } from "./RateLimitHeaders";
import { IRateLimitManager } from "./IRateLimitManager";
import { Deferred, KeepAlive } from "../timeout";
import { IRateLimitResult } from ".";
import { AbortSignal, Timeout } from "@yadal/dep";

export interface IRateLimitManagerOptions {
    readonly globalLimit: number;
    readonly globalReset: number;
    readonly fallbackReset: number;
}

export class RateLimitManager implements IRateLimitManager {
    readonly #idHashMap: Record<string, string>;
    readonly #hashBucketMap: Record<string, IRateLimitState>;
    readonly #requests: ProcessQueue<IQueuedRequest>;
    readonly #limit: number;
    readonly #resetDelay: number;
    readonly #fallbackReset: number;
    #remain: number;
    #reset?: Timeout;

    constructor(options: IRateLimitManagerOptions) {
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

    async request<TResult>(key: string, global: boolean, getResult: () => PromiseLike<IRateLimitResult<TResult>>, signal?: AbortSignal) {
        if (!this.#tryEnter(key, global))
            await this.#waitForEnter(key, global, signal)

        const { value, headers } = await getResult();
        await this.#update(key, headers);
        return value;
    }

    async #update(bucketId: string, headers: RateLimitHeaders) {
        if (headers.bucket !== undefined && this.#idHashMap[bucketId] !== headers.bucket) {
            this.#idHashMap[bucketId] = headers.bucket;
            const current = this.#hashBucketMap[bucketId]
            if (current !== undefined) {
                this.#hashBucketMap[headers.bucket] ??= current;
                delete this.#hashBucketMap[bucketId];
            }
        }

        const bucket = this.#getBucket(bucketId);
        if (headers.limit !== undefined)
            bucket.limit = headers.limit;
        if (headers.remaining !== undefined)
            bucket.remain = headers.remaining;
        if (headers.isGlobal) {
            this.#remain = 0;
            if (headers.retryAfterS !== undefined) {
                this.#reset?.remove();
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
            bucket.timeout?.remove();
            bucket.timeout = new Timeout(() => this.#process(), Math.max(0, reset.valueOf() - Date.now())).unref();
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
            bucket.timeout?.remove();
            bucket.remain = bucket.limit;
            bucket.reset = undefined;
        }

        if (bucket.remain <= 0 || (global && this.#remain-- <= 0))
            return false;

        bucket.remain--;
        bucket.lastRequest = now;
        return true;
    }

    async #waitForEnter(key: string, global: boolean, signal?: AbortSignal) {
        const waiter = new Deferred<void>(signal);
        const request = { key, global, ...waiter }
        this.#requests.add(request);
        try {
            await waiter.wait();
        } finally {
            this.#requests.delete(request);
        }
    }

    #resetGlobal(delayMs: number) {
        this.#reset ??= new Timeout(() => {
            this.#remain = this.#limit;
            this.#reset = undefined;
            this.#process();
        }, delayMs).unref();
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
    reset?: number;
    timeout?: Timeout;
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
    readonly #keepAlive: KeepAlive;

    constructor() {
        this.#requests = new Set();
        this.#keepAlive = new KeepAlive();
        this.#keepAlive.disable();
    }

    *[Symbol.iterator]() {
        yield* this.#requests;
    }

    add(value: T) {
        if (this.#requests.size < this.#requests.add(value).size && this.#requests.size === 1)
            this.#keepAlive.enable();
    }

    delete(value: T) {
        if (this.#requests.delete(value) && this.#requests.size === 0)
            this.#keepAlive.disable();
    }
}