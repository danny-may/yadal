/** @docs https://discord.com/developers/docs/resources/guild#get-guild-onboarding */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/onboarding`;
export type Result = Discord.RESTGetAPIGuildOnboardingResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}