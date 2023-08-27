/*
 * Auto generated file, do not edit
 */
import { type CreateGuildEmojiRequestPath, type EmojiResponse, type ErrorResponse, type CreateGuildEmojiRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createGuildEmoji";
export type RouteModel = CreateGuildEmojiRequestPath;
export const route = "/guilds/{guild_id}/emojis";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = EmojiResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as EmojiResponse;
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
export type Body = CreateGuildEmojiRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])), jsonEncoded[","],
        jsonEncoded["\"image\":"], encoder.encode(JSON.stringify(model["image"]))
    ];
    if ("roles" in model) {
        const value = model["roles"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"roles\":"], encoder.encode(JSON.stringify(value)));
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
    "\"image\":":encoder.encode("\"image\":"),
    "\"roles\":":encoder.encode("\"roles\":")
} as const;
