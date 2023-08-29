/*
 * Auto generated file, do not edit
 */
import { type DeleteMyMessageReactionRequestPath, type DeleteMyMessageReactionRequestHeaders, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "deleteMyMessageReaction";
export type RouteModel = DeleteMyMessageReactionRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)\/reactions\/(?<emoji_name>.*?)\/@me$/i;
export const route = {
    method: "DELETE",
    template: "/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me",
    keys: Object.freeze(["channel_id","message_id","emoji_name"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)\/reactions\/(?<emoji_name>.*?)\/@me$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/messages/${encodeURIComponent(model.message_id)}/reactions/${encodeURIComponent(model.emoji_name)}/@me` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!),
            ["message_id"]: decodeURIComponent(match.groups!["message_id"]!),
            ["emoji_name"]: decodeURIComponent(match.groups!["emoji_name"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `delete /channels/${model.channel_id}/messages/<any>/reactions/<any>/@me`] as const;
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
export type HeaderModel = DeleteMyMessageReactionRequestHeaders;
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
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}