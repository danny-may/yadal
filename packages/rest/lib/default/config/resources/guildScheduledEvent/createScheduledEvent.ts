/** @docs https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event */
import { Discord, IHttpResponse, auditLogReason, guildId, jsonResponse, POST, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/scheduled-events`;
export type Result = Discord.RESTPostAPIGuildScheduledEventResult;
export type Body = Discord.RESTPostAPIGuildScheduledEventJSONBody;
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
        scheduled_start_time: true
    })
}