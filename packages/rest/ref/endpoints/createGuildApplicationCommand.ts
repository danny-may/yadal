/*
 * Auto generated file, do not edit
 */
import { type CreateGuildApplicationCommandRequestPath, type ApplicationCommandResponse, type ErrorResponse, type CreateGuildApplicationCommandRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createGuildApplicationCommand";
export type RouteModel = CreateGuildApplicationCommandRequestPath;
export const route = "/applications/{application_id}/guilds/{guild_id}/commands";
export const routeKeys = Object.freeze(["application_id", "guild_id"] as const);
export type Response = ApplicationCommandResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationCommandResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationCommandResponse;
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
export type Body = CreateGuildApplicationCommandRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])), jsonEncoded[","],
        jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(model["type"]))
    ];
    if ("name_localizations" in model) {
        const value = model["name_localizations"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"name_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description_localizations" in model) {
        const value = model["description_localizations"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("options" in model) {
        const value = model["options"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"options\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_member_permissions" in model) {
        const value = model["default_member_permissions"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_member_permissions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("dm_permission" in model) {
        const value = model["dm_permission"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"dm_permission\":"], encoder.encode(JSON.stringify(value)));
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
    "\"name_localizations\":":encoder.encode("\"name_localizations\":"),
    "\"description\":":encoder.encode("\"description\":"),
    "\"description_localizations\":":encoder.encode("\"description_localizations\":"),
    "\"options\":":encoder.encode("\"options\":"),
    "\"default_member_permissions\":":encoder.encode("\"default_member_permissions\":"),
    "\"dm_permission\":":encoder.encode("\"dm_permission\":"),
    "\"type\":":encoder.encode("\"type\":")
} as const;
