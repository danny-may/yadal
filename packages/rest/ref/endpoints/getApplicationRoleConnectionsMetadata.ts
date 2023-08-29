/*
 * Auto generated file, do not edit
 */
import { type GetApplicationRoleConnectionsMetadataRequestPath, type RateLimitError, type GetApplicationRoleConnectionsMetadataResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getApplicationRoleConnectionsMetadata";
export type RouteModel = GetApplicationRoleConnectionsMetadataRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/role-connections\/metadata$/i;
export const route = {
    method: "GET",
    template: "/applications/{application_id}/role-connections/metadata",
    get regex(){
        return /^\/applications\/(?<application_id>.*?)\/role-connections\/metadata$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}/role-connections/metadata` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!)
        }
    },
    rateLimitBuckets(_: {}) {
        return ["global", `get /applications/<any>/role-connections/metadata`] as const;
    }
} as const;
Object.freeze(route);
export type Response = GetApplicationRoleConnectionsMetadataResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GetApplicationRoleConnectionsMetadataResponseJSON;
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
