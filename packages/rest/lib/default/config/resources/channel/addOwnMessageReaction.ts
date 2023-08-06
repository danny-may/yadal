/** @docs https://discord.com/developers/docs/resources/channel#create-reaction */
import { PUT, channelId, messageId, emoji, Discord, IHttpResponse, jsonResponse, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
export type Result = Discord.RESTGetAPIChannelMessageResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
