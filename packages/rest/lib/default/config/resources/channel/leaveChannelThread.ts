/** @docs https://discord.com/developers/docs/resources/channel#leave-thread */
import { DELETE, channelId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/thread-members/@me`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
