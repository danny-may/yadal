/*
 * Auto generated file, do not edit
 */
import { type CreateInteractionResponseRequestPath, type CreateInteractionResponseRequestHeaders, type RateLimitError, type ErrorResponse, type CreateInteractionResponseRequestJSON, type CreateInteractionResponseRequestURLEncoded, type CreateInteractionResponseRequestFormData } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createInteractionResponse";
export type RouteModel = CreateInteractionResponseRequestPath;
const routeRegex = /^\/interactions\/(?<interaction_id>.*?)\/(?<interaction_token>.*?)\/callback$/i;
export const route = {
    method: "POST",
    template: "/interactions/{interaction_id}/{interaction_token}/callback",
    keys: Object.freeze(["interaction_id","interaction_token"] as const),
    get regex(){
        return /^\/interactions\/(?<interaction_id>.*?)\/(?<interaction_token>.*?)\/callback$/i;
    },
    create(model: RouteModel) {
        return `/interactions/${encodeURIComponent(model.interaction_id)}/${encodeURIComponent(model.interaction_token)}/callback` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["interaction_id"]: decodeURIComponent(match.groups!["interaction_id"]!),
            ["interaction_token"]: decodeURIComponent(match.groups!["interaction_token"]!)
        }
    },
    rateLimitBuckets(model: { ["interaction_id"]: RouteModel["interaction_id"] | string; ["interaction_token"]: RouteModel["interaction_token"] | string; }) {
        return [`post /interactions/${model.interaction_id}/${model.interaction_token}/callback`] as const;
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
export type HeaderModel = CreateInteractionResponseRequestHeaders;
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
export type Body = (CreateInteractionResponseRequestJSON | CreateInteractionResponseRequestURLEncoded | CreateInteractionResponseRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [
        formEncoded["--"], boundary, formEncoded["\"type\".1"], encoder.encode(JSON.stringify(model["type"])), formEncoded["lf"]
    ];
    if ("data" in model) {
        const value = model["data"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"data\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    "\"type\".1":encoder.encode("\nContent-Disposition: form-data; name=type\nContent-Type: application/json\n\n"),
    "\"data\".1":encoder.encode("\nContent-Disposition: form-data; name=data\nContent-Type: application/json\n\n")
} as const;
