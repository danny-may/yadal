/*
 * Auto generated file, do not edit
 */
import { type CreateThreadRequestPath, type RateLimitError, type CreatedThreadResponse, type ErrorResponse, type CreateThreadRequestJSON, type CreateThreadRequestURLEncoded, type CreateThreadRequestFormData } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createThread";
export type RouteModel = CreateThreadRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/threads$/i;
export const route = {
    method: "POST",
    template: "/channels/{channel_id}/threads",
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/threads$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/threads` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `post /channels/${model.channel_id}/threads`] as const;
    }
} as const;
Object.freeze(route);
export type Response = CreatedThreadResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreatedThreadResponse;
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
export type Body = (CreateThreadRequestJSON | CreateThreadRequestURLEncoded | CreateThreadRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [
        formEncoded["--"], boundary, formEncoded["\"name\".1"], encoder.encode(JSON.stringify(model["name"])), formEncoded["lf"]
    ];
    if ("auto_archive_duration" in model) {
        const value = model["auto_archive_duration"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"auto_archive_duration\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("rate_limit_per_user" in model) {
        const value = model["rate_limit_per_user"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"rate_limit_per_user\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("applied_tags" in model) {
        const value = model["applied_tags"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"applied_tags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("message" in model) {
        const value = model["message"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"message\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"type\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("invitable" in model) {
        const value = model["invitable"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"invitable\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    "\"name\".1":encoder.encode("\nContent-Disposition: form-data; name=name\nContent-Type: application/json\n\n"),
    "\"auto_archive_duration\".1":encoder.encode("\nContent-Disposition: form-data; name=auto_archive_duration\nContent-Type: application/json\n\n"),
    "\"rate_limit_per_user\".1":encoder.encode("\nContent-Disposition: form-data; name=rate_limit_per_user\nContent-Type: application/json\n\n"),
    "\"applied_tags\".1":encoder.encode("\nContent-Disposition: form-data; name=applied_tags\nContent-Type: application/json\n\n"),
    "\"message\".1":encoder.encode("\nContent-Disposition: form-data; name=message\nContent-Type: application/json\n\n"),
    "\"type\".1":encoder.encode("\nContent-Disposition: form-data; name=type\nContent-Type: application/json\n\n"),
    "\"invitable\".1":encoder.encode("\nContent-Disposition: form-data; name=invitable\nContent-Type: application/json\n\n")
} as const;
