/** @docs https://discord.com/developers/docs/resources/sticker#list-guild-stickers */
import { Discord, IHttpResponse, jsonResponse, GET, guildId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/stickers`;
export type Result = Discord.RESTGetAPIGuildStickersResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}