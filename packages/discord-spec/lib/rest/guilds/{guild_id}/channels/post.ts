/*
 * Auto generated file, do not edit
 */
import { type CreateGuildChannelRequestPath, type CreateGuildChannelRequestHeaders, type GuildChannelResponse, type RateLimitError, type ErrorResponse, type CreateGuildChannelRequest } from '../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../helpers.js';
export const name = "createGuildChannel";
export type RouteModel = CreateGuildChannelRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/channels$/i;
export const route = {
    method: "POST",
    template: "/guilds/{guild_id}/channels",
    keys: Object.freeze(["guild_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/channels$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/channels` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
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
        return `post /guilds/${model.guild_id}/channels` as const;
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
export type HeaderModel = CreateGuildChannelRequestHeaders;
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
export type Response = GuildChannelResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as GuildChannelResponse;
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
export type Body = CreateGuildChannelRequest;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "type": model["type" as keyof typeof model],
            "name": model["name" as keyof typeof model],
            "position": model["position" as keyof typeof model],
            "topic": model["topic" as keyof typeof model],
            "bitrate": model["bitrate" as keyof typeof model],
            "user_limit": model["user_limit" as keyof typeof model],
            "nsfw": model["nsfw" as keyof typeof model],
            "rate_limit_per_user": model["rate_limit_per_user" as keyof typeof model],
            "parent_id": model["parent_id" as keyof typeof model],
            "permission_overwrites": model["permission_overwrites" as keyof typeof model],
            "rtc_region": model["rtc_region" as keyof typeof model],
            "video_quality_mode": model["video_quality_mode" as keyof typeof model],
            "default_auto_archive_duration": model["default_auto_archive_duration" as keyof typeof model],
            "default_reaction_emoji": model["default_reaction_emoji" as keyof typeof model],
            "default_sort_order": model["default_sort_order" as keyof typeof model],
            "default_forum_layout": model["default_forum_layout" as keyof typeof model],
            "available_tags": model["available_tags" as keyof typeof model]
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