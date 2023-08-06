/** @docs https://discord.com/developers/docs/resources/channel#get-channel-messages */
import { GET, channelId, Discord, IHttpResponse, jsonResponse, queryParams, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/messages`;
export type Result = Discord.RESTGetAPIChannelMessagesResult;
export type Query = Discord.RESTGetAPIChannelMessagesQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        after: true,
        around: true,
        before: true,
        limit: true
    });
}
