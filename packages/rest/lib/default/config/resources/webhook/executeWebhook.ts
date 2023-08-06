/** @docs https://discord.com/developers/docs/resources/webhook#execute-webhook */
import { Discord, DiscordFiles, IHttpResponse, jsonResponse, queryParams, POST, requestBody, token, webhookId, byWebhookToken } from "../../../util.js";

export const rateLimit = byWebhookToken;
export const route = POST`api:/webhooks/${webhookId}/${token}`;
export type Result = Discord.RESTPostAPIWebhookWithTokenWaitResult | undefined;
export type Query = Discord.RESTPostAPIWebhookWithTokenQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        allowed_mentions: true,
        attachments: true,
        avatar_url: true,
        components: true,
        content: true,
        embeds: true,
        flags: true,
        thread_name: true,
        tts: true,
        username: true
    });
}
export function query(model: Query) {
    return queryParams(model, {
        thread_id: true,
        wait: true
    });
}
export interface Body extends Discord.RESTPostAPIWebhookWithTokenJSONBody, DiscordFiles {

}