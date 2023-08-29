/*
 * Auto generated file, do not edit
 */
import { type InviteResolveRequestPath, type InviteResolveRequestQuery, type InviteResolveRequestHeaders, type RateLimitError, type InviteResolveResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "inviteResolve";
export type RouteModel = InviteResolveRequestPath;
const routeRegex = /^\/invites\/(?<code>.*?)$/i;
export const route = {
    method: "GET",
    template: "/invites/{code}",
    keys: Object.freeze(["code"] as const),
    get regex(){
        return /^\/invites\/(?<code>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/invites/${encodeURIComponent(model.code)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["code"]: decodeURIComponent(match.groups!["code"]!)
        }
    },
    rateLimitBuckets(_?: {  }) {
        return ["global", `get /invites/<any>`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = InviteResolveRequestQuery;
export const query = {
    keys: Object.freeze(["with_counts","guild_scheduled_event_id"] as const),
    * getValues(model: QueryModel) {
        if ("with_counts" in model) {
            const value = model["with_counts"];
            if (value !== undefined && value !== null) {
                yield ["with_counts", String(value)] as ["with_counts", string];
            }
        }
                if ("guild_scheduled_event_id" in model) {
            const value = model["guild_scheduled_event_id"];
            if (value !== undefined && value !== null) {
                yield ["guild_scheduled_event_id", String(value)] as ["guild_scheduled_event_id", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = InviteResolveRequestHeaders;
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
export type Response = InviteResolveResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as InviteResolveResponseJSON;
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