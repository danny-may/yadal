/*
 * Auto generated file, do not edit
 */
import { type CreateChannelInviteRequestPath, type CreateChannelInviteRequestHeaders, type RateLimitError, type CreateChannelInviteResponseJSON, type ErrorResponse, type CreateChannelInviteRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createChannelInvite";
export type RouteModel = CreateChannelInviteRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/invites$/i;
export const route = {
    method: "POST",
    template: "/channels/{channel_id}/invites",
    keys: Object.freeze(["channel_id"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/invites$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/invites` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `post /channels/${model.channel_id}/invites`] as const;
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
export type HeaderModel = CreateChannelInviteRequestHeaders;
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
export type Response = (CreateChannelInviteResponseJSON | undefined);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreateChannelInviteResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
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
export type Body = CreateChannelInviteRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("max_age" in model) {
        const value = model["max_age"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"max_age\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("temporary" in model) {
        const value = model["temporary"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"temporary\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("max_uses" in model) {
        const value = model["max_uses"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"max_uses\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("unique" in model) {
        const value = model["unique"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"unique\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("target_user_id" in model) {
        const value = model["target_user_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"target_user_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("target_application_id" in model) {
        const value = model["target_application_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"target_application_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("target_type" in model) {
        const value = model["target_type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"target_type\":"], encoder.encode(JSON.stringify(value)));
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
    "\"max_age\":":encoder.encode("\"max_age\":"),
    "\"temporary\":":encoder.encode("\"temporary\":"),
    "\"max_uses\":":encoder.encode("\"max_uses\":"),
    "\"unique\":":encoder.encode("\"unique\":"),
    "\"target_user_id\":":encoder.encode("\"target_user_id\":"),
    "\"target_application_id\":":encoder.encode("\"target_application_id\":"),
    "\"target_type\":":encoder.encode("\"target_type\":")
} as const;
