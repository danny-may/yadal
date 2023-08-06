/** @docs https://discord.com/developers/docs/resources/channel#unpin-message */
import { auditLogReason, channelId, IHttpResponse, messageId, noContent, DELETE, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/pins/${messageId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}

