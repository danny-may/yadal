/*
 * Auto generated file, do not edit
 */
import { type BulkUpdateGuildRolesRequestPath, type BulkUpdateGuildRolesResponseJSON, type ErrorResponse, type BulkUpdateGuildRolesRequestJSON } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "bulkUpdateGuildRoles";
export type RouteModel = BulkUpdateGuildRolesRequestPath;
export const route = "/guilds/{guild_id}/roles";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = BulkUpdateGuildRolesResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as BulkUpdateGuildRolesResponseJSON;
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
    data: BulkUpdateGuildRolesRequestJSON;
};
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return { type: `application/json; charset=${encoder.encoding}`, content: [encoder.encode(JSON.stringify(model["data"]))] };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
