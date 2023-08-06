/** @docs https://discord.com/developers/docs/resources/emoji#delete-guild-emoji */
import { DELETE, guildId, emojiId, auditLogReason, IHttpResponse, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/emojis/${emojiId}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}
