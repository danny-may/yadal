/** @docs https://discord.com/developers/docs/resources/webhook#get-webhook */
import { Discord, IHttpResponse, jsonResponse, GET, webhookId, byWebhookId } from "../../../util.js";

export const rateLimit = byWebhookId;
export const route = GET`api:/webhooks/${webhookId}`;
export type Result = Discord.RESTGetAPIWebhookResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}