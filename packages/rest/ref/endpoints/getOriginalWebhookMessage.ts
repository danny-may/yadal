/*
 * Auto generated file, do not edit
 */
import { type GetOriginalWebhookMessageRequestPath, type GetOriginalWebhookMessageRequestQuery, type GetOriginalWebhookMessageRequestHeaders, type RateLimitError, type MessageResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getOriginalWebhookMessage";
export type RouteModel = GetOriginalWebhookMessageRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/@original$/i;
export const route = {
    method: "GET",
    template: "/webhooks/{webhook_id}/{webhook_token}/messages/@original",
    keys: Object.freeze(["webhook_id","webhook_token"] as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/@original$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/messages/@original` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["webhook_id"]: decodeURIComponent(match.groups!["webhook_id"]!),
            ["webhook_token"]: decodeURIComponent(match.groups!["webhook_token"]!)
        }
    },
    rateLimitBuckets(model: { ["webhook_id"]: RouteModel["webhook_id"] | string; ["webhook_token"]: RouteModel["webhook_token"] | string; }) {
        return ["global", `get /webhooks/${model.webhook_id}/${model.webhook_token}/messages/@original`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = GetOriginalWebhookMessageRequestQuery;
export const query = {
    keys: Object.freeze(["thread_id"] as const),
    * getValues(model: QueryModel) {
        if ("thread_id" in model) {
            const value = model["thread_id"];
            if (value !== undefined && value !== null) {
                yield ["thread_id", String(value)] as ["thread_id", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetOriginalWebhookMessageRequestHeaders;
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
export type Response = MessageResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as MessageResponse;
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