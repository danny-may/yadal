/*
 * Auto generated file, do not edit
 */
import { type SetGuildMfaLevelRequestPath, type GuildMFALevelResponse, type ErrorResponse, type SetGuildMfaLevelRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "setGuildMfaLevel";
export type RouteModel = SetGuildMfaLevelRequestPath;
export const route = "/guilds/{guild_id}/mfa";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = GuildMFALevelResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildMFALevelResponse;
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
export type Body = SetGuildMfaLevelRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"level\":"], encoder.encode(JSON.stringify(model["level"])),
        jsonEncoded["}"]
    ];
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const jsonEncoded = {
    ",":encoder.encode(","),
    "{":encoder.encode("{"),
    "}":encoder.encode("}"),
    "\"level\":":encoder.encode("\"level\":")
} as const;
