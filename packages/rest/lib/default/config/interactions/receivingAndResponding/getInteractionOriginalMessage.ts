/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response */
import { GET, webhookId, token, Discord, IHttpResponse, jsonResponse, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = GET`/webhooks/${webhookId}/${token}/messages/@original`;
export type Result = Discord.RESTGetAPIInteractionOriginalResponseResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
