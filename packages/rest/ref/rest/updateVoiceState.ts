/*
 * Auto generated file, do not edit
 */
import { type UpdateVoiceStateRequestPath, type UpdateVoiceStateRequestHeaders, type RateLimitError, type ErrorResponse, type UpdateVoiceStateRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateVoiceState";
export type RouteModel = UpdateVoiceStateRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/voice-states\/(?<user_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/guilds/{guild_id}/voice-states/{user_id}",
    keys: Object.freeze(["guild_id","user_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/voice-states\/(?<user_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/voice-states/${encodeURIComponent(model.user_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!),
                ["user_id"]: decodeURIComponent(match.groups!["user_id"]!)
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
    bucket(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return `patch /guilds/${model.guild_id}/voice-states/<any>` as const;
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
export type HeaderModel = UpdateVoiceStateRequestHeaders;
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
export type Response = undefined;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 204) {
        return undefined;
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
export type Body = UpdateVoiceStateRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("suppress" in model) {
        const value = model["suppress"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"suppress\":"], encoder.encode(JSON.stringify(value)));
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
    "\"suppress\":":encoder.encode("\"suppress\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":")
} as const;