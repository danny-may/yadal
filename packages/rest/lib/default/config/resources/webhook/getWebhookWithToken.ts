/** @docs https://discord.com/developers/docs/resources/webhook#get-webhook-with-token */
import { Discord, IHttpResponse, jsonResponse, GET, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = GET`api:/webhooks/${webhookId}/${token}`;
export type Result = Discord.RESTGetAPIWebhookWithTokenResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}