/** @docs https://discord.com/developers/docs/resources/guild#list-active-guild-threads */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/threads/active`;
export type Result = Discord.RESTGetAPIGuildThreadsResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
