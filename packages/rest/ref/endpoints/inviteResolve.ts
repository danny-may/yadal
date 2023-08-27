/*
 * Auto generated file, do not edit
 */
import { type InviteResolveRequestPath, type InviteResolveRequestQuery, type InviteResolveResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "inviteResolve";
export type RouteModel = InviteResolveRequestPath;
export const route = "/invites/{code}";
export const routeKeys = Object.freeze(["code"] as const);
export type QueryModel = InviteResolveRequestQuery;
export const queryKeys = Object.freeze(["with_counts", "guild_scheduled_event_id"] as const);
export type Response = InviteResolveResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as InviteResolveResponseJSON;
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
