/** @docs https://discord.com/developers/docs/resources/guild#get-guild-widget */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/widget.json`;
export type Result = Discord.RESTGetAPIGuildWidgetJSONResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}