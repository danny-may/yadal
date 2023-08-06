/** @docs https://discord.com/developers/docs/resources/sticker#list-guild-sticker */
import { Discord, IHttpResponse, jsonResponse, GET, guildId, stickerId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/stickers/${stickerId}`;
export type Result = Discord.RESTGetAPIGuildStickerResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}