/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message */
import { POST, webhookId, token, Discord, DiscordFiles, IHttpResponse, jsonResponse, requestBody, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = POST`/webhooks/${webhookId}/${token}`;
export type Result = Discord.RESTPostAPIInteractionFollowupResult;
export type Body = Discord.RESTPostAPIInteractionFollowupJSONBody & DiscordFiles;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        allowed_mentions: true,
        attachments: true,
        components: true,
        content: true,
        embeds: true,
        flags: true,
        thread_name: true,
        tts: true
    });
}
