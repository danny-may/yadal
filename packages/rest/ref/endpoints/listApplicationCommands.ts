/*
 * Auto generated file, do not edit
 */
import { type ListApplicationCommandsRequestPath, type ListApplicationCommandsRequestQuery, type ListApplicationCommandsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "listApplicationCommands";
export type RouteModel = ListApplicationCommandsRequestPath;
export const route = "/applications/{application_id}/commands";
export const routeKeys = Object.freeze(["application_id"] as const);
export type QueryModel = ListApplicationCommandsRequestQuery;
export const queryKeys = Object.freeze(["with_localizations"] as const);
export type Response = ListApplicationCommandsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListApplicationCommandsResponseJSON;
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
