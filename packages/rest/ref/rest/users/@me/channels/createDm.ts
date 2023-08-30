/*
 * Auto generated file, do not edit
 */
import { type CreateDmRequestHeaders, type CreateDmResponseJSON, type RateLimitError, type ErrorResponse, type CreatePrivateChannelRequest } from '../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../helpers.js';
export const name = "createDm";
export type RouteModel = {

};
const routeRegex = /^\/users\/@me\/channels$/i;
export const route = {
    method: "POST",
    template: "/users/@me/channels",
    keys: Object.freeze([] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/users\/@me\/channels$/i;
    },
    create(_?: RouteModel) {
        return `/users/@me/channels` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                
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
    bucket(_?: { [P in never]: RouteModel[P] | string; }) {
        return `post /users/@me/channels` as const;
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
export type HeaderModel = CreateDmRequestHeaders;
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
export type Response = CreateDmResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as CreateDmResponseJSON;
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
export type Body = CreatePrivateChannelRequest;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("recipient_id" in model) {
        const value = model["recipient_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"recipient_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("access_tokens" in model) {
        const value = model["access_tokens"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"access_tokens\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("nicks" in model) {
        const value = model["nicks"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"nicks\":"], encoder.encode(JSON.stringify(value)));
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
    "\"recipient_id\":":encoder.encode("\"recipient_id\":"),
    "\"access_tokens\":":encoder.encode("\"access_tokens\":"),
    "\"nicks\":":encoder.encode("\"nicks\":")
} as const;
