/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildRequestPath, type UpdateGuildRequestHeaders, type GuildResponse, type RateLimitError, type ErrorResponse, type GuildPatchRequestPartial } from '../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../helpers.js';
export const name = "updateGuild";
export type RouteModel = UpdateGuildRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)$/i;
export const route = {
    method: "PATCH",
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
        return `patch /guilds/${model.guild_id}` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = UpdateGuildRequestHeaders;
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
export type Response = GuildResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as GuildResponse;
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
export type Body = GuildPatchRequestPartial;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "name": model["name" as keyof typeof model],
            "description": model["description" as keyof typeof model],
            "region": model["region" as keyof typeof model],
            "icon": model["icon" as keyof typeof model],
            "verification_level": model["verification_level" as keyof typeof model],
            "default_message_notifications": model["default_message_notifications" as keyof typeof model],
            "explicit_content_filter": model["explicit_content_filter" as keyof typeof model],
            "preferred_locale": model["preferred_locale" as keyof typeof model],
            "afk_timeout": model["afk_timeout" as keyof typeof model],
            "afk_channel_id": model["afk_channel_id" as keyof typeof model],
            "system_channel_id": model["system_channel_id" as keyof typeof model],
            "owner_id": model["owner_id" as keyof typeof model],
            "splash": model["splash" as keyof typeof model],
            "banner": model["banner" as keyof typeof model],
            "system_channel_flags": model["system_channel_flags" as keyof typeof model],
            "features": model["features" as keyof typeof model],
            "discovery_splash": model["discovery_splash" as keyof typeof model],
            "home_header": model["home_header" as keyof typeof model],
            "rules_channel_id": model["rules_channel_id" as keyof typeof model],
            "safety_alerts_channel_id": model["safety_alerts_channel_id" as keyof typeof model],
            "public_updates_channel_id": model["public_updates_channel_id" as keyof typeof model],
            "premium_progress_bar_enabled": model["premium_progress_bar_enabled" as keyof typeof model]
        }))]
    };
    
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
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
