import { AbortSignal } from "@yadal/dep";
import { IRateLimitResult } from "./IRateLimitResult.js";

export interface IRateLimitManager {
    request<TResult>(key: string, global: boolean, getResult: () => PromiseLike<IRateLimitResult<TResult>>, signal?: AbortSignal): PromiseLike<TResult>;
    clear(key: string): void;
    clear(): void;
}
