/*
 * Auto generated file, do not edit
 */
import { type GetGuildScheduledEventRequestPath, type GetGuildScheduledEventRequestQuery, type GetGuildScheduledEventRequestHeaders, type GetGuildScheduledEventResponseJSON, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getGuildScheduledEvent";
export type RouteModel = GetGuildScheduledEventRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/scheduled-events\/(?<guild_scheduled_event_id>.*?)$/i;
export const route = {
    method: "GET",
    template: "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}",
    keys: Object.freeze(["guild_id","guild_scheduled_event_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/scheduled-events\/(?<guild_scheduled_event_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/scheduled-events/${encodeURIComponent(model.guild_scheduled_event_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!),
                ["guild_scheduled_event_id"]: decodeURIComponent(match.groups!["guild_scheduled_event_id"]!)
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
    global: false,
    bucket(model: { ["guild_id"]: RouteModel["guild_id"] | string; }) {
        return `get /guilds/${model.guild_id}/scheduled-events/<any>` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = GetGuildScheduledEventRequestQuery;
export const query = {
    keys: Object.freeze(["with_user_count"] as const),
    * getValues(model: QueryModel) {
        if ("with_user_count" in model) {
            const value = model["with_user_count"];
            if (value !== undefined && value !== null) {
                yield ["with_user_count", String(value)] as ["with_user_count", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetGuildScheduledEventRequestHeaders;
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
export type Response = GetGuildScheduledEventResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GetGuildScheduledEventResponseJSON;
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