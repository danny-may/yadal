/*
 * Auto generated file, do not edit
 */
import { type SetChannelPermissionOverwriteRequestPath, type SetChannelPermissionOverwriteRequestHeaders, type RateLimitError, type ErrorResponse, type SetChannelPermissionOverwriteRequestJSON } from '../../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "setChannelPermissionOverwrite";
export type RouteModel = SetChannelPermissionOverwriteRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/permissions\/(?<overwrite_id>.*?)$/i;
export const route = {
    method: "PUT",
    template: "/channels/{channel_id}/permissions/{overwrite_id}",
    keys: Object.freeze(["channel_id","overwrite_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/permissions\/(?<overwrite_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/permissions/${encodeURIComponent(model.overwrite_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["channel_id"]: decodeURIComponent(match["channel_id"]!),
                ["overwrite_id"]: decodeURIComponent(match["overwrite_id"]!)
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
    bucket(model: { [P in "channel_id"]: RouteModel[P] | string; }) {
        return `put /channels/${model.channel_id}/permissions/<any>` as const;
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
export type HeaderModel = SetChannelPermissionOverwriteRequestHeaders;
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
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 204) {
        return undefined;
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
export type Body = SetChannelPermissionOverwriteRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("allow" in model) {
        const value = model["allow"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"allow\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("deny" in model) {
        const value = model["deny"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"deny\":"], encoder.encode(JSON.stringify(value)));
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
    "\"allow\":":encoder.encode("\"allow\":"),
    "\"deny\":":encoder.encode("\"deny\":")
} as const;
