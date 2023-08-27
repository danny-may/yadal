/*
 * Auto generated file, do not edit
 */
import { type ListMessageReactionsByEmojiRequestPath, type ListMessageReactionsByEmojiRequestQuery, type ListMessageReactionsByEmojiResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listMessageReactionsByEmoji";
export type RouteModel = ListMessageReactionsByEmojiRequestPath;
export const route = "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}";
export const routeKeys = Object.freeze(["channel_id", "message_id", "emoji_name"] as const);
export type QueryModel = ListMessageReactionsByEmojiRequestQuery;
export const queryKeys = Object.freeze(["after", "limit"] as const);
export type Response = ListMessageReactionsByEmojiResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListMessageReactionsByEmojiResponseJSON;
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
