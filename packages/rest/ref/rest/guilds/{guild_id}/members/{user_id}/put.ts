/*
 * Auto generated file, do not edit
 */
import { type AddGuildMemberRequestPath, type AddGuildMemberRequestHeaders, type GuildMemberResponse, type RateLimitError, type ErrorResponse, type AddGuildMemberRequestJSON } from '../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "addGuildMember";
export type RouteModel = AddGuildMemberRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/members\/(?<user_id>.*?)$/i;
export const route = {
    method: "PUT",
    template: "/guilds/{guild_id}/members/{user_id}",
    keys: Object.freeze(["guild_id","user_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/members\/(?<user_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/members/${encodeURIComponent(model.user_id)}` as const satisfies `/${string}`;
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
                ["user_id"]: decodeURIComponent(match["user_id"]!)
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
        return `put /guilds/${model.guild_id}/members/<any>` as const;
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
export type HeaderModel = AddGuildMemberRequestHeaders;
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
export type Response = (GuildMemberResponse | undefined);
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as GuildMemberResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
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
export type Body = AddGuildMemberRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"access_token\":"], encoder.encode(JSON.stringify(model["access_token"]))
    ];
    if ("nick" in model) {
        const value = model["nick"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"nick\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("roles" in model) {
        const value = model["roles"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"roles\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("mute" in model) {
        const value = model["mute"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"mute\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("deaf" in model) {
        const value = model["deaf"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"deaf\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"flags\":"], encoder.encode(JSON.stringify(value)));
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
    "\"nick\":":encoder.encode("\"nick\":"),
    "\"roles\":":encoder.encode("\"roles\":"),
    "\"mute\":":encoder.encode("\"mute\":"),
    "\"deaf\":":encoder.encode("\"deaf\":"),
    "\"access_token\":":encoder.encode("\"access_token\":"),
    "\"flags\":":encoder.encode("\"flags\":")
} as const;
