/*
 * Auto generated file, do not edit
 */
import { type GetGuildTemplateRequestPath, type GuildTemplateResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getGuildTemplate";
export type RouteModel = GetGuildTemplateRequestPath;
export const route = "/guilds/templates/{code}";
export const routeKeys = Object.freeze(["code"] as const);
export type Response = GuildTemplateResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildTemplateResponse;
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
