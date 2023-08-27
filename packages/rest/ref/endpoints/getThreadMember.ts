/*
 * Auto generated file, do not edit
 */
import { type GetThreadMemberRequestPath, type GetThreadMemberRequestQuery, type ThreadMemberResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getThreadMember";
export type RouteModel = GetThreadMemberRequestPath;
export const route = "/channels/{channel_id}/thread-members/{user_id}";
export const routeKeys = Object.freeze(["channel_id", "user_id"] as const);
export type QueryModel = GetThreadMemberRequestQuery;
export const queryKeys = Object.freeze(["with_member"] as const);
export type Response = ThreadMemberResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ThreadMemberResponse;
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
