/** @docs https://discord.com/developers/docs/resources/channel#get-reactions */
import { GET, channelId, messageId, Discord, IHttpResponse, jsonResponse, queryParams, emoji, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
export type Result = Discord.RESTGetAPIChannelMessageReactionUsersResult;
export type Query = Discord.RESTGetAPIChannelMessageReactionUsersQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        after: true,
        limit: true
    });
}