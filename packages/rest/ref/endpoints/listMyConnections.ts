/*
 * Auto generated file, do not edit
 */
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
import { type RateLimitError, type ListMyConnectionsResponseJSON, type ErrorResponse } from '../discord.js';
export const name = "listMyConnections";
export type RouteModel = {};
const routeRegex = /^\/users\/@me\/connections$/i;
export const route = {
    method: "GET",
    template: "/users/@me/connections",
    get regex(){
        return /^\/users\/@me\/connections$/i;
    },
    create(_: RouteModel) {
        return `/users/@me/connections` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            
        }
    },
    rateLimitBuckets(_: {}) {
        return ["global", `get /users/@me/connections`] as const;
    }
} as const;
Object.freeze(route);
export type Response = ListMyConnectionsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListMyConnectionsResponseJSON;
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
