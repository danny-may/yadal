import { HttpMethod, Route } from "@yadal/rest";
import { RateLimitHeaders } from "./RateLimitHeaders.js";

export interface IRateLimitManager {
    get<T extends object>(route: Route<HttpMethod, T>, model: Record<keyof T, string>): IRateLimiter | undefined;
    clear(): void;
}

export interface IRateLimiter {
    wait(signal?: AbortSignal): PromiseLike<void>;
    update(headers: RateLimitHeaders): void
    clear(): void;
}
