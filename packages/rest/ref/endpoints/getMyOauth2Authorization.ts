/*
 * Auto generated file, do not edit
 */
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
import { type RateLimitError, type OAuth2GetAuthorizationResponse, type ErrorResponse } from '../discord.js';
export const name = "getMyOauth2Authorization";
export type RouteModel = {};
const routeRegex = /^\/oauth2\/@me$/i;
export const route = {
    method: "GET",
    template: "/oauth2/@me",
    get regex(){
        return /^\/oauth2\/@me$/i;
    },
    create(_: RouteModel) {
        return `/oauth2/@me` as const satisfies `/${string}`;
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
        return ["global", `get /oauth2/@me`] as const;
    }
} as const;
Object.freeze(route);
export type Response = OAuth2GetAuthorizationResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as OAuth2GetAuthorizationResponse;
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
