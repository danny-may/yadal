/** @docs https://discord.com/developers/docs/resources/guild-template#get-guild-templates */
import { Discord, IHttpResponse, guildId, jsonResponse, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/templates`;
export type Result = Discord.RESTGetAPIGuildTemplatesResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}