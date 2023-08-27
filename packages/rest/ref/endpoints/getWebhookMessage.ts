/*
 * Auto generated file, do not edit
 */
import { type GetWebhookMessageRequestPath, type GetWebhookMessageRequestQuery, type MessageResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getWebhookMessage";
export type RouteModel = GetWebhookMessageRequestPath;
export const route = "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}";
export const routeKeys = Object.freeze(["webhook_id", "webhook_token", "message_id"] as const);
export type QueryModel = GetWebhookMessageRequestQuery;
export const queryKeys = Object.freeze(["thread_id"] as const);
export type Response = MessageResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as MessageResponse;
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
