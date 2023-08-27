/*
 * Auto generated file, do not edit
 */
import { type ListGuildAuditLogEntriesRequestPath, type ListGuildAuditLogEntriesRequestQuery, type GuildAuditLogResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listGuildAuditLogEntries";
export type RouteModel = ListGuildAuditLogEntriesRequestPath;
export const route = "/guilds/{guild_id}/audit-logs";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type QueryModel = ListGuildAuditLogEntriesRequestQuery;
export const queryKeys = Object.freeze(["user_id", "action_type", "before", "after", "limit"] as const);
export type Response = GuildAuditLogResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildAuditLogResponse;
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
