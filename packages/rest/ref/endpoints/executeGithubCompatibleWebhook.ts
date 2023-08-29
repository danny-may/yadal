/*
 * Auto generated file, do not edit
 */
import { type ExecuteGithubCompatibleWebhookRequestPath, type ExecuteGithubCompatibleWebhookRequestQuery, type RateLimitError, type ErrorResponse, type GithubWebhook } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "executeGithubCompatibleWebhook";
export type RouteModel = ExecuteGithubCompatibleWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/github$/i;
export const route = {
    method: "POST",
    template: "/webhooks/{webhook_id}/{webhook_token}/github",
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/github$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/github` as const satisfies `/${string}`;
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
        return ["global", `post /webhooks/${model.webhook_id}/${model.webhook_token}/github`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = ExecuteGithubCompatibleWebhookRequestQuery;
export const queryKeys = Object.freeze(["wait", "thread_id"] as const);
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
export type Body = GithubWebhook;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"sender\":"], encoder.encode(JSON.stringify(model["sender"]))
    ];
    if ("action" in model) {
        const value = model["action"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"action\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("ref" in model) {
        const value = model["ref"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"ref\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("ref_type" in model) {
        const value = model["ref_type"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"ref_type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("comment" in model) {
        const value = model["comment"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"comment\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("issue" in model) {
        const value = model["issue"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"issue\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("pull_request" in model) {
        const value = model["pull_request"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"pull_request\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("repository" in model) {
        const value = model["repository"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"repository\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("forkee" in model) {
        const value = model["forkee"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"forkee\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("member" in model) {
        const value = model["member"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"member\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("release" in model) {
        const value = model["release"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"release\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("head_commit" in model) {
        const value = model["head_commit"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"head_commit\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("commits" in model) {
        const value = model["commits"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"commits\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("forced" in model) {
        const value = model["forced"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"forced\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("compare" in model) {
        const value = model["compare"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"compare\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("review" in model) {
        const value = model["review"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"review\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("check_run" in model) {
        const value = model["check_run"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"check_run\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("check_suite" in model) {
        const value = model["check_suite"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"check_suite\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("discussion" in model) {
        const value = model["discussion"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"discussion\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("answer" in model) {
        const value = model["answer"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"answer\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    chunks.push(jsonEncoded["}"]);
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const jsonEncoded = {
    ",":encoder.encode(","),
    "{":encoder.encode("{"),
    "}":encoder.encode("}"),
    "\"action\":":encoder.encode("\"action\":"),
    "\"ref\":":encoder.encode("\"ref\":"),
    "\"ref_type\":":encoder.encode("\"ref_type\":"),
    "\"comment\":":encoder.encode("\"comment\":"),
    "\"issue\":":encoder.encode("\"issue\":"),
    "\"pull_request\":":encoder.encode("\"pull_request\":"),
    "\"repository\":":encoder.encode("\"repository\":"),
    "\"forkee\":":encoder.encode("\"forkee\":"),
    "\"sender\":":encoder.encode("\"sender\":"),
    "\"member\":":encoder.encode("\"member\":"),
    "\"release\":":encoder.encode("\"release\":"),
    "\"head_commit\":":encoder.encode("\"head_commit\":"),
    "\"commits\":":encoder.encode("\"commits\":"),
    "\"forced\":":encoder.encode("\"forced\":"),
    "\"compare\":":encoder.encode("\"compare\":"),
    "\"review\":":encoder.encode("\"review\":"),
    "\"check_run\":":encoder.encode("\"check_run\":"),
    "\"check_suite\":":encoder.encode("\"check_suite\":"),
    "\"discussion\":":encoder.encode("\"discussion\":"),
    "\"answer\":":encoder.encode("\"answer\":")
} as const;
