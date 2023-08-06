/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message */
import { PATCH, webhookId, token, messageId, Discord, DiscordFiles, IHttpResponse, jsonResponse, requestBody, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = PATCH`/webhooks/${webhookId}/${token}/messages/${messageId}`;
export type Result = Discord.RESTPatchAPIInteractionFollowupResult;
export type Body = Discord.RESTPatchAPIWebhookWithTokenMessageJSONBody & DiscordFiles;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        allowed_mentions: true,
        attachments: true,
        components: true,
        content: true,
        embeds: true
    });
}
