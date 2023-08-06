/** @docs https://discord.com/developers/docs/resources/guild#get-guild-widget-settings */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/widget`;
export type Result = Discord.RESTGetAPIGuildWidgetSettingsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}