/** @docs https://discord.com/developers/docs/resources/guild#create-guild-role */
import { POST, Discord, IHttpResponse, jsonResponse, requestBody, guildId, auditLogReason, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/roles`;
export type Result = Discord.RESTPostAPIGuildRoleResult;
export type Body = Discord.RESTPostAPIGuildRoleJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        color: true,
        hoist: true,
        icon: true,
        mentionable: true,
        name: true,
        permissions: true,
        unicode_emoji: true
    })
}