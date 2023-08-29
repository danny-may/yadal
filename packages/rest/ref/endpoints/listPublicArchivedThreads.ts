/*
 * Auto generated file, do not edit
 */
import { type ListPublicArchivedThreadsRequestPath, type ListPublicArchivedThreadsRequestQuery, type ListPublicArchivedThreadsRequestHeaders, type RateLimitError, type ThreadsResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listPublicArchivedThreads";
export type RouteModel = ListPublicArchivedThreadsRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/threads\/archived\/public$/i;
export const route = {
    method: "GET",
    template: "/channels/{channel_id}/threads/archived/public",
    keys: Object.freeze(["channel_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/threads\/archived\/public$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/threads/archived/public` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!)
            };
    },
    parse(url: `/${string}`) {
        const result = route.tryParse(url);
        if (result === null)
            throw new Error('Invalid URL');
        return result;
    }
} as const;
Object.freeze(route);
export const rateLimit = {
    global: false,
    bucket(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return `get /channels/${model.channel_id}/threads/archived/public` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ListPublicArchivedThreadsRequestQuery;
export const query = {
    keys: Object.freeze(["before","limit"] as const),
    * getValues(model: QueryModel) {
        if ("before" in model) {
            const value = model["before"];
            if (value !== undefined && value !== null) {
                yield ["before", String(value)] as ["before", string];
            }
        }
                if ("limit" in model) {
            const value = model["limit"];
            if (value !== undefined && value !== null) {
                yield ["limit", String(value)] as ["limit", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = ListPublicArchivedThreadsRequestHeaders;
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