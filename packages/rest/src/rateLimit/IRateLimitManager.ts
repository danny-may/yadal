import { HttpMethod } from "..";
import { IRoute } from "../paths";
import { RateLimitHeaders } from "./RateLimitHeaders";

export interface IRateLimitManager {
    get<T extends object>(method: HttpMethod, route: IRoute<T>, model: T): IRateLimiter | undefined;
    clear(): void;
}

export interface IRateLimiter {
    wait(signal?: AbortSignal): PromiseLike<void>;
    update(headers: RateLimitHeaders): void
    clear(): void;
}
