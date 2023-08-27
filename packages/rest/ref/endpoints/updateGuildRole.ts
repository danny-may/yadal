/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildRoleRequestPath, type GuildRoleResponse, type ErrorResponse, type UpdateGuildRoleRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "updateGuildRole";
export type RouteModel = UpdateGuildRoleRequestPath;
export const route = "/guilds/{guild_id}/roles/{role_id}";
export const routeKeys = Object.freeze(["guild_id", "role_id"] as const);
export type Response = GuildRoleResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildRoleResponse;
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
export type Body = UpdateGuildRoleRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("permissions" in model) {
        const value = model["permissions"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"permissions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("color" in model) {
        const value = model["color"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"color\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("hoist" in model) {
        const value = model["hoist"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"hoist\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("mentionable" in model) {
        const value = model["mentionable"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"mentionable\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("icon" in model) {
        const value = model["icon"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"icon\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("unicode_emoji" in model) {
        const value = model["unicode_emoji"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"unicode_emoji\":"], encoder.encode(JSON.stringify(value)));
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
    "\"permissions\":":encoder.encode("\"permissions\":"),
    "\"color\":":encoder.encode("\"color\":"),
    "\"hoist\":":encoder.encode("\"hoist\":"),
    "\"mentionable\":":encoder.encode("\"mentionable\":"),
    "\"icon\":":encoder.encode("\"icon\":"),
    "\"unicode_emoji\":":encoder.encode("\"unicode_emoji\":")
} as const;
