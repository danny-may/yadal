/*
 * Auto generated file, do not edit
 */
import { type ErrorResponse } from './discord.js';
export class DiscordRestError extends Error {
    readonly response: ErrorResponse | null;

    constructor(response: ErrorResponse | null, message?: string) {
        super(message ?? response?.message ?? 'Unknown discord rest error');
        this.response = response;
    }
}
