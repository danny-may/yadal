/*
 * Auto generated file, do not edit
 */
import { type ListGuildScheduledEventUsersRequestPath, type ListGuildScheduledEventUsersRequestQuery, type ListGuildScheduledEventUsersResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listGuildScheduledEventUsers";
export type RouteModel = ListGuildScheduledEventUsersRequestPath;
export const route = "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users";
export const routeKeys = Object.freeze(["guild_id", "guild_scheduled_event_id"] as const);
export type QueryModel = ListGuildScheduledEventUsersRequestQuery;
export const queryKeys = Object.freeze(["with_member", "limit", "before", "after"] as const);
export type Response = ListGuildScheduledEventUsersResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListGuildScheduledEventUsersResponseJSON;
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
