/*
 * Auto generated file, do not edit
 */
import { type ListGuildBansRequestPath, type ListGuildBansRequestQuery, type ListGuildBansRequestHeaders, type ListGuildBansResponseJSON, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listGuildBans";
export type RouteModel = ListGuildBansRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/bans$/i;
export const route = {
    method: "GET",
    template: "/guilds/{guild_id}/bans",
    keys: Object.freeze(["guild_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/bans$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/bans` as const satisfies `/${string}`;
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
        return `get /guilds/${model.guild_id}/bans` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ListGuildBansRequestQuery;
export const query = {
    keys: Object.freeze(["limit","before","after"] as const),
    * getValues(model: QueryModel) {
        if ("limit" in model) {
            const value = model["limit"];
            if (value !== undefined && value !== null) {
                yield ["limit", String(value)] as ["limit", string];
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
    }
} as const;
Object.freeze(query);
export type HeaderModel = ListGuildBansRequestHeaders;
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
export type Response = ListGuildBansResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ListGuildBansResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(JSON.parse(decode(await content())) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(JSON.parse(decode(await content())) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
declare const TextDecoder: typeof import('node:util').TextDecoder;
declare type TextDecoder = import('node:util').TextDecoder;
const decoder = new TextDecoder();
const typedArray: new () => Exclude<Extract<Parameters<TextDecoder["decode"]>[0], ArrayBufferView>, DataView> = Object.getPrototypeOf(Uint8Array.prototype).constructor;
function decode(content: ArrayBufferView) {
    if (content instanceof typedArray || content instanceof DataView)
        return decoder.decode(content);
    return decoder.decode(new Uint8Array(content.buffer, content.byteOffset, content.byteLength));
}
