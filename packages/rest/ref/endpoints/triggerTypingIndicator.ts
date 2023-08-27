/*
 * Auto generated file, do not edit
 */
import { type TriggerTypingIndicatorRequestPath, type TypingIndicatorResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "triggerTypingIndicator";
export type RouteModel = TriggerTypingIndicatorRequestPath;
export const route = "/channels/{channel_id}/typing";
export const routeKeys = Object.freeze(["channel_id"] as const);
export type Response = (TypingIndicatorResponse | undefined);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as TypingIndicatorResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    if (statusCode === 204) {
        return undefined;
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
