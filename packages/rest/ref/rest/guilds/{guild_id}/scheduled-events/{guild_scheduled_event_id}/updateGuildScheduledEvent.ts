/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildScheduledEventRequestPath, type UpdateGuildScheduledEventRequestHeaders, type UpdateGuildScheduledEventResponseJSON, type RateLimitError, type ErrorResponse, type UpdateGuildScheduledEventRequestJSON } from '../../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "updateGuildScheduledEvent";
export type RouteModel = UpdateGuildScheduledEventRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/scheduled-events\/(?<guild_scheduled_event_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    keys: Object.freeze(["guild_id","guild_scheduled_event_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/scheduled-events\/(?<guild_scheduled_event_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/scheduled-events/${encodeURIComponent(model.guild_scheduled_event_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["guild_id"]: decodeURIComponent(match["guild_id"]!),
                ["guild_scheduled_event_id"]: decodeURIComponent(match["guild_scheduled_event_id"]!)
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
        return `patch /guilds/${model.guild_id}/scheduled-events/<any>` as const;
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
export type HeaderModel = UpdateGuildScheduledEventRequestHeaders;
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
export type Response = UpdateGuildScheduledEventResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as UpdateGuildScheduledEventResponseJSON;
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
export type Body = UpdateGuildScheduledEventRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("status" in model) {
        const value = model["status"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"status\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("image" in model) {
        const value = model["image"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"image\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_start_time" in model) {
        const value = model["scheduled_start_time"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"scheduled_start_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_end_time" in model) {
        const value = model["scheduled_end_time"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"scheduled_end_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("entity_type" in model) {
        const value = model["entity_type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"entity_type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("privacy_level" in model) {
        const value = model["privacy_level"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("channel_id" in model) {
        const value = model["channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("entity_metadata" in model) {
        const value = model["entity_metadata"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"entity_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"status\":":encoder.encode("\"status\":"),
    "\"name\":":encoder.encode("\"name\":"),
    "\"description\":":encoder.encode("\"description\":"),
    "\"image\":":encoder.encode("\"image\":"),
    "\"scheduled_start_time\":":encoder.encode("\"scheduled_start_time\":"),
    "\"scheduled_end_time\":":encoder.encode("\"scheduled_end_time\":"),
    "\"entity_type\":":encoder.encode("\"entity_type\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"entity_metadata\":":encoder.encode("\"entity_metadata\":")
} as const;
