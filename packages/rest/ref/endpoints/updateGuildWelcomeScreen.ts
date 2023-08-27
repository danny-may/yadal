/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildWelcomeScreenRequestPath, type GuildWelcomeScreenResponse, type ErrorResponse, type WelcomeScreenPatchRequestPartial } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "updateGuildWelcomeScreen";
export type RouteModel = UpdateGuildWelcomeScreenRequestPath;
export const route = "/guilds/{guild_id}/welcome-screen";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = GuildWelcomeScreenResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildWelcomeScreenResponse;
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
export type Body = WelcomeScreenPatchRequestPartial;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("welcome_channels" in model) {
        const value = model["welcome_channels"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"welcome_channels\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("enabled" in model) {
        const value = model["enabled"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"enabled\":"], encoder.encode(JSON.stringify(value)));
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
    "\"description\":":encoder.encode("\"description\":"),
    "\"welcome_channels\":":encoder.encode("\"welcome_channels\":"),
    "\"enabled\":":encoder.encode("\"enabled\":")
} as const;
