/*
 * Auto generated file, do not edit
 */
import { type ListGuildApplicationCommandsRequestPath, type ListGuildApplicationCommandsRequestQuery, type ListGuildApplicationCommandsRequestHeaders, type ListGuildApplicationCommandsResponseJSON, type RateLimitError, type ErrorResponse } from '../../../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../helpers.js';
export const name = "listGuildApplicationCommands";
export type RouteModel = ListGuildApplicationCommandsRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands$/i;
export const route = {
    method: "GET",
    template: "/applications/{application_id}/guilds/{guild_id}/commands",
    keys: Object.freeze(["application_id","guild_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const),
        "OAuth2": Object.freeze([
            "applications.commands.update"
        ] as const)
    } as const),
    get regex(){
        return /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}/guilds/${encodeURIComponent(model.guild_id)}/commands` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["application_id"]: decodeURIComponent(match["application_id"]!),
                ["guild_id"]: decodeURIComponent(match["guild_id"]!)
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
        return `get /applications/<any>/guilds/${model.guild_id}/commands` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ListGuildApplicationCommandsRequestQuery;
export const query = {
    keys: Object.freeze(["with_localizations"] as const),
    * getValues(model: QueryModel) {
        if ("with_localizations" in model) {
            const value = model["with_localizations"];
            if (value !== undefined && value !== null) {
                yield ["with_localizations", String(value)] as ["with_localizations", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = ListGuildApplicationCommandsRequestHeaders;
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
export type Response = ListGuildApplicationCommandsResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ListGuildApplicationCommandsResponseJSON;
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
