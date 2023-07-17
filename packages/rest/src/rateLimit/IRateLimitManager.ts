import { HttpMethod } from "../index.js";
import { IRoute } from "../paths/index.js";
import { RateLimitHeaders } from "./RateLimitHeaders.js";

export interface IRateLimitManager {
    get<T extends object>(method: HttpMethod, route: IRoute<T>, model: T): IRateLimiter | undefined;
    clear(): void;
}

export interface IRateLimiter {
    wait(signal?: AbortSignal): PromiseLike<void>;
    update(headers: RateLimitHeaders): void
    clear(): void;
}
