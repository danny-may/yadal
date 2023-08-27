/*
 * Auto generated file, do not edit
 */
import { type SetChannelPermissionOverwriteRequestPath, type ErrorResponse, type SetChannelPermissionOverwriteRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PUT";
export const name = "setChannelPermissionOverwrite";
export type RouteModel = SetChannelPermissionOverwriteRequestPath;
export const route = "/channels/{channel_id}/permissions/{overwrite_id}";
export const routeKeys = Object.freeze(["channel_id", "overwrite_id"] as const);
export type Response = undefined;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 204) {
        return undefined;
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = SetChannelPermissionOverwriteRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("allow" in model) {
        const value = model["allow"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"allow\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("deny" in model) {
        const value = model["deny"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"deny\":"], encoder.encode(JSON.stringify(value)));
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
    "\"type\":":encoder.encode("\"type\":"),
    "\"allow\":":encoder.encode("\"allow\":"),
    "\"deny\":":encoder.encode("\"deny\":")
} as const;
