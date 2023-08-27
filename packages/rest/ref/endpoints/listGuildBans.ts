/*
 * Auto generated file, do not edit
 */
import { type ListGuildBansRequestPath, type ListGuildBansRequestQuery, type ListGuildBansResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listGuildBans";
export type RouteModel = ListGuildBansRequestPath;
export const route = "/guilds/{guild_id}/bans";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type QueryModel = ListGuildBansRequestQuery;
export const queryKeys = Object.freeze(["limit", "before", "after"] as const);
export type Response = ListGuildBansResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListGuildBansResponseJSON;
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
