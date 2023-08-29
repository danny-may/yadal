/*
 * Auto generated file, do not edit
 */
import { type ListPublicArchivedThreadsRequestPath, type ListPublicArchivedThreadsRequestQuery, type RateLimitError, type ThreadsResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listPublicArchivedThreads";
export type RouteModel = ListPublicArchivedThreadsRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/threads\/archived\/public$/i;
export const route = {
    method: "GET",
    template: "/channels/{channel_id}/threads/archived/public",
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/threads\/archived\/public$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/threads/archived/public` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `get /channels/${model.channel_id}/threads/archived/public`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = ListPublicArchivedThreadsRequestQuery;
export const queryKeys = Object.freeze(["before", "limit"] as const);
export type Response = ThreadsResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ThreadsResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(await resolve(contentType, content) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
