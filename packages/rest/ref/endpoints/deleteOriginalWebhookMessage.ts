/*
 * Auto generated file, do not edit
 */
import { type DeleteOriginalWebhookMessageRequestPath, type DeleteOriginalWebhookMessageRequestQuery, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "DELETE";
export const name = "deleteOriginalWebhookMessage";
export type RouteModel = DeleteOriginalWebhookMessageRequestPath;
export const route = "/webhooks/{webhook_id}/{webhook_token}/messages/@original";
export const routeKeys = Object.freeze(["webhook_id", "webhook_token"] as const);
export type QueryModel = DeleteOriginalWebhookMessageRequestQuery;
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
