/** @docs https://discord.com/developers/docs/resources/channel#delete-channel-permission */
import { auditLogReason, channelId, IHttpResponse, noContent, permissionId, DELETE, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}/permissions/${permissionId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}
