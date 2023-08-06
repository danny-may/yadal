/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-widget */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/widget`;
export type Result = Discord.RESTPatchAPIGuildWidgetSettingsResult;
export type Body = Discord.RESTPatchAPIGuildWidgetSettingsJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        enabled: true
    });
}