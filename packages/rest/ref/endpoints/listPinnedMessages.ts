/*
 * Auto generated file, do not edit
 */
import { type ListPinnedMessagesRequestPath, type ListPinnedMessagesResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listPinnedMessages";
export type RouteModel = ListPinnedMessagesRequestPath;
export const route = "/channels/{channel_id}/pins";
export const routeKeys = Object.freeze(["channel_id"] as const);
export type Response = ListPinnedMessagesResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListPinnedMessagesResponseJSON;
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
