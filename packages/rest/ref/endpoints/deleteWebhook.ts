/*
 * Auto generated file, do not edit
 */
import { type DeleteWebhookRequestPath, type DeleteWebhookRequestHeaders, type RateLimitError, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "deleteWebhook";
export type RouteModel = DeleteWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)$/i;
export const route = {
    method: "DELETE",
    template: "/webhooks/{webhook_id}",
    keys: Object.freeze(["webhook_id"] as const),
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
        return ["global", `delete /webhooks/${model.webhook_id}`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = DeleteWebhookRequestHeaders;
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