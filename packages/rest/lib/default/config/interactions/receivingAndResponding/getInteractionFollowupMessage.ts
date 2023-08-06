/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message */
import { Discord, IHttpResponse, jsonResponse, messageId, GET, token, webhookId, byWebhookToken } from '../../../util.js';

export const rateLimit = { ...byWebhookToken, global: false };
export const route = GET`/webhooks/${webhookId}/${token}/messages/${messageId}`;
export type Result = Discord.RESTGetAPIInteractionFollowupResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
