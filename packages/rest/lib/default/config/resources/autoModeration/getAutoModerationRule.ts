/** @docs https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule */
import { Discord, IHttpResponse, guildId, jsonResponse, GET, ruleId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
export type Result = Discord.RESTGetAPIAutoModerationRuleResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
