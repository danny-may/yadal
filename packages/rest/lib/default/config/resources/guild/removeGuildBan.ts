/** @docs https://discord.com/developers/docs/resources/guild#remove-guild-ban */
import { DELETE, guildId, IHttpResponse, userId, auditLogReason, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/bans/${userId}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}