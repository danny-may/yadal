/** @docs https://discord.com/developers/docs/resources/guild#create-guild-ban */
import { PUT, guildId, Discord, IHttpResponse, userId, auditLogReason, noContent, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/guilds/${guildId}/bans/${userId}`;
export type Body = Discord.RESTPutAPIGuildBanJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}
export function body(model: Body) {
    return requestBody(model, {
        delete_message_days: true,
        delete_message_seconds: true
    })
}