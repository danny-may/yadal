/*
 * Auto generated file, do not edit
 */
import { type UpdateMyGuildMemberRequestPath, type UpdateMyGuildMemberRequestHeaders, type RateLimitError, type PrivateGuildMemberResponse, type ErrorResponse, type UpdateMyGuildMemberRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateMyGuildMember";
export type RouteModel = UpdateMyGuildMemberRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/members\/@me$/i;
export const route = {
    method: "PATCH",
    template: "/guilds/{guild_id}/members/@me",
    keys: Object.freeze(["guild_id"] as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/members\/@me$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/members/@me` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!)
        }
    },
    rateLimitBuckets(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return ["global", `patch /guilds/${model.guild_id}/members/@me`] as const;
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
export type HeaderModel = UpdateMyGuildMemberRequestHeaders;
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
export type Response = PrivateGuildMemberResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as PrivateGuildMemberResponse;
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
export type Body = UpdateMyGuildMemberRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("nick" in model) {
        const value = model["nick"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"nick\":"], encoder.encode(JSON.stringify(value)));
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
    "\"nick\":":encoder.encode("\"nick\":")
} as const;
