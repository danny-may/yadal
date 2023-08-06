/** @docs https://discord.com/developers/docs/resources/webhook#delete-webhook-message */
import { IHttpResponse, messageId, noContent, queryParams, DELETE, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = DELETE`api:/webhooks/${webhookId}/${token}/messages/${messageId}`;
export function read(value: IHttpResponse) {
    return noContent(value);
}
export function query(model: Query) {
    return queryParams(model, {
        thread_id: true
    });
}
export interface Query {
    readonly thread_id?: string;
}