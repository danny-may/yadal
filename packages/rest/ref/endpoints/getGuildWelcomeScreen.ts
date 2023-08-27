/*
 * Auto generated file, do not edit
 */
import { type GetGuildWelcomeScreenRequestPath, type GuildWelcomeScreenResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getGuildWelcomeScreen";
export type RouteModel = GetGuildWelcomeScreenRequestPath;
export const route = "/guilds/{guild_id}/welcome-screen";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = GuildWelcomeScreenResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildWelcomeScreenResponse;
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
