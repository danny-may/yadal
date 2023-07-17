import { HttpHeaders } from "../http/index.js";

export class RateLimitHeaders {
    readonly #headers: HttpHeaders;
    readonly isGlobal: boolean;
    readonly bucket?: string;
    readonly limit?: number;
    readonly remaining?: number;
    readonly reset?: Date;
    readonly retryAfterS?: number;
    readonly resetAfterS?: number
    readonly timestamp?: Date

    constructor(headers: HttpHeaders) {
        this.#headers = headers;
        this.isGlobal = this.#headers.get('X-RateLimit-Global') === 'true';
        this.bucket = this.#headers.get('X-RateLimit-Bucket');
        this.limit = this.#tryReadNumber('X-RateLimit-Limit');
        this.remaining = this.#tryReadNumber('X-RateLimit-Remaining');
        const reset = this.#tryReadNumber('X-RateLimit-Reset');
        this.reset = reset === undefined ? undefined : new Date(reset * 1000);
        this.retryAfterS = this.#tryReadNumber('Retry-After');
        this.resetAfterS = this.#tryReadNumber('X-RateLimit-Reset-After');
        const dateStr = this.#headers.get('Date');
        this.timestamp = dateStr === undefined ? undefined : new Date(dateStr);
    }

    #tryReadNumber(name: string) {
        const header = Number(this.#headers.get(name));
        return isNaN(header) ? undefined : header;
    }
}
