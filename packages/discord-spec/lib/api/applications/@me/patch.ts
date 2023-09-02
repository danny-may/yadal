/*
 * Auto generated file, do not edit
 */
import { type UpdateMyApplicationRequestHeaders, type PrivateApplicationResponse, type RateLimitError, type ErrorResponse, type ApplicationFormPartial } from '../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../helpers.js';
export const name = "updateMyApplication";
export type RouteModel = {

};
const routeRegex = /^\/applications\/@me$/i;
export const route = {
    method: "PATCH",
    template: Object.freeze({
        raw: "/applications/@me" as const,
        keys: Object.freeze([] as const),
        segments: Object.freeze(["/applications/@me"] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/applications\/@me$/i;
    },
    create(_?: RouteModel) {
        return `/applications/@me` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            
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
    bucket(_?: { [P in never]: RouteModel[P] | string; }) {
        return `patch /applications/@me` as const;
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
export type HeaderModel = UpdateMyApplicationRequestHeaders;
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
export type Response = PrivateApplicationResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as PrivateApplicationResponse;
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
export type Body = ApplicationFormPartial;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "description": model["description" as keyof typeof model],
            "icon": model["icon" as keyof typeof model],
            "cover_image": model["cover_image" as keyof typeof model],
            "team_id": model["team_id" as keyof typeof model],
            "flags": model["flags" as keyof typeof model],
            "interactions_endpoint_url": model["interactions_endpoint_url" as keyof typeof model],
            "max_participants": model["max_participants" as keyof typeof model],
            "type": model["type" as keyof typeof model],
            "tags": model["tags" as keyof typeof model],
            "custom_install_url": model["custom_install_url" as keyof typeof model],
            "install_params": model["install_params" as keyof typeof model],
            "role_connections_verification_url": model["role_connections_verification_url" as keyof typeof model]
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
