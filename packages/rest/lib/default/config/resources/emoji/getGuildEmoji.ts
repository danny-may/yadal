/** @docs https://discord.com/developers/docs/resources/emoji#get-guild-emoji */
import { GET, guildId, emojiId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/emojis/${emojiId}`;
export type Result = Discord.RESTGetAPIGuildEmojiResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
