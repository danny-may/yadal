/*
 * Auto generated file, do not edit
 */
import { type UpdateApplicationUserRoleConnectionRequestPath, type ApplicationUserRoleConnectionResponse, type ErrorResponse, type UpdateApplicationUserRoleConnectionRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PUT";
export const name = "updateApplicationUserRoleConnection";
export type RouteModel = UpdateApplicationUserRoleConnectionRequestPath;
export const route = "/users/@me/applications/{application_id}/role-connection";
export const routeKeys = Object.freeze(["application_id"] as const);
export type Response = ApplicationUserRoleConnectionResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationUserRoleConnectionResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
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
