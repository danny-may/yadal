/*
 * Auto generated file, do not edit
 */
import { type DeleteGuildScheduledEventRequestPath, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "DELETE";
export const name = "deleteGuildScheduledEvent";
export type RouteModel = DeleteGuildScheduledEventRequestPath;
export const route = "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}";
export const routeKeys = Object.freeze(["guild_id", "guild_scheduled_event_id"] as const);
export type Response = undefined;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
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
