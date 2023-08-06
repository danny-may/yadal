/** @docs https://discord.com/developers/docs/resources/webhook#modify-webhook */
import { Discord, IHttpResponse, auditLogReason, jsonResponse, PATCH, requestBody, webhookId, byWebhookId } from "../../../util.js";

export const rateLimit = byWebhookId;
export const route = PATCH`api:/webhooks/${webhookId}`;
export type Result = Discord.RESTPatchAPIWebhookResult;
export type Body = Discord.RESTPatchAPIWebhookJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        avatar: true,
        channel_id: true,
        name: true
    });
}