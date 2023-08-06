/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/roles`;
export type Result = Discord.RESTPatchAPIGuildRolePositionsResult;
export type Body = { roles: Discord.RESTPatchAPIGuildRolePositionsJSONBody };
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, 'roles');
}