/** @docs https://discord.com/developers/docs/resources/channel#edit-message */
import { PATCH, channelId, messageId, Discord, DiscordFiles, IHttpResponse, jsonResponse, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PATCH`api:/channels/${channelId}/messages/${messageId}`;
export type Result = Discord.RESTPatchAPIChannelMessageResult;
export type Body = Discord.RESTPatchAPIChannelMessageJSONBody & DiscordFiles;
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
        flags: true
    });
}
