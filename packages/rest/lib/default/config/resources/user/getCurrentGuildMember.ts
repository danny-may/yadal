/** @docs https://discord.com/developers/docs/resources/user#get-current-user-guild-member */
import { Discord, IHttpResponse, guildId, jsonResponse, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/users/@me/guilds/${guildId}/member`;
export type Result = Discord.RESTGetAPIGuildMemberResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}