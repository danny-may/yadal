/** @docs https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook */
import { Discord, IHttpContent, IHttpResponse, jsonResponse, queryParams, POST, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = POST`api:/webhooks/${webhookId}/${token}/slack`;
export type Result = Discord.RESTPostAPIWebhookWithTokenSlackWaitResult | undefined;
export type Query = Discord.RESTPostAPIWebhookWithTokenSlackQuery;
export type Body = IHttpContent;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return model;
}
export function query(model: Query) {
    return queryParams(model, {
        thread_id: true,
        wait: true
    });
}