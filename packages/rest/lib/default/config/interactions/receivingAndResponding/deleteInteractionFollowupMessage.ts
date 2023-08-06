/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message */
import { DELETE, webhookId, token, messageId, IHttpResponse, noContent, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = DELETE`/webhooks/${webhookId}/${token}/messages/${messageId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
