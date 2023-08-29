/*
 * Auto generated file, do not edit
 */
import { type UpdateChannelRequestPath, type UpdateChannelRequestHeaders, type UpdateChannelResponseJSON, type RateLimitError, type ErrorResponse, type UpdateChannelRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateChannel";
export type RouteModel = UpdateChannelRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/channels/{channel_id}",
    keys: Object.freeze(["channel_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}` as const satisfies `/${string}`;
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
        return `patch /channels/${model.channel_id}` as const;
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
export type HeaderModel = UpdateChannelRequestHeaders;
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
export type Response = UpdateChannelResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as UpdateChannelResponseJSON;
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
export type Body = UpdateChannelRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("icon" in model) {
        const value = model["icon"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"icon\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("position" in model) {
        const value = model["position"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"position\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("topic" in model) {
        const value = model["topic"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"topic\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("bitrate" in model) {
        const value = model["bitrate"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"bitrate\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("user_limit" in model) {
        const value = model["user_limit"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"user_limit\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("nsfw" in model) {
        const value = model["nsfw"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"nsfw\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rate_limit_per_user" in model) {
        const value = model["rate_limit_per_user"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"rate_limit_per_user\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("parent_id" in model) {
        const value = model["parent_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"parent_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("permission_overwrites" in model) {
        const value = model["permission_overwrites"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"permission_overwrites\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rtc_region" in model) {
        const value = model["rtc_region"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"rtc_region\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("video_quality_mode" in model) {
        const value = model["video_quality_mode"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"video_quality_mode\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_auto_archive_duration" in model) {
        const value = model["default_auto_archive_duration"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_auto_archive_duration\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_reaction_emoji" in model) {
        const value = model["default_reaction_emoji"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_reaction_emoji\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_thread_rate_limit_per_user" in model) {
        const value = model["default_thread_rate_limit_per_user"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_thread_rate_limit_per_user\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_sort_order" in model) {
        const value = model["default_sort_order"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_sort_order\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_forum_layout" in model) {
        const value = model["default_forum_layout"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_forum_layout\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"flags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("available_tags" in model) {
        const value = model["available_tags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"available_tags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("archived" in model) {
        const value = model["archived"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"archived\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("locked" in model) {
        const value = model["locked"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"locked\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("invitable" in model) {
        const value = model["invitable"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"invitable\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("auto_archive_duration" in model) {
        const value = model["auto_archive_duration"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"auto_archive_duration\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("applied_tags" in model) {
        const value = model["applied_tags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"applied_tags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    chunks.push(jsonEncoded["}"]);
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };
    
}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const jsonEncoded = {
    ",":encoder.encode(","),
    "{":encoder.encode("{"),
    "}":encoder.encode("}"),
    "\"name\":":encoder.encode("\"name\":"),
    "\"icon\":":encoder.encode("\"icon\":"),
    "\"type\":":encoder.encode("\"type\":"),
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
    "\"default_thread_rate_limit_per_user\":":encoder.encode("\"default_thread_rate_limit_per_user\":"),
    "\"default_sort_order\":":encoder.encode("\"default_sort_order\":"),
    "\"default_forum_layout\":":encoder.encode("\"default_forum_layout\":"),
    "\"flags\":":encoder.encode("\"flags\":"),
    "\"available_tags\":":encoder.encode("\"available_tags\":"),
    "\"archived\":":encoder.encode("\"archived\":"),
    "\"locked\":":encoder.encode("\"locked\":"),
    "\"invitable\":":encoder.encode("\"invitable\":"),
    "\"auto_archive_duration\":":encoder.encode("\"auto_archive_duration\":"),
    "\"applied_tags\":":encoder.encode("\"applied_tags\":")
} as const;
