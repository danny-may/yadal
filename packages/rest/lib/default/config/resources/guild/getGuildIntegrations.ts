/** @docs https://discord.com/developers/docs/resources/guild#get-guild-integrations */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/integrations`;
export type Result = Discord.RESTGetAPIGuildIntegrationsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}