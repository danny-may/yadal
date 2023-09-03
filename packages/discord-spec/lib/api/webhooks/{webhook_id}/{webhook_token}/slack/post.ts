/*
 * Auto generated file, do not edit
 */
import { type ExecuteSlackCompatibleWebhookRequestPath, type ExecuteSlackCompatibleWebhookRequestQuery, type ExecuteSlackCompatibleWebhookRequestHeaders, type ExecuteSlackCompatibleWebhookResponseJSON, type RateLimitError, type ErrorResponse, type SlackWebhook } from '../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "executeSlackCompatibleWebhook";
export type RouteModel = ExecuteSlackCompatibleWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/slack$/i;
export const route = {
    method: "POST",
    template: Object.freeze({
        raw: "/webhooks/{webhook_id}/{webhook_token}/slack" as const,
        keys: Object.freeze(["webhook_id","webhook_token"] as const),
        segments: Object.freeze(["/webhooks/","/","/slack"] as const)
    }),
    authentication: Object.freeze({
        "Anonymous": Object.freeze([] as const),
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/slack$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/slack` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["webhook_id"]: decodeURIComponent(match.groups!["webhook_id"]!),
            ["webhook_token"]: decodeURIComponent(match.groups!["webhook_token"]!)
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
    global: true,
    bucket(model: { [P in "webhook_id" | "webhook_token"]: RouteModel[P] | string; }) {
        return `post /webhooks/${model.webhook_id}/${model.webhook_token}/slack` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ExecuteSlackCompatibleWebhookRequestQuery;
export const query = {
    keys: Object.freeze(["wait","thread_id"] as const),
    * getValues(model: QueryModel) {
        if ("wait" in model) {
            const value = model["wait"];
            if (value !== undefined && value !== null) {
                yield ["wait", String(value)] as ["wait", string];
            }
        }
        if ("thread_id" in model) {
            const value = model["thread_id"];
            if (value !== undefined && value !== null) {
                yield ["thread_id", String(value)] as ["thread_id", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = ExecuteSlackCompatibleWebhookRequestHeaders;
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
export type Response = ExecuteSlackCompatibleWebhookResponseJSON;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ExecuteSlackCompatibleWebhookResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(JSON.parse(decode(await content())) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(JSON.parse(decode(await content())) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = SlackWebhook;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "text": model["text" as keyof typeof model],
            "username": model["username" as keyof typeof model],
            "icon_url": model["icon_url" as keyof typeof model],
            "attachments": model["attachments" as keyof typeof model]
        }))]
    };
    
}
declare const TextDecoder: typeof import('node:util').TextDecoder;
declare type TextDecoder = import('node:util').TextDecoder;
const decoder = new TextDecoder();
const typedArray: new () => Exclude<Extract<Parameters<TextDecoder["decode"]>[0], ArrayBufferView>, DataView> = Object.getPrototypeOf(Uint8Array.prototype).constructor;
function decode(content: ArrayBufferView) {
    if (content instanceof typedArray || content instanceof DataView)
        return decoder.decode(content);
    return decoder.decode(new Uint8Array(content.buffer, content.byteOffset, content.byteLength));
}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
