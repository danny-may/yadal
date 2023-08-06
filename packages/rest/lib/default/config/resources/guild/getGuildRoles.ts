/** @docs https://discord.com/developers/docs/resources/guild#get-guild-roles */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/roles`;
export type Result = Discord.RESTGetAPIGuildRolesResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}