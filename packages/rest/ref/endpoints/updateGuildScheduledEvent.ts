/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildScheduledEventRequestPath, type UpdateGuildScheduledEventResponseJSON, type ErrorResponse, type UpdateGuildScheduledEventRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "updateGuildScheduledEvent";
export type RouteModel = UpdateGuildScheduledEventRequestPath;
export const route = "/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}";
export const routeKeys = Object.freeze(["guild_id", "guild_scheduled_event_id"] as const);
export type Response = UpdateGuildScheduledEventResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as UpdateGuildScheduledEventResponseJSON;
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
export type Body = UpdateGuildScheduledEventRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("status" in model) {
        const value = model["status"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"status\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("image" in model) {
        const value = model["image"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"image\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_start_time" in model) {
        const value = model["scheduled_start_time"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"scheduled_start_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("scheduled_end_time" in model) {
        const value = model["scheduled_end_time"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"scheduled_end_time\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("entity_type" in model) {
        const value = model["entity_type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"entity_type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("privacy_level" in model) {
        const value = model["privacy_level"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(value)));
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
    if ("entity_metadata" in model) {
        const value = model["entity_metadata"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"entity_metadata\":"], encoder.encode(JSON.stringify(value)));
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
    "\"status\":":encoder.encode("\"status\":"),
    "\"name\":":encoder.encode("\"name\":"),
    "\"description\":":encoder.encode("\"description\":"),
    "\"image\":":encoder.encode("\"image\":"),
    "\"scheduled_start_time\":":encoder.encode("\"scheduled_start_time\":"),
    "\"scheduled_end_time\":":encoder.encode("\"scheduled_end_time\":"),
    "\"entity_type\":":encoder.encode("\"entity_type\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"entity_metadata\":":encoder.encode("\"entity_metadata\":")
} as const;
