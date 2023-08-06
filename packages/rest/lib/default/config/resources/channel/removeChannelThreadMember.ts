/** @docs https://discord.com/developers/docs/resources/channel#remove-thread-member */
import { DELETE, channelId, userId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/thread-members/${userId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
