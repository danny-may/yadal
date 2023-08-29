/*
 * Auto generated file, do not edit
 */
import { type GetThreadMemberRequestPath, type GetThreadMemberRequestQuery, type GetThreadMemberRequestHeaders, type RateLimitError, type ThreadMemberResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getThreadMember";
export type RouteModel = GetThreadMemberRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/thread-members\/(?<user_id>.*?)$/i;
export const route = {
    method: "GET",
    template: "/channels/{channel_id}/thread-members/{user_id}",
    keys: Object.freeze(["channel_id","user_id"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/thread-members\/(?<user_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/thread-members/${encodeURIComponent(model.user_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!),
            ["user_id"]: decodeURIComponent(match.groups!["user_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `get /channels/${model.channel_id}/thread-members/<any>`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = GetThreadMemberRequestQuery;
export const query = {
    keys: Object.freeze(["with_member"] as const),
    * getValues(model: QueryModel) {
        if ("with_member" in model) {
            const value = model["with_member"];
            if (value !== undefined && value !== null) {
                yield ["with_member", String(value)] as ["with_member", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetThreadMemberRequestHeaders;
export const headers = {
    keys: Object.freeze(["x-audit-log-reason"] as const),
    getValues(model: HeaderModel) {
        const result = {} as { [P in keyof HeaderModel]?: string };
        if ("x-audit-log-reason" in model) {
            const value = model["x-audit-log-reason"];
            if (value !== undefined && value !== null) {
                result["x-audit-log-reason"] = String(value);
            }
        }
        return result;
    }
} as const;
Object.freeze(headers);
export type Response = ThreadMemberResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ThreadMemberResponse;
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