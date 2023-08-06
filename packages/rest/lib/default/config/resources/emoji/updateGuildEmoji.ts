/** @docs https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
import { PATCH, guildId, emojiId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/emojis/${emojiId}`;
export type Result = Discord.RESTPatchAPIGuildEmojiResult;
export type Body = Discord.RESTPatchAPIGuildEmojiJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        name: true,
        roles: true
    })
}