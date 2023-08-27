/*
 * Auto generated file, do not edit
 */
import { type SetGuildApplicationCommandPermissionsRequestPath, type CommandPermissionsResponse, type ErrorResponse, type SetGuildApplicationCommandPermissionsRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PUT";
export const name = "setGuildApplicationCommandPermissions";
export type RouteModel = SetGuildApplicationCommandPermissionsRequestPath;
export const route = "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions";
export const routeKeys = Object.freeze(["application_id", "guild_id", "command_id"] as const);
export type Response = CommandPermissionsResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CommandPermissionsResponse;
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
export type Body = SetGuildApplicationCommandPermissionsRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("permissions" in model) {
        const value = model["permissions"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"permissions\":"], encoder.encode(JSON.stringify(value)));
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
    "\"permissions\":":encoder.encode("\"permissions\":")
} as const;
