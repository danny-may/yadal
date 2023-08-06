/** @docs https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild */
import { Discord, IHttpResponse, guildId, jsonResponse, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/auto-moderation/rules`
export type Result = Discord.RESTGetAPIAutoModerationRulesResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
