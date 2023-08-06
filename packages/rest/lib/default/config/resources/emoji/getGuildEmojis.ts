/** @docs https://discord.com/developers/docs/resources/emoji#list-guild-emojis */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/emojis`;
export type Result = Discord.RESTGetAPIGuildEmojisResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
