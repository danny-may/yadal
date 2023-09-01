/*
 * Auto generated file, do not edit
 */
import { type GetThreadMemberRequestPath, type GetThreadMemberRequestQuery, type GetThreadMemberRequestHeaders, type ThreadMemberResponse, type RateLimitError, type ErrorResponse } from '../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "getThreadMember";
export type RouteModel = GetThreadMemberRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/thread-members\/(?<user_id>.*?)$/i;
export const route = {
    method: "GET",
    template: "/channels/{channel_id}/thread-members/{user_id}",
    keys: Object.freeze(["channel_id","user_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/thread-members\/(?<user_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/thread-members/${encodeURIComponent(model.user_id)}` as const satisfies `/${string}`;
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
    bucket(model: { [P in "channel_id"]: RouteModel[P] | string; }) {
        return `get /channels/${model.channel_id}/thread-members/<any>` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = GetThreadMemberRequestQuery;
export const query = {
    keys: Object.freeze(["with_member"] as const),
    * getValues(model: QueryModel) {
        if ("with_member" in model) {
            const value = model["with_member"];
            if (value !== undefined && value !== null) {
                yield ["with_member", String(value)] as ["with_member", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetThreadMemberRequestHeaders;
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
export type Response = ThreadMemberResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ThreadMemberResponse;
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