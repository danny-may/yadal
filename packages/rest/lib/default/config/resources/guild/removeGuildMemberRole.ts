/** @docs https://discord.com/developers/docs/resources/guild#remove-guild-member-role */
import { DELETE, guildId, userId, IHttpResponse, roleId, auditLogReason, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/members/${userId}/roles/${roleId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}