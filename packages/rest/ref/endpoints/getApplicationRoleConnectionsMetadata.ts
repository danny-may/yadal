/*
 * Auto generated file, do not edit
 */
import { type GetApplicationRoleConnectionsMetadataRequestPath, type GetApplicationRoleConnectionsMetadataResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "GET";
export const name = "getApplicationRoleConnectionsMetadata";
export type RouteModel = GetApplicationRoleConnectionsMetadataRequestPath;
export const route = "/applications/{application_id}/role-connections/metadata";
export const routeKeys = Object.freeze(["application_id"] as const);
export type Response = GetApplicationRoleConnectionsMetadataResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GetApplicationRoleConnectionsMetadataResponseJSON;
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
