/*
 * Auto generated file, do not edit
 */
import { type UpdateVoiceStateRequestPath, type ErrorResponse, type UpdateVoiceStateRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "updateVoiceState";
export type RouteModel = UpdateVoiceStateRequestPath;
export const route = "/guilds/{guild_id}/voice-states/{user_id}";
export const routeKeys = Object.freeze(["guild_id", "user_id"] as const);
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
export type Body = UpdateVoiceStateRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("suppress" in model) {
        const value = model["suppress"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"suppress\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("channel_id" in model) {
        const value = model["channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(value)));
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
    "\"suppress\":":encoder.encode("\"suppress\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":")
} as const;
