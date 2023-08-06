import { RESTError, RESTErrorData, RESTJSONErrorCodes, RESTRateLimit } from "discord-api-types/v10";

export class DiscordRestError extends Error implements RESTError {
    readonly code: number;
    readonly errors?: RESTErrorData | undefined;

    constructor(error: RESTError) {
        const code = RESTJSONErrorCodes[error.code] ?? error.code;
        super(`[${code}] ${error.message}`)

        this.code = error.code;
        this.errors = error.errors;
    }
}

export class DiscordRateLimitError extends Error implements RESTRateLimit {
    readonly code?: number;
    readonly global: boolean;
    readonly retry_after: number;

    constructor(error: RESTRateLimit) {
        const code = RESTJSONErrorCodes[error.code ?? 0] ?? error.code ?? 'Rate limit';
        super(`[${code}][global: ${error.global}] ${error.message}`);

        this.code = error.code;
        this.global = error.global;
        this.retry_after = error.retry_after;
    }
}