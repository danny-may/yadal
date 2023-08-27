/*
 * Auto generated file, do not edit
 */
import { type ListPublicArchivedThreadsRequestPath, type ListPublicArchivedThreadsRequestQuery, type ThreadsResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listPublicArchivedThreads";
export type RouteModel = ListPublicArchivedThreadsRequestPath;
export const route = "/channels/{channel_id}/threads/archived/public";
export const routeKeys = Object.freeze(["channel_id"] as const);
export type QueryModel = ListPublicArchivedThreadsRequestQuery;
export const queryKeys = Object.freeze(["before", "limit"] as const);
export type Response = ThreadsResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ThreadsResponse;
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
