/*
 * Auto generated file, do not edit
 */
import { type ListMyGuildsRequestQuery, type ListMyGuildsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listMyGuilds";
export type RouteModel = {};
export const route = "/users/@me/guilds";
export const routeKeys = Object.freeze([] as const);
export type QueryModel = ListMyGuildsRequestQuery;
export const queryKeys = Object.freeze(["before", "after", "limit", "with_counts"] as const);
export type Response = ListMyGuildsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListMyGuildsResponseJSON;
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
