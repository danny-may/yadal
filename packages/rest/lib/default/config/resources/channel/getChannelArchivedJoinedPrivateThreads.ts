/** @docs https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads */
import { GET, channelId, Discord, IHttpResponse, jsonResponse, queryParams, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/users/@me/threads/archived/private`;
export type Result = Discord.RESTGetAPIChannelUsersThreadsArchivedResult;
export type Query = Discord.RESTGetAPIChannelThreadsArchivedQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        before: true,
        limit: true
    });
}