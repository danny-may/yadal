/*
 * Auto generated file, do not edit
 */
import { DiscordRestError } from '../helpers.js';
import { type CreateDmResponseJSON, type ErrorResponse, type CreatePrivateChannelRequest } from '../discord.js';
export const method = "POST";
export const name = "createDm";
export type RouteModel = {};
export const route = "/users/@me/channels";
export const routeKeys = Object.freeze([] as const);
export type Response = CreateDmResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreateDmResponseJSON;
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
export type Body = CreatePrivateChannelRequest;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("recipient_id" in model) {
        const value = model["recipient_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"recipient_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("access_tokens" in model) {
        const value = model["access_tokens"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"access_tokens\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("nicks" in model) {
        const value = model["nicks"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"nicks\":"], encoder.encode(JSON.stringify(value)));
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
    "\"recipient_id\":":encoder.encode("\"recipient_id\":"),
    "\"access_tokens\":":encoder.encode("\"access_tokens\":"),
    "\"nicks\":":encoder.encode("\"nicks\":")
} as const;
