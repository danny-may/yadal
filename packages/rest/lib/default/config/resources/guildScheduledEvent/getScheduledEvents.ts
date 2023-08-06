/** @docs https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild */
import { Discord, IHttpResponse, guildId, jsonResponse, queryParams, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/scheduled-events`;
export type Result = Discord.RESTGetAPIGuildScheduledEventsResult;
export type Query = Discord.RESTGetAPIGuildScheduledEventsQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        with_user_count: true
    })
}