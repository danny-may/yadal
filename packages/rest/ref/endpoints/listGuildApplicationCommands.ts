/*
 * Auto generated file, do not edit
 */
import { type ListGuildApplicationCommandsRequestPath, type ListGuildApplicationCommandsRequestQuery, type ListGuildApplicationCommandsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listGuildApplicationCommands";
export type RouteModel = ListGuildApplicationCommandsRequestPath;
export const route = "/applications/{application_id}/guilds/{guild_id}/commands";
export const routeKeys = Object.freeze(["application_id", "guild_id"] as const);
export type QueryModel = ListGuildApplicationCommandsRequestQuery;
export const queryKeys = Object.freeze(["with_localizations"] as const);
export type Response = ListGuildApplicationCommandsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListGuildApplicationCommandsResponseJSON;
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
