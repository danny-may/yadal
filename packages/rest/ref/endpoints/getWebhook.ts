/*
 * Auto generated file, do not edit
 */
import { type GetWebhookRequestPath, type RateLimitError, type GetWebhookResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getWebhook";
export type RouteModel = GetWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)$/i;
export const route = {
    method: "GET",
    template: "/webhooks/{webhook_id}",
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["webhook_id"]: decodeURIComponent(match.groups!["webhook_id"]!)
        }
    },
    rateLimitBuckets(model: { ["webhook_id"]: RouteModel["webhook_id"] | string; }) {
        return ["global", `get /webhooks/${model.webhook_id}`] as const;
    }
} as const;
Object.freeze(route);
export type Response = GetWebhookResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GetWebhookResponseJSON;
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
