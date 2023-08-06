/** @docs https://discord.com/developers/docs/resources/channel#get-thread-member */
import { GET, channelId, Discord, IHttpResponse, jsonResponse, queryParams, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/thread-members`;
export type Result = Discord.RESTGetAPIChannelThreadMembersResult;
export type Query = Discord.RESTGetAPIChannelThreadMembersQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        after: true,
        limit: true,
        with_member: true
    });
}
