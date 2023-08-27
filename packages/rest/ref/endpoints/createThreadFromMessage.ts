/*
 * Auto generated file, do not edit
 */
import { type CreateThreadFromMessageRequestPath, type ThreadResponse, type ErrorResponse, type CreateTextThreadWithMessageRequest } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createThreadFromMessage";
export type RouteModel = CreateThreadFromMessageRequestPath;
export const route = "/channels/{channel_id}/messages/{message_id}/threads";
export const routeKeys = Object.freeze(["channel_id", "message_id"] as const);
export type Response = ThreadResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ThreadResponse;
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
export type Body = CreateTextThreadWithMessageRequest;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"]))
    ];
    if ("auto_archive_duration" in model) {
        const value = model["auto_archive_duration"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"auto_archive_duration\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rate_limit_per_user" in model) {
        const value = model["rate_limit_per_user"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"rate_limit_per_user\":"], encoder.encode(JSON.stringify(value)));
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
    "\"name\":":encoder.encode("\"name\":"),
    "\"auto_archive_duration\":":encoder.encode("\"auto_archive_duration\":"),
    "\"rate_limit_per_user\":":encoder.encode("\"rate_limit_per_user\":")
} as const;
