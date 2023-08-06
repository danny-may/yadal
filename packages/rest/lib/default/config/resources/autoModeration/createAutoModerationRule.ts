/** @docs https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule */
import { Discord, IHttpResponse, auditLogReason, guildId, jsonResponse, POST, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/auto-moderation/rules`
export type Result = Discord.RESTPostAPIAutoModerationRuleResult;
export type Body = Discord.RESTPostAPIAutoModerationRuleJSONBody;
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
        trigger_metadata: true,
        trigger_type: true
    });
}
