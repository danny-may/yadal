/*
 * Auto generated file, do not edit
 */
import { type CreateInteractionResponseRequestPath, type CreateInteractionResponseRequestHeaders, type RateLimitError, type ErrorResponse, type CreateInteractionResponseRequestJSON, type CreateInteractionResponseRequestURLEncoded, type CreateInteractionResponseRequestFormData } from '../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../helpers.js';
export const name = "createInteractionResponse";
export type RouteModel = CreateInteractionResponseRequestPath;
const routeRegex = /^\/interactions\/(?<interaction_id>.*?)\/(?<interaction_token>.*?)\/callback$/i;
export const route = {
    method: "POST",
    template: Object.freeze({
        raw: "/interactions/{interaction_id}/{interaction_token}/callback" as const,
        keys: Object.freeze(["interaction_id","interaction_token"] as const),
        segments: Object.freeze(["/interactions/","/","/callback"] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/interactions\/(?<interaction_id>.*?)\/(?<interaction_token>.*?)\/callback$/i;
    },
    create(model: RouteModel) {
        return `/interactions/${encodeURIComponent(model.interaction_id)}/${encodeURIComponent(model.interaction_token)}/callback` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["interaction_id"]: decodeURIComponent(match.groups!["interaction_id"]!),
            ["interaction_token"]: decodeURIComponent(match.groups!["interaction_token"]!)
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
    global: false,
    bucket(model: { [P in "interaction_id" | "interaction_token"]: RouteModel[P] | string; }) {
        return `post /interactions/${model.interaction_id}/${model.interaction_token}/callback` as const;
    }
} as const;
Object.freeze(rateLimit);
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
export type Body = (CreateInteractionResponseRequestJSON | CreateInteractionResponseRequestURLEncoded | CreateInteractionResponseRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "type": model["type" as keyof typeof model],
            "data": model["data" as keyof typeof model]
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
