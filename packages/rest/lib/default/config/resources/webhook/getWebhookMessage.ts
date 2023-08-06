/** @docs https://discord.com/developers/docs/resources/webhook#get-webhook-message */
import { Discord, IHttpResponse, jsonResponse, messageId, queryParams, GET, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = GET`api:/webhooks/${webhookId}/${token}/messages/${messageId}`;
export type Result = Discord.RESTGetAPIWebhookWithTokenMessageResult;
export type Query = Discord.RESTGetAPIWebhookWithTokenMessageQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        thread_id: true
    })
}