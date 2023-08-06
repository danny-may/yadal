/** @docs https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response */
import { POST, webhookId, token, Discord, IHttpResponse, noContent, requestBody, DiscordFiles, byWebhookToken } from "../../../util.js";

export const rateLimit = { ...byWebhookToken, global: false };
export const route = POST`/interactions/${webhookId}/${token}/callback`;
export type Body = Discord.RESTPostAPIInteractionCallbackJSONBody & DiscordFiles;
export function read(response: IHttpResponse) {
    return noContent(response);
}
export function body(model: Body) {
    return requestBody(model, {
        data: true,
        type: true,
    });
}
