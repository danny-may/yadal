/*
 * Auto generated file, do not edit
 */
import { type GetGuildVanityUrlRequestPath, type RateLimitError, type VanityURLResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getGuildVanityUrl";
export type RouteModel = GetGuildVanityUrlRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/vanity-url$/i;
export const route = {
    method: "GET",
    template: "/guilds/{guild_id}/vanity-url",
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/vanity-url$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/vanity-url` as const satisfies `/${string}`;
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
        return ["global", `get /guilds/${model.guild_id}/vanity-url`] as const;
    }
} as const;
Object.freeze(route);
export type Response = VanityURLResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as VanityURLResponse;
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
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
