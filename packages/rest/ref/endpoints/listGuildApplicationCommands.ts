/*
 * Auto generated file, do not edit
 */
import { type ListGuildApplicationCommandsRequestPath, type ListGuildApplicationCommandsRequestQuery, type RateLimitError, type ListGuildApplicationCommandsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listGuildApplicationCommands";
export type RouteModel = ListGuildApplicationCommandsRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands$/i;
export const route = {
    method: "GET",
    template: "/applications/{application_id}/guilds/{guild_id}/commands",
    get regex(){
        return /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}/guilds/${encodeURIComponent(model.guild_id)}/commands` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!),
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!)
        }
    },
    rateLimitBuckets(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return ["global", `get /applications/<any>/guilds/${model.guild_id}/commands`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = ListGuildApplicationCommandsRequestQuery;
export const queryKeys = Object.freeze(["with_localizations"] as const);
export type Response = ListGuildApplicationCommandsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListGuildApplicationCommandsResponseJSON;
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
