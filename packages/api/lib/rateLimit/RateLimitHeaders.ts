import { HttpHeaders } from "@yadal/rest";

export class RateLimitHeaders {
    readonly #headers: HttpHeaders;
    readonly isGlobal: boolean;
    readonly bucket: string | undefined;
    readonly limit: number | undefined;
    readonly remaining: number | undefined;
    readonly reset: Date | undefined;
    readonly retryAfterS: number | undefined;
    readonly resetAfterS: number | undefined
    readonly timestamp: Date | undefined

    constructor(headers: HttpHeaders) {
        this.#headers = headers;
        this.isGlobal = this.#headers.get('X-RateLimit-Global')[0] === 'true';
        this.bucket = this.#headers.get('X-RateLimit-Bucket')[0];
        this.limit = this.#tryReadNumber('X-RateLimit-Limit');
        this.remaining = this.#tryReadNumber('X-RateLimit-Remaining');
        const reset = this.#tryReadNumber('X-RateLimit-Reset');
        this.reset = reset === undefined ? undefined : new Date(reset * 1000);
        this.retryAfterS = this.#tryReadNumber('Retry-After');
        this.resetAfterS = this.#tryReadNumber('X-RateLimit-Reset-After');
        const dateStr = this.#headers.get('Date')[0];
        this.timestamp = dateStr === undefined ? undefined : new Date(dateStr);
    }

    #tryReadNumber(name: string) {
        const header = Number(this.#headers.get(name));
        return isNaN(header) ? undefined : header;
    }
}
