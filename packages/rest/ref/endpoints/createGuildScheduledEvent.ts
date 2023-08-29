/*
 * Auto generated file, do not edit
 */
import { type CreateGuildScheduledEventRequestPath, type CreateGuildScheduledEventRequestHeaders, type RateLimitError, type CreateGuildScheduledEventResponseJSON, type ErrorResponse, type CreateGuildScheduledEventRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createGuildScheduledEvent";
export type RouteModel = CreateGuildScheduledEventRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/scheduled-events$/i;
export const route = {
    method: "POST",
    template: "/guilds/{guild_id}/scheduled-events",
    keys: Object.freeze(["guild_id"] as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/scheduled-events$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/scheduled-events` as const satisfies `/${string}`;
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
        return ["global", `post /guilds/${model.guild_id}/scheduled-events`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = CreateGuildScheduledEventRequestHeaders;
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
export type Response = CreateGuildScheduledEventResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreateGuildScheduledEventResponseJSON;
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
export type Body = CreateGuildScheduledEventRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])),jsonEncoded[","],
        jsonEncoded["\"scheduled_start_time\":"], encoder.encode(JSON.stringify(model["scheduled_start_time"])),jsonEncoded[","],
        jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(model["privacy_level"])),jsonEncoded[","],
        jsonEncoded["\"entity_type\":"], encoder.encode(JSON.stringify(model["entity_type"]))
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("image" in model) {
        const value = model["image"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"image\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_end_time" in model) {
        const value = model["scheduled_end_time"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"scheduled_end_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("channel_id" in model) {
        const value = model["channel_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("entity_metadata" in model) {
        const value = model["entity_metadata"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"entity_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"description\":":encoder.encode("\"description\":"),
    "\"image\":":encoder.encode("\"image\":"),
    "\"scheduled_start_time\":":encoder.encode("\"scheduled_start_time\":"),
    "\"scheduled_end_time\":":encoder.encode("\"scheduled_end_time\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"entity_type\":":encoder.encode("\"entity_type\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"entity_metadata\":":encoder.encode("\"entity_metadata\":")
} as const;
