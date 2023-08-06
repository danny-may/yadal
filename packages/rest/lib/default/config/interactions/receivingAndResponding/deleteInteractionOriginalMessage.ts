/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response */
import { DELETE, webhookId, token, IHttpResponse, noContent, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = DELETE`/webhooks/${webhookId}/${token}/messages/@original`;
export function read(response: IHttpResponse) {
    return noContent(response);
}
