/** @docs https://discord.com/developers/docs/resources/channel#delete-all-reactions */
import { DELETE, channelId, messageId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/messages/${messageId}/reactions`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
