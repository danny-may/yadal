/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-role */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, roleId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/roles/${roleId}`;
export type Result = Discord.RESTPatchAPIGuildRoleResult;
export type Body = Discord.RESTPatchAPIGuildRoleJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        color: true,
        hoist: true,
        icon: true,
        mentionable: true,
        name: true,
        permissions: true,
        unicode_emoji: true
    });
}