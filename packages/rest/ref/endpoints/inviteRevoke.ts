/*
 * Auto generated file, do not edit
 */
import { type InviteRevokeRequestPath, type RateLimitError, type InviteRevokeResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "inviteRevoke";
export type RouteModel = InviteRevokeRequestPath;
const routeRegex = /^\/invites\/(?<code>.*?)$/i;
export const route = {
    method: "DELETE",
    template: "/invites/{code}",
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
    rateLimitBuckets(_: {}) {
        return ["global", `delete /invites/<any>`] as const;
    }
} as const;
Object.freeze(route);
export type Response = InviteRevokeResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as InviteRevokeResponseJSON;
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
