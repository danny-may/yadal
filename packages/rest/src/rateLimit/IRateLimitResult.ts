import { RateLimitHeaders } from "./RateLimitHeaders.js";

export interface IRateLimitResult<T> {
    readonly headers: RateLimitHeaders;
    readonly value: T;
}
