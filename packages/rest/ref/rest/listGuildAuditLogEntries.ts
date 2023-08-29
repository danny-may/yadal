/*
 * Auto generated file, do not edit
 */
import { type ListGuildAuditLogEntriesRequestPath, type ListGuildAuditLogEntriesRequestQuery, type ListGuildAuditLogEntriesRequestHeaders, type GuildAuditLogResponse, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listGuildAuditLogEntries";
export type RouteModel = ListGuildAuditLogEntriesRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/audit-logs$/i;
export const route = {
    method: "GET",
    template: "/guilds/{guild_id}/audit-logs",
    keys: Object.freeze(["guild_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/audit-logs$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/audit-logs` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!)
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
    global: true,
    bucket(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return `get /guilds/${model.guild_id}/audit-logs` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ListGuildAuditLogEntriesRequestQuery;
export const query = {
    keys: Object.freeze(["user_id","action_type","before","after","limit"] as const),
    * getValues(model: QueryModel) {
        if ("user_id" in model) {
            const value = model["user_id"];
            if (value !== undefined && value !== null) {
                yield ["user_id", String(value)] as ["user_id", string];
            }
        }
                if ("action_type" in model) {
            const value = model["action_type"];
            if (value !== undefined && value !== null) {
                yield ["action_type", String(value)] as ["action_type", string];
            }
        }
                if ("before" in model) {
            const value = model["before"];
            if (value !== undefined && value !== null) {
                yield ["before", String(value)] as ["before", string];
            }
        }
                if ("after" in model) {
            const value = model["after"];
            if (value !== undefined && value !== null) {
                yield ["after", String(value)] as ["after", string];
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
export type HeaderModel = ListGuildAuditLogEntriesRequestHeaders;
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
export type Response = GuildAuditLogResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildAuditLogResponse;
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