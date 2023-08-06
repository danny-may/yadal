/** @docs https://discord.com/developers/docs/resources/channel#add-thread-member */
import { PUT, channelId, userId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/thread-members/${userId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}

