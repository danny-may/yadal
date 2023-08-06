/** @docs https://discord.com/developers/docs/resources/channel#delete-user-reaction */
import { DELETE, channelId, messageId, emoji, userId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
