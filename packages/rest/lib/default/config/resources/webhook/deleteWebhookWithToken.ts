/** @docs https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token */
import { IHttpResponse, auditLogReason, noContent, DELETE, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = DELETE`api:/webhooks/${webhookId}/${token}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}