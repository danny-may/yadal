/*
 * Auto generated file, do not edit
 */
import { type UpdateApplicationUserRoleConnectionRequestPath, type RateLimitError, type ApplicationUserRoleConnectionResponse, type ErrorResponse, type UpdateApplicationUserRoleConnectionRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateApplicationUserRoleConnection";
export type RouteModel = UpdateApplicationUserRoleConnectionRequestPath;
const routeRegex = /^\/users\/@me\/applications\/(?<application_id>.*?)\/role-connection$/i;
export const route = {
    method: "PUT",
    template: "/users/@me/applications/{application_id}/role-connection",
    get regex(){
        return /^\/users\/@me\/applications\/(?<application_id>.*?)\/role-connection$/i;
    },
    create(model: RouteModel) {
        return `/users/@me/applications/${encodeURIComponent(model.application_id)}/role-connection` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!)
        }
    },
    rateLimitBuckets(_: {}) {
        return ["global", `put /users/@me/applications/<any>/role-connection`] as const;
    }
} as const;
Object.freeze(route);
export type Response = ApplicationUserRoleConnectionResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationUserRoleConnectionResponse;
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
export type Body = UpdateApplicationUserRoleConnectionRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("platform_name" in model) {
        const value = model["platform_name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"platform_name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("platform_username" in model) {
        const value = model["platform_username"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"platform_username\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("metadata" in model) {
        const value = model["metadata"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"platform_name\":":encoder.encode("\"platform_name\":"),
    "\"platform_username\":":encoder.encode("\"platform_username\":"),
    "\"metadata\":":encoder.encode("\"metadata\":")
} as const;
