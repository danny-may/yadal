/** @docs https://discord.com/developers/docs/resources/channel#trigger-typing-indicator */
import { PUT, channelId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/typing`;
export function read(response: IHttpResponse) {
    return noContent(response);
}