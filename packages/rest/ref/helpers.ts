/*
 * Auto generated file, do not edit
 */
import { type ErrorResponse, type RateLimitError } from './types.js';
export class DiscordRestError extends Error {
    readonly response: ErrorResponse | null;

    constructor(response: ErrorResponse | null, message?: string) {
        super(message ?? response?.message ?? 'Unknown discord rest error');
        this.response = response;
    }
}

export class DiscordRateLimitError extends Error implements RateLimitError {
    readonly code?: number;
    readonly global: boolean;
    readonly retry_after: number;

    constructor(error: RateLimitError) {
        super(`[${error.code ?? 'Rate Limit'}][global: ${error.global}] ${error.message}`);

        this.code = error.code;
        this.global = error.global;
        this.retry_after = error.retry_after;
    }
}
