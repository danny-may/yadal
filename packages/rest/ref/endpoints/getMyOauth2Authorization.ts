/*
 * Auto generated file, do not edit
 */
import { DiscordRestError } from '../helpers.js';
import { type OAuth2GetAuthorizationResponse, type ErrorResponse } from '../discord.js';
export const method = "GET";
export const name = "getMyOauth2Authorization";
export type RouteModel = {};
export const route = "/oauth2/@me";
export const routeKeys = Object.freeze([] as const);
export type Response = OAuth2GetAuthorizationResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as OAuth2GetAuthorizationResponse;
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
