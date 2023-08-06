/** @docs https://discord.com/developers/docs/resources/channel#crosspost-message */
import { POST, channelId, messageId, Discord, IHttpResponse, jsonResponse, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/messages/${messageId}/crosspost`;
export type Result = Discord.RESTPostAPIChannelMessageCrosspostResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}