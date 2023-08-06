/** @docs https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient */
import { DELETE, channelId, userId, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/recipient/${userId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
