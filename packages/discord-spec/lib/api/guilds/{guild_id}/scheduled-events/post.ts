/*
 * Auto generated file, do not edit
 */
import { type CreateGuildScheduledEventRequestPath, type CreateGuildScheduledEventRequestHeaders, type CreateGuildScheduledEventResponseJSON, type RateLimitError, type ErrorResponse, type CreateGuildScheduledEventRequestJSON } from '../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../helpers.js';
export const name = "createGuildScheduledEvent";
export type RouteModel = CreateGuildScheduledEventRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/scheduled-events$/i;
export const route = {
    method: "POST",
    template: Object.freeze({
        raw: "/guilds/{guild_id}/scheduled-events" as const,
        keys: Object.freeze(["guild_id"] as const),
        segments: Object.freeze(["/guilds/","/scheduled-events"] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/scheduled-events$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/scheduled-events` as const satisfies `/${string}`;
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
        return `post /guilds/${model.guild_id}/scheduled-events` as const;
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
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as CreateGuildScheduledEventResponseJSON;
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
export type Body = CreateGuildScheduledEventRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "name": model["name" as keyof typeof model],
            "description": model["description" as keyof typeof model],
            "image": model["image" as keyof typeof model],
            "scheduled_start_time": model["scheduled_start_time" as keyof typeof model],
            "scheduled_end_time": model["scheduled_end_time" as keyof typeof model],
            "privacy_level": model["privacy_level" as keyof typeof model],
            "entity_type": model["entity_type" as keyof typeof model],
            "channel_id": model["channel_id" as keyof typeof model],
            "entity_metadata": model["entity_metadata" as keyof typeof model]
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
