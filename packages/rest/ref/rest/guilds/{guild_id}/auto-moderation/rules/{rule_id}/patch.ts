/*
 * Auto generated file, do not edit
 */
import { type UpdateAutoModerationRuleRequestPath, type UpdateAutoModerationRuleRequestHeaders, type UpdateAutoModerationRuleResponseJSON, type RateLimitError, type ErrorResponse, type UpdateAutoModerationRuleRequestJSON } from '../../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../helpers.js';
export const name = "updateAutoModerationRule";
export type RouteModel = UpdateAutoModerationRuleRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/auto-moderation\/rules\/(?<rule_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/guilds/{guild_id}/auto-moderation/rules/{rule_id}",
    keys: Object.freeze(["guild_id","rule_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/auto-moderation\/rules\/(?<rule_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/auto-moderation/rules/${encodeURIComponent(model.rule_id)}` as const satisfies `/${string}`;
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
                ["rule_id"]: decodeURIComponent(match["rule_id"]!)
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
        return `patch /guilds/${model.guild_id}/auto-moderation/rules/<any>` as const;
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
export type HeaderModel = UpdateAutoModerationRuleRequestHeaders;
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
export type Response = UpdateAutoModerationRuleResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as UpdateAutoModerationRuleResponseJSON;
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
export type Body = UpdateAutoModerationRuleRequestJSON;
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
    if ("event_type" in model) {
        const value = model["event_type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"event_type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("actions" in model) {
        const value = model["actions"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"actions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("enabled" in model) {
        const value = model["enabled"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"enabled\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("exempt_roles" in model) {
        const value = model["exempt_roles"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"exempt_roles\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("exempt_channels" in model) {
        const value = model["exempt_channels"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"exempt_channels\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("trigger_type" in model) {
        const value = model["trigger_type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"trigger_type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("trigger_metadata" in model) {
        const value = model["trigger_metadata"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"trigger_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"name\":":encoder.encode("\"name\":"),
    "\"event_type\":":encoder.encode("\"event_type\":"),
    "\"actions\":":encoder.encode("\"actions\":"),
    "\"enabled\":":encoder.encode("\"enabled\":"),
    "\"exempt_roles\":":encoder.encode("\"exempt_roles\":"),
    "\"exempt_channels\":":encoder.encode("\"exempt_channels\":"),
    "\"trigger_type\":":encoder.encode("\"trigger_type\":"),
    "\"trigger_metadata\":":encoder.encode("\"trigger_metadata\":")
} as const;
