/** @docs https://discord.com/developers/docs/resources/guild#add-guild-member-role */
import { PUT, guildId, userId, IHttpResponse, roleId, auditLogReason, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/guilds/${guildId}/members/${userId}/roles/${roleId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}