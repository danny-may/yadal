/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-member */
import { PATCH, guildId, userId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/members/${userId}`;
export type Result = Discord.RESTPatchAPIGuildMemberResult;
export type Body = Discord.RESTPatchAPIGuildMemberJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        communication_disabled_until: true,
        deaf: true,
        mute: true,
        nick: true,
        roles: true
    })
}