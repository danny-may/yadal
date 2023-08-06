/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response */
import { PATCH, webhookId, token, Discord, DiscordFiles, IHttpResponse, jsonResponse, requestBody, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = PATCH`/webhooks/${webhookId}/${token}/messages/@original`;
export type Result = Discord.RESTPatchAPIInteractionOriginalResponseResult;
export type Body = Discord.RESTPatchAPIInteractionOriginalResponseJSONBody & DiscordFiles;
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
