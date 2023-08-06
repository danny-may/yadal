/** @docs https://discord.com/developers/docs/resources/guild#delete-guild-role */
import { DELETE, guildId, IHttpResponse, noContent, roleId, auditLogReason, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/roles/${roleId}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}
