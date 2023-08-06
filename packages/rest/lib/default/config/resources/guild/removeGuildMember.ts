/** @docs https://discord.com/developers/docs/resources/guild#remove-guild-member */
import { DELETE, guildId, userId, IHttpResponse, auditLogReason, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/members/${userId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}