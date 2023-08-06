/** @docs https://discord.com/developers/docs/resources/guild#list-guild-members */
import { GET, id, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${id('guildId')}/members`;
export type Result = Discord.RESTGetAPIGuildMembersResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
