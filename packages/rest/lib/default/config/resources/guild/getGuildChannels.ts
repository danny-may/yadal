/** @docs https://discord.com/developers/docs/resources/guild#get-guild-channels */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/channels`;
export type Result = Discord.RESTGetAPIGuildChannelsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
