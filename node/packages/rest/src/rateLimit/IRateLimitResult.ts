import { RateLimitHeaders } from "./RateLimitHeaders";

export interface IRateLimitResult<T> {
    readonly headers: RateLimitHeaders;
    readonly value: T;
}
