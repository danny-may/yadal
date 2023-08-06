/** @docs https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log */
import { Discord, IHttpResponse, guildId, jsonResponse, queryParams, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/audit-logs`
export type Query = Discord.RESTGetAPIAuditLogQuery;
export type Result = Discord.RESTGetAPIAuditLogResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        action_type: true,
        after: true,
        before: true,
        limit: true,
        user_id: true
    });
}
