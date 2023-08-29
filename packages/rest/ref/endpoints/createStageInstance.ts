/*
 * Auto generated file, do not edit
 */
import { type CreateStageInstanceRequestHeaders, type RateLimitError, type StageInstanceResponse, type ErrorResponse, type CreateStageInstanceRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createStageInstance";
export type RouteModel = {

};
const routeRegex = /^\/stage-instances$/i;
export const route = {
    method: "POST",
    template: "/stage-instances",
    keys: Object.freeze([] as const),
    get regex(){
        return /^\/stage-instances$/i;
    },
    create(_?: RouteModel) {
        return `/stage-instances` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            
        }
    },
    rateLimitBuckets(_?: {  }) {
        return ["global", `post /stage-instances`] as const;
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
export type HeaderModel = CreateStageInstanceRequestHeaders;
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
export type Response = StageInstanceResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as StageInstanceResponse;
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
export type Body = CreateStageInstanceRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"topic\":"], encoder.encode(JSON.stringify(model["topic"])),jsonEncoded[","],
        jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(model["channel_id"]))
    ];
    if ("privacy_level" in model) {
        const value = model["privacy_level"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("guild_scheduled_event_id" in model) {
        const value = model["guild_scheduled_event_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"guild_scheduled_event_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("send_start_notification" in model) {
        const value = model["send_start_notification"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"send_start_notification\":"], encoder.encode(JSON.stringify(value)));
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
    "\"topic\":":encoder.encode("\"topic\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"guild_scheduled_event_id\":":encoder.encode("\"guild_scheduled_event_id\":"),
    "\"send_start_notification\":":encoder.encode("\"send_start_notification\":")
} as const;
