/** @docs https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule */
import { PATCH, guildId, ruleId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
export type Result = Discord.RESTPatchAPIAutoModerationRuleResult;
export type Body = Discord.RESTPatchAPIAutoModerationRuleJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        actions: true,
        enabled: true,
        event_type: true,
        exempt_channels: true,
        exempt_roles: true,
        name: true,
        trigger_metadata: true
    });
}
