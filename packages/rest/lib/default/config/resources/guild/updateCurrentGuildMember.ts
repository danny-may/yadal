/** @docs https://discord.com/developers/docs/resources/guild#modify-current-member */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/members/@me`;
export type Result = Discord.RESTPatchAPIGuildMemberResult;
export type Body = Discord.RESTPatchAPICurrentGuildMemberJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        nick: true,
    })
}