export interface IRateLimit<T> {
    wait(value: T, signal?: AbortSignal): Promise<void>;
}

export interface IRateLimitFactory<T> {
    createRateLimit(): IRateLimit<T>;
}