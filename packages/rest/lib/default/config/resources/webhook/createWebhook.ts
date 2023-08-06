/** @docs https://discord.com/developers/docs/resources/webhook#create-webhook */
import { Discord, IHttpResponse, auditLogReason, channelId, jsonResponse, POST, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/webhooks`;
export type Result = Discord.RESTPostAPIChannelWebhookResult;
export type Body = Discord.RESTPostAPIChannelWebhookJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        avatar: true,
        name: true
    });
}