/*
 * Auto generated file, do not edit
 */
import { DiscordRestError } from '../helpers.js';
import { type ListVoiceRegionsResponseJSON, type ErrorResponse } from '../discord.js';
export const method = "GET";
export const name = "listVoiceRegions";
export type RouteModel = {};
export const route = "/voice/regions";
export const routeKeys = Object.freeze([] as const);
export type Response = ListVoiceRegionsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListVoiceRegionsResponseJSON;
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
