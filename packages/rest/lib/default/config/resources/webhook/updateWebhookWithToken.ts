/** @docs https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token */
import { Discord, IHttpResponse, auditLogReason, jsonResponse, PATCH, requestBody, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = PATCH`api:/webhooks/${webhookId}/${token}`;
export type Result = Discord.RESTPatchAPIWebhookWithTokenResult;
export type Body = Discord.RESTPatchAPIWebhookWithTokenJSONBody;
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