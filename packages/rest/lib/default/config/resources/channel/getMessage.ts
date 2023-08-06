/** @docs https://discord.com/developers/docs/resources/channel#get-channel-message */
import { GET, channelId, messageId, Discord, IHttpResponse, jsonResponse, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/messages/${messageId}`;
export type Result = Discord.RESTGetAPIChannelMessageResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
