/*
 * Auto generated file, do not edit
 */
import { type CreateWebhookRequestPath, type GuildIncomingWebhookResponse, type ErrorResponse, type CreateWebhookRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createWebhook";
export type RouteModel = CreateWebhookRequestPath;
export const route = "/channels/{channel_id}/webhooks";
export const routeKeys = Object.freeze(["channel_id"] as const);
export type Response = GuildIncomingWebhookResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildIncomingWebhookResponse;
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
export type Body = CreateWebhookRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"]))
    ];
    if ("avatar" in model) {
        const value = model["avatar"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"avatar\":"], encoder.encode(JSON.stringify(value)));
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
    "\"avatar\":":encoder.encode("\"avatar\":")
} as const;
