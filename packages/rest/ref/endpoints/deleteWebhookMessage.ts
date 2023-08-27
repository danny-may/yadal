/*
 * Auto generated file, do not edit
 */
import { type DeleteWebhookMessageRequestPath, type DeleteWebhookMessageRequestQuery, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "DELETE";
export const name = "deleteWebhookMessage";
export type RouteModel = DeleteWebhookMessageRequestPath;
export const route = "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}";
export const routeKeys = Object.freeze(["webhook_id", "webhook_token", "message_id"] as const);
export type QueryModel = DeleteWebhookMessageRequestQuery;
export const queryKeys = Object.freeze(["thread_id"] as const);
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
