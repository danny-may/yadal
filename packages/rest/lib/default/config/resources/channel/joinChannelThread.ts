/** @docs https://discord.com/developers/docs/resources/channel#join-thread */
import { PUT, channelId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/thread-members/@me`;
export function read(response: IHttpResponse) {
    return noContent(response);
}

