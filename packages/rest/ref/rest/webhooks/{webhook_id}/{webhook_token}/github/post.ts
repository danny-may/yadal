/*
 * Auto generated file, do not edit
 */
import { type ExecuteGithubCompatibleWebhookRequestPath, type ExecuteGithubCompatibleWebhookRequestQuery, type ExecuteGithubCompatibleWebhookRequestHeaders, type RateLimitError, type ErrorResponse, type GithubWebhook } from '../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "executeGithubCompatibleWebhook";
export type RouteModel = ExecuteGithubCompatibleWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/github$/i;
export const route = {
    method: "POST",
    template: "/webhooks/{webhook_id}/{webhook_token}/github",
    keys: Object.freeze(["webhook_id","webhook_token"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/github$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/github` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["webhook_id"]: decodeURIComponent(match["webhook_id"]!),
                ["webhook_token"]: decodeURIComponent(match["webhook_token"]!)
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
        return `post /webhooks/${model.webhook_id}/${model.webhook_token}/github` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ExecuteGithubCompatibleWebhookRequestQuery;
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
export type HeaderModel = ExecuteGithubCompatibleWebhookRequestHeaders;
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
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 204) {
        return undefined;
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
export type Body = GithubWebhook;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "action": model["action" as keyof typeof model],
            "ref": model["ref" as keyof typeof model],
            "ref_type": model["ref_type" as keyof typeof model],
            "comment": model["comment" as keyof typeof model],
            "issue": model["issue" as keyof typeof model],
            "pull_request": model["pull_request" as keyof typeof model],
            "repository": model["repository" as keyof typeof model],
            "forkee": model["forkee" as keyof typeof model],
            "sender": model["sender" as keyof typeof model],
            "member": model["member" as keyof typeof model],
            "release": model["release" as keyof typeof model],
            "head_commit": model["head_commit" as keyof typeof model],
            "commits": model["commits" as keyof typeof model],
            "forced": model["forced" as keyof typeof model],
            "compare": model["compare" as keyof typeof model],
            "review": model["review" as keyof typeof model],
            "check_run": model["check_run" as keyof typeof model],
            "check_suite": model["check_suite" as keyof typeof model],
            "discussion": model["discussion" as keyof typeof model],
            "answer": model["answer" as keyof typeof model]
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
