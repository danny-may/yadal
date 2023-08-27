/*
 * Auto generated file, do not edit
 */
import { type GetGuildRequestPath, type GetGuildRequestQuery, type GuildWithCountsResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getGuild";
export type RouteModel = GetGuildRequestPath;
export const route = "/guilds/{guild_id}";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type QueryModel = GetGuildRequestQuery;
export const queryKeys = Object.freeze(["with_counts"] as const);
export type Response = GuildWithCountsResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildWithCountsResponse;
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
