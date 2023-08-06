/** @docs https://discord.com/developers/docs/resources/channel#pin-message */
import { PUT, channelId, messageId, auditLogReason, IHttpResponse, noContent, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/pins/${messageId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}

