/*
 * Auto generated file, do not edit
 */
import { type GetGuildScheduledEventRequestPath, type GetGuildScheduledEventRequestQuery, type GetGuildScheduledEventResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getGuildScheduledEvent";
export type RouteModel = GetGuildScheduledEventRequestPath;
export const route = "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}";
export const routeKeys = Object.freeze(["guild_id", "guild_scheduled_event_id"] as const);
export type QueryModel = GetGuildScheduledEventRequestQuery;
export const queryKeys = Object.freeze(["with_user_count"] as const);
export type Response = GetGuildScheduledEventResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GetGuildScheduledEventResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
