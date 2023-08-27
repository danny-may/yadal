/*
 * Auto generated file, do not edit
 */
import { DiscordRestError } from '../helpers.js';
import { type StageInstanceResponse, type ErrorResponse, type CreateStageInstanceRequestJSON } from '../discord.js';
export const method = "POST";
export const name = "createStageInstance";
export type RouteModel = {};
export const route = "/stage-instances";
export const routeKeys = Object.freeze([] as const);
export type Response = StageInstanceResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as StageInstanceResponse;
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
export type Body = CreateStageInstanceRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"topic\":"], encoder.encode(JSON.stringify(model["topic"])), jsonEncoded[","],
        jsonEncoded["\"channel_id\":"], encoder.encode(JSON.stringify(model["channel_id"]))
    ];
    if ("privacy_level" in model) {
        const value = model["privacy_level"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"privacy_level\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("guild_scheduled_event_id" in model) {
        const value = model["guild_scheduled_event_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"guild_scheduled_event_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("send_start_notification" in model) {
        const value = model["send_start_notification"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"send_start_notification\":"], encoder.encode(JSON.stringify(value)));
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
    "\"topic\":":encoder.encode("\"topic\":"),
    "\"channel_id\":":encoder.encode("\"channel_id\":"),
    "\"privacy_level\":":encoder.encode("\"privacy_level\":"),
    "\"guild_scheduled_event_id\":":encoder.encode("\"guild_scheduled_event_id\":"),
    "\"send_start_notification\":":encoder.encode("\"send_start_notification\":")
} as const;
