/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-mfa-level */
import { POST, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, roleId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/roles/${roleId}`;
export type Result = Discord.RESTPostAPIGuildsMFAResult;
export type Body = Discord.RESTPostAPIGuildsMFAJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        level: true
    });
}