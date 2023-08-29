/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-onboarding */
import { PUT, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/guilds/${guildId}/onboarding`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        default_channel_ids: true,
        enabled: true,
        mode: true,
        prompts: true
    });
}
export type Result = Discord.RESTPutAPIGuildOnboardingResult;
export type Body = Discord.RESTPutAPIGuildOnboardingJSONBody;