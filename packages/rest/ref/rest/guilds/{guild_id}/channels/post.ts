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
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"]))
    ];
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("position" in model) {
        const value = model["position"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"position\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("topic" in model) {
        const value = model["topic"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"topic\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("bitrate" in model) {
        const value = model["bitrate"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"bitrate\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("user_limit" in model) {
        const value = model["user_limit"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"user_limit\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("nsfw" in model) {
        const value = model["nsfw"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"nsfw\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rate_limit_per_user" in model) {
        const value = model["rate_limit_per_user"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"rate_limit_per_user\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("parent_id" in model) {
        const value = model["parent_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"parent_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("permission_overwrites" in model) {
        const value = model["permission_overwrites"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"permission_overwrites\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rtc_region" in model) {
        const value = model["rtc_region"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"rtc_region\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("video_quality_mode" in model) {
        const value = model["video_quality_mode"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"video_quality_mode\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_auto_archive_duration" in model) {
        const value = model["default_auto_archive_duration"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_auto_archive_duration\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_reaction_emoji" in model) {
        const value = model["default_reaction_emoji"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_reaction_emoji\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_sort_order" in model) {
        const value = model["default_sort_order"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_sort_order\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_forum_layout" in model) {
        const value = model["default_forum_layout"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_forum_layout\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("available_tags" in model) {
        const value = model["available_tags"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"available_tags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    chunks.push(jsonEncoded["}"]);
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };
    
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
const jsonEncoded = {
    ",":encoder.encode(","),
    "{":encoder.encode("{"),
    "}":encoder.encode("}"),
    "\"type\":":encoder.encode("\"type\":"),
    "\"name\":":encoder.encode("\"name\":"),
    "\"position\":":encoder.encode("\"position\":"),
    "\"topic\":":encoder.encode("\"topic\":"),
    "\"bitrate\":":encoder.encode("\"bitrate\":"),
    "\"user_limit\":":encoder.encode("\"user_limit\":"),
    "\"nsfw\":":encoder.encode("\"nsfw\":"),
    "\"rate_limit_per_user\":":encoder.encode("\"rate_limit_per_user\":"),
    "\"parent_id\":":encoder.encode("\"parent_id\":"),
    "\"permission_overwrites\":":encoder.encode("\"permission_overwrites\":"),
    "\"rtc_region\":":encoder.encode("\"rtc_region\":"),
    "\"video_quality_mode\":":encoder.encode("\"video_quality_mode\":"),
    "\"default_auto_archive_duration\":":encoder.encode("\"default_auto_archive_duration\":"),
    "\"default_reaction_emoji\":":encoder.encode("\"default_reaction_emoji\":"),
    "\"default_sort_order\":":encoder.encode("\"default_sort_order\":"),
    "\"default_forum_layout\":":encoder.encode("\"default_forum_layout\":"),
    "\"available_tags\":":encoder.encode("\"available_tags\":")
} as const;
