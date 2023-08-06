/** @docs https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule */
import { auditLogReason, noContent, IHttpResponse, DELETE, guildId, ruleId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}
