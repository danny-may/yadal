/** @docs https://discord.com/developers/docs/resources/channel#delete-own-reaction */
import { DELETE, channelId, messageId, emoji, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
