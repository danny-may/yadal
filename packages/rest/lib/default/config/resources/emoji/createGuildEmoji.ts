/** @docs https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
import { POST, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/emojis`;
export type Result = Discord.RESTPostAPIGuildEmojiResult;
export type Body = Discord.RESTPostAPIGuildEmojiJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        name: true,
        image: true,
        roles: true
    })
}