/** @docs https://discord.com/developers/docs/resources/channel#bulk-delete-messages */
import { POST, channelId, Discord, auditLogReason, IHttpResponse, noContent, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/messages/bulk-delete`;
export type Body = Discord.RESTPostAPIChannelMessagesBulkDeleteJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}
export function body(model: Body) {
    return requestBody(model, {
        messages: true
    });
}
