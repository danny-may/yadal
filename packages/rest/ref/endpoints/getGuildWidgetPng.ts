/*
 * Auto generated file, do not edit
 */
import { type GetGuildWidgetPngRequestPath, type GetGuildWidgetPngRequestQuery, type GetGuildWidgetPngResponsePNG, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getGuildWidgetPng";
export type RouteModel = GetGuildWidgetPngRequestPath;
export const route = "/guilds/{guild_id}/widget.png";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type QueryModel = GetGuildWidgetPngRequestQuery;
export const queryKeys = Object.freeze(["style"] as const);
export type Response = GetGuildWidgetPngResponsePNG;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "image/png") {
            return await resolve(contentType, content) as GetGuildWidgetPngResponsePNG;
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
