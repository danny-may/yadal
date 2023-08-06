/** @docs https://discord.com/developers/docs/resources/guild#begin-guild-prune */
import { POST, guildId, Discord, IHttpResponse, jsonResponse, auditLogReason, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/prune`;
export type Result = Discord.RESTPostAPIGuildPruneResult;
export type Query = Discord.RESTPostAPIGuildPruneJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Query) {
    return requestBody(model, {
        compute_prune_count: true,
        days: true,
        include_roles: true
    })
}