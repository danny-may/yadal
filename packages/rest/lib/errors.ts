import * as Discord from "../ref/discord.js";

export class DiscordRestError extends Error implements Discord.ErrorResponse {
    readonly code: number;
    readonly errors?: Discord.ErrorDetails | undefined;

    constructor(error: Discord.ErrorResponse) {
        super(`[${error.code}] ${error.message}`)

        this.code = error.code;
        this.errors = error.errors;
    }
}

export class DiscordRateLimitError extends Error implements Discord.RateLimitError {
    readonly code?: number;
    readonly global: boolean;
    readonly retry_after: number;

    constructor(error: Discord.RateLimitError) {
        super(`[${error.code}][global: ${error.global}] ${error.message}`);

        this.code = error.code;
        this.global = error.global;
        this.retry_after = error.retry_after;
    }
}