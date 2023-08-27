/*
 * Auto generated file, do not edit
 */
import { type ListGuildApplicationCommandPermissionsRequestPath, type ListGuildApplicationCommandPermissionsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listGuildApplicationCommandPermissions";
export type RouteModel = ListGuildApplicationCommandPermissionsRequestPath;
export const route = "/applications/{application_id}/guilds/{guild_id}/commands/permissions";
export const routeKeys = Object.freeze(["application_id", "guild_id"] as const);
export type Response = ListGuildApplicationCommandPermissionsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListGuildApplicationCommandPermissionsResponseJSON;
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
