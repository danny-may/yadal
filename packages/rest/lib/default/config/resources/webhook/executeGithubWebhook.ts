/** @docs https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook */
import { Discord, IHttpContent, IHttpResponse, jsonResponse, queryParams, POST, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = POST`api:/webhooks/${webhookId}/${token}/github`;
export type Result = Discord.RESTPostAPIWebhookWithTokenGitHubWaitResult | undefined;
export type Query = Discord.RESTPostAPIWebhookWithTokenGitHubQuery;
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