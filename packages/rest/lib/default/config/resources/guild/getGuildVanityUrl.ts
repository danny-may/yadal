/** @docs https://discord.com/developers/docs/resources/guild#get-guild-vanity-url */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/vanity-url`;
export type Result = Discord.RESTGetAPIGuildVanityUrlResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}