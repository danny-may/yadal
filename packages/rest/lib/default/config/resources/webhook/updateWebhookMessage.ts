/** @docs https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
import { Discord, DiscordFiles, IHttpResponse, jsonResponse, messageId, queryParams, PATCH, requestBody, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = PATCH`api:/webhooks/${webhookId}/${token}/messages/${messageId}`;
export type Result = Discord.RESTPatchAPIWebhookWithTokenMessageResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        allowed_mentions: true,
        attachments: true,
        components: true,
        content: true,
        embeds: true
    })
}
export function query(model: Query) {
    return queryParams(model, {
        thread_id: true
    });
}
export interface Body extends Discord.RESTPatchAPIWebhookWithTokenMessageJSONBody, DiscordFiles {

}
export interface Query {
    readonly thread_id?: string;
}