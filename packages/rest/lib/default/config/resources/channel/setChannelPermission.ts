/** @docs https://discord.com/developers/docs/resources/channel#edit-channel-permissions */
import { Discord, auditLogReason, IHttpResponse, noContent, requestBody, channelId, permissionId, PUT, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/permissions/${permissionId}`;
export type Body = Discord.RESTPutAPIChannelPermissionJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}
export function body(model: Body) {
    return requestBody(model, {
        allow: true,
        deny: true,
        type: true
    });
}
