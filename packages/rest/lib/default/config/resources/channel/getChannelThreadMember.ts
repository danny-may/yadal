/** @docs https://discord.com/developers/docs/resources/channel#get-thread-member */
import { GET, channelId, userId, Discord, IHttpResponse, jsonResponse, queryParams, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/thread-members/${userId}`;
export type Result = Discord.RESTGetAPIChannelThreadMemberResult;
export type Query = Discord.RESTGetAPIChannelThreadMemberQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        with_member: true
    });
}
