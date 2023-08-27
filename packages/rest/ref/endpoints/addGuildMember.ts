/*
 * Auto generated file, do not edit
 */
import { type AddGuildMemberRequestPath, type GuildMemberResponse, type ErrorResponse, type AddGuildMemberRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PUT";
export const name = "addGuildMember";
export type RouteModel = AddGuildMemberRequestPath;
export const route = "/guilds/{guild_id}/members/{user_id}";
export const routeKeys = Object.freeze(["guild_id", "user_id"] as const);
export type Response = (GuildMemberResponse | undefined);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildMemberResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
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
export type Body = AddGuildMemberRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"access_token\":"], encoder.encode(JSON.stringify(model["access_token"]))
    ];
    if ("nick" in model) {
        const value = model["nick"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"nick\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("roles" in model) {
        const value = model["roles"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"roles\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("mute" in model) {
        const value = model["mute"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"mute\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("deaf" in model) {
        const value = model["deaf"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"deaf\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"flags\":"], encoder.encode(JSON.stringify(value)));
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
    "\"nick\":":encoder.encode("\"nick\":"),
    "\"roles\":":encoder.encode("\"roles\":"),
    "\"mute\":":encoder.encode("\"mute\":"),
    "\"deaf\":":encoder.encode("\"deaf\":"),
    "\"access_token\":":encoder.encode("\"access_token\":"),
    "\"flags\":":encoder.encode("\"flags\":")
} as const;
