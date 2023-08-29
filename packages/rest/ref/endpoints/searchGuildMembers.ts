/*
 * Auto generated file, do not edit
 */
import { type SearchGuildMembersRequestPath, type SearchGuildMembersRequestQuery, type SearchGuildMembersRequestHeaders, type RateLimitError, type SearchGuildMembersResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "searchGuildMembers";
export type RouteModel = SearchGuildMembersRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/members\/search$/i;
export const route = {
    method: "GET",
    template: "/guilds/{guild_id}/members/search",
    keys: Object.freeze(["guild_id"] as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/members\/search$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/members/search` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!)
        }
    },
    rateLimitBuckets(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return ["global", `get /guilds/${model.guild_id}/members/search`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = SearchGuildMembersRequestQuery;
export const query = {
    keys: Object.freeze(["limit","query"] as const),
    * getValues(model: QueryModel) {
        if ("limit" in model) {
            const value = model["limit"];
            if (value !== undefined && value !== null) {
                yield ["limit", String(value)] as ["limit", string];
            }
        }
                if ("query" in model) {
            const value = model["query"];
            if (value !== undefined && value !== null) {
                yield ["query", String(value)] as ["query", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = SearchGuildMembersRequestHeaders;
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
export type Response = SearchGuildMembersResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as SearchGuildMembersResponseJSON;
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