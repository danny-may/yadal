/*
 * Auto generated file, do not edit
 */
import { type UpdateApplicationUserRoleConnectionRequestPath, type UpdateApplicationUserRoleConnectionRequestHeaders, type ApplicationUserRoleConnectionResponse, type RateLimitError, type ErrorResponse, type UpdateApplicationUserRoleConnectionRequestJSON } from '../../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../helpers.js';
export const name = "updateApplicationUserRoleConnection";
export type RouteModel = UpdateApplicationUserRoleConnectionRequestPath;
const routeRegex = /^\/users\/@me\/applications\/(?<application_id>.*?)\/role-connection$/i;
export const route = {
    method: "PUT",
    template: "/users/@me/applications/{application_id}/role-connection",
    keys: Object.freeze(["application_id"] as const),
    authentication: Object.freeze({
        "OAuth2": Object.freeze([
            "role_connections.write"
        ] as const)
    } as const),
    get regex(){
        return /^\/users\/@me\/applications\/(?<application_id>.*?)\/role-connection$/i;
    },
    create(model: RouteModel) {
        return `/users/@me/applications/${encodeURIComponent(model.application_id)}/role-connection` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["application_id"]: decodeURIComponent(match["application_id"]!)
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
        return `put /users/@me/applications/<any>/role-connection` as const;
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
export type HeaderModel = UpdateApplicationUserRoleConnectionRequestHeaders;
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
export type Response = ApplicationUserRoleConnectionResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ApplicationUserRoleConnectionResponse;
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
export type Body = UpdateApplicationUserRoleConnectionRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "platform_name": model["platform_name" as keyof typeof model],
            "platform_username": model["platform_username" as keyof typeof model],
            "metadata": model["metadata" as keyof typeof model]
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
