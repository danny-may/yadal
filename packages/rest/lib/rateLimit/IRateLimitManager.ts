import { Route } from "../routes/index.js";
import { RateLimitHeaders } from "./RateLimitHeaders.js";

export interface IRateLimitManager {
    get<T extends object>(route: Route<T>, model: T): IRateLimiter | undefined;
    clear(): void;
}

export interface IRateLimiter {
    wait(signal?: AbortSignal): PromiseLike<void>;
    update(headers: RateLimitHeaders): void
    clear(): void;
}
