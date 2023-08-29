/*
 * Auto generated file, do not edit
 */
import { type DeleteMessageRequestPath, type DeleteMessageRequestHeaders, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "deleteMessage";
export type RouteModel = DeleteMessageRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)$/i;
export const route = {
    method: "DELETE",
    template: "/channels/{channel_id}/messages/{message_id}",
    keys: Object.freeze(["channel_id","message_id"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/messages\/(?<message_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/messages/${encodeURIComponent(model.message_id)}` as const satisfies `/${string}`;
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
            ["message_id"]: decodeURIComponent(match.groups!["message_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; ["message_id"]: RouteModel["message_id"] | string; }) {
        return ["global", `delete /channels/${model.channel_id}/messages/${((message_id: string) => {
            const age = Date.now() - Number((BigInt(message_id) >> 22n) + 1420070400000n /* Discord epoch */);
            return age < 10000 /* 10 seconds */ ? 'new' : age < 1209600000 /* 2 weeks */ ? 'recent' : 'old';
        })(model.message_id)}`] as const;
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
export type HeaderModel = DeleteMessageRequestHeaders;
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