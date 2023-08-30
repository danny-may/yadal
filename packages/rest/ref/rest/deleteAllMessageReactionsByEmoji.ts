/*
 * Auto generated file, do not edit
 */
import { type DeleteAllMessageReactionsByEmojiRequestPath, type DeleteAllMessageReactionsByEmojiRequestHeaders, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "deleteAllMessageReactionsByEmoji";
export type RouteModel = DeleteAllMessageReactionsByEmojiRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)\/reactions\/(?<emoji_name>.*?)$/i;
export const route = {
    method: "DELETE",
    template: "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}",
    keys: Object.freeze(["channel_id","message_id","emoji_name"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)\/reactions\/(?<emoji_name>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/messages/${encodeURIComponent(model.message_id)}/reactions/${encodeURIComponent(model.emoji_name)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!),
                ["message_id"]: decodeURIComponent(match.groups!["message_id"]!),
                ["emoji_name"]: decodeURIComponent(match.groups!["emoji_name"]!)
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
    bucket(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return `delete /channels/${model.channel_id}/messages/<any>/reactions/<any>` as const;
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
export type HeaderModel = DeleteAllMessageReactionsByEmojiRequestHeaders;
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
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
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
