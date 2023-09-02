/*
 * Auto generated file, do not edit
 */
import { type GetGuildRequestPath, type GetGuildRequestQuery, type GetGuildRequestHeaders, type GuildWithCountsResponse, type RateLimitError, type ErrorResponse } from '../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../helpers.js';
export const name = "getGuild";
export type RouteModel = GetGuildRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)$/i;
export const route = {
    method: "GET",
    template: Object.freeze({
        raw: "/guilds/{guild_id}" as const,
        keys: Object.freeze(["guild_id"] as const),
        segments: Object.freeze(["/guilds/",""] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
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
    bucket(model: { [P in "guild_id"]: RouteModel[P] | string; }) {
        return `get /guilds/${model.guild_id}` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = GetGuildRequestQuery;
export const query = {
    keys: Object.freeze(["with_counts"] as const),
    * getValues(model: QueryModel) {
        if ("with_counts" in model) {
            const value = model["with_counts"];
            if (value !== undefined && value !== null) {
                yield ["with_counts", String(value)] as ["with_counts", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetGuildRequestHeaders;
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
export type Response = GuildWithCountsResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as GuildWithCountsResponse;
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
