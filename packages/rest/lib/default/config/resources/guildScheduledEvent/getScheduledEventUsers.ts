/** @docs https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users */
import { Discord, IHttpResponse, eventId, guildId, jsonResponse, queryParams, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/scheduled-events/${eventId}/users`;
export type Result = Discord.RESTGetAPIGuildScheduledEventUsersResult;
export type Query = Discord.RESTGetAPIGuildScheduledEventUsersQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        after: true,
        before: true,
        limit: true,
        with_member: true
    })
}