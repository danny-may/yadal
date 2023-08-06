/** @docs https://discord.com/developers/docs/resources/webhook#delete-webhook */
import { IHttpResponse, auditLogReason, noContent, DELETE, webhookId, byWebhookId } from "../../../util.js";

export const rateLimit = byWebhookId;
export const route = DELETE`api:/webhooks/${webhookId}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}