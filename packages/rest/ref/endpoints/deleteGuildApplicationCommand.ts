/*
 * Auto generated file, do not edit
 */
import { type DeleteGuildApplicationCommandRequestPath, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "DELETE";
export const name = "deleteGuildApplicationCommand";
export type RouteModel = DeleteGuildApplicationCommandRequestPath;
export const route = "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}";
export const routeKeys = Object.freeze(["application_id", "guild_id", "command_id"] as const);
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
