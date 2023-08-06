/** @docs https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event */
import { Discord, IHttpResponse, auditLogReason, guildId, jsonResponse, PATCH, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/scheduled-events`;
export type Result = Discord.RESTPatchAPIGuildScheduledEventResult;
export type Body = Discord.RESTPatchAPIGuildScheduledEventJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        description: true,
        entity_metadata: true,
        entity_type: true,
        image: true,
        name: true,
        privacy_level: true,
        scheduled_end_time: true,
        scheduled_start_time: true,
        status: true
    })
}