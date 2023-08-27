/*
 * Auto generated file, do not edit
 */
import { type CreateGuildScheduledEventRequestPath, type CreateGuildScheduledEventResponseJSON, type ErrorResponse, type CreateGuildScheduledEventRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createGuildScheduledEvent";
export type RouteModel = CreateGuildScheduledEventRequestPath;
export const route = "/guilds/{guild_id}/scheduled-events";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = CreateGuildScheduledEventResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as CreateGuildScheduledEventResponseJSON;
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
export type Body = CreateGuildScheduledEventRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])), jsonEncoded[","],
        jsonEncoded["\"scheduled_start_time\":"], encoder.encode(JSON.stringify(model["scheduled_start_time"])), jsonEncoded[","],
        jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(model["privacy_level"])), jsonEncoded[","],
        jsonEncoded["\"entity_type\":"], encoder.encode(JSON.stringify(model["entity_type"]))
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("image" in model) {
        const value = model["image"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"image\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_end_time" in model) {
        const value = model["scheduled_end_time"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"scheduled_end_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("channel_id" in model) {
        const value = model["channel_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("entity_metadata" in model) {
        const value = model["entity_metadata"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"entity_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"description\":":encoder.encode("\"description\":"),
    "\"image\":":encoder.encode("\"image\":"),
    "\"scheduled_start_time\":":encoder.encode("\"scheduled_start_time\":"),
    "\"scheduled_end_time\":":encoder.encode("\"scheduled_end_time\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"entity_type\":":encoder.encode("\"entity_type\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"entity_metadata\":":encoder.encode("\"entity_metadata\":")
} as const;
