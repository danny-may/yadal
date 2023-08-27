/*
 * Auto generated file, do not edit
 */
import { type BulkSetApplicationCommandsRequestPath, type BulkSetApplicationCommandsResponseJSON, type ErrorResponse, type BulkSetApplicationCommandsRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PUT";
export const name = "bulkSetApplicationCommands";
export type RouteModel = BulkSetApplicationCommandsRequestPath;
export const route = "/applications/{application_id}/commands";
export const routeKeys = Object.freeze(["application_id"] as const);
export type Response = BulkSetApplicationCommandsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as BulkSetApplicationCommandsResponseJSON;
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
export type Body = {
    data: BulkSetApplicationCommandsRequestJSON;
};
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return { type: `application/json; charset=${encoder.encoding}`, content: [encoder.encode(JSON.stringify(model["data"]))] };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
