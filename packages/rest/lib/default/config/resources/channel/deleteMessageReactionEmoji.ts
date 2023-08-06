/** @docs https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji */
import { DELETE, channelId, messageId, emoji, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
