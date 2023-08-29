/*
 * Auto generated file, do not edit
 */
import { type ExecuteSlackCompatibleWebhookRequestPath, type ExecuteSlackCompatibleWebhookRequestQuery, type RateLimitError, type ExecuteSlackCompatibleWebhookResponseJSON, type ErrorResponse, type SlackWebhook } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "executeSlackCompatibleWebhook";
export type RouteModel = ExecuteSlackCompatibleWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/slack$/i;
export const route = {
    method: "POST",
    template: "/webhooks/{webhook_id}/{webhook_token}/slack",
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/slack$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/slack` as const satisfies `/${string}`;
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
        return ["global", `post /webhooks/${model.webhook_id}/${model.webhook_token}/slack`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = ExecuteSlackCompatibleWebhookRequestQuery;
export const queryKeys = Object.freeze(["wait", "thread_id"] as const);
export type Response = ExecuteSlackCompatibleWebhookResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ExecuteSlackCompatibleWebhookResponseJSON;
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
export type Body = SlackWebhook;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [

    ];
    if ("text" in model) {
        const value = model["text"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"text\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("username" in model) {
        const value = model["username"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"username\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("icon_url" in model) {
        const value = model["icon_url"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"icon_url\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("attachments" in model) {
        const value = model["attachments"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"attachments\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    chunks.push(formEncoded["--"], boundary, formEncoded["--"]);
    return { type: `multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}`, content: chunks };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const formEncoded = {
    "--":encoder.encode("--"),
    "lf":encoder.encode("\n"),
    "\"text\".1":encoder.encode("\nContent-Disposition: form-data; name=text\nContent-Type: application/json\n\n"),
    "\"username\".1":encoder.encode("\nContent-Disposition: form-data; name=username\nContent-Type: application/json\n\n"),
    "\"icon_url\".1":encoder.encode("\nContent-Disposition: form-data; name=icon_url\nContent-Type: application/json\n\n"),
    "\"attachments\".1":encoder.encode("\nContent-Disposition: form-data; name=attachments\nContent-Type: application/json\n\n")
} as const;
