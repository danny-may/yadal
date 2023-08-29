/*
 * Auto generated file, do not edit
 */
import { type CreateAutoModerationRuleRequestPath, type CreateAutoModerationRuleRequestHeaders, type CreateAutoModerationRuleResponseJSON, type RateLimitError, type ErrorResponse, type CreateAutoModerationRuleRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createAutoModerationRule";
export type RouteModel = CreateAutoModerationRuleRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/auto-moderation\/rules$/i;
export const route = {
    method: "POST",
    template: "/guilds/{guild_id}/auto-moderation/rules",
    keys: Object.freeze(["guild_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/auto-moderation\/rules$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/auto-moderation/rules` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
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
    global: false,
    bucket(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return `post /guilds/${model.guild_id}/auto-moderation/rules` as const;
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
export type HeaderModel = CreateAutoModerationRuleRequestHeaders;
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
export type Response = CreateAutoModerationRuleResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreateAutoModerationRuleResponseJSON;
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
export type Body = CreateAutoModerationRuleRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])),jsonEncoded[","],
        jsonEncoded["\"event_type\":"], encoder.encode(JSON.stringify(model["event_type"])),jsonEncoded[","],
        jsonEncoded["\"trigger_type\":"], encoder.encode(JSON.stringify(model["trigger_type"]))
    ];
    if ("actions" in model) {
        const value = model["actions"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"actions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("enabled" in model) {
        const value = model["enabled"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"enabled\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("exempt_roles" in model) {
        const value = model["exempt_roles"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"exempt_roles\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("exempt_channels" in model) {
        const value = model["exempt_channels"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"exempt_channels\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("trigger_metadata" in model) {
        const value = model["trigger_metadata"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"trigger_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"event_type\":":encoder.encode("\"event_type\":"),
    "\"actions\":":encoder.encode("\"actions\":"),
    "\"enabled\":":encoder.encode("\"enabled\":"),
    "\"exempt_roles\":":encoder.encode("\"exempt_roles\":"),
    "\"exempt_channels\":":encoder.encode("\"exempt_channels\":"),
    "\"trigger_type\":":encoder.encode("\"trigger_type\":"),
    "\"trigger_metadata\":":encoder.encode("\"trigger_metadata\":")
} as const;
