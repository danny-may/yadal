/** @docs https://discord.com/developers/docs/resources/guild#get-guild-member */
import { GET, guildId, userId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/members/${userId}`;
export type Result = Discord.RESTGetAPIGuildMemberResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
