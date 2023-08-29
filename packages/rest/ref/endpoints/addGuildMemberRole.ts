/*
 * Auto generated file, do not edit
 */
import { type AddGuildMemberRoleRequestPath, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "addGuildMemberRole";
export type RouteModel = AddGuildMemberRoleRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/members\/(?<user_id>.*?)\/roles\/(?<role_id>.*?)$/i;
export const route = {
    method: "PUT",
    template: "/guilds/{guild_id}/members/{user_id}/roles/{role_id}",
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/members\/(?<user_id>.*?)\/roles\/(?<role_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/members/${encodeURIComponent(model.user_id)}/roles/${encodeURIComponent(model.role_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!),
            ["user_id"]: decodeURIComponent(match.groups!["user_id"]!),
            ["role_id"]: decodeURIComponent(match.groups!["role_id"]!)
        }
    },
    rateLimitBuckets(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return ["global", `put /guilds/${model.guild_id}/members/<any>/roles/<any>`] as const;
    }
} as const;
Object.freeze(route);
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
