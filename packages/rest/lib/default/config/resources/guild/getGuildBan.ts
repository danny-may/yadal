/** @docs https://discord.com/developers/docs/resources/guild#get-guild-ban */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, userId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/bans/${userId}`;
export type Result = Discord.RESTGetAPIGuildBanResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}