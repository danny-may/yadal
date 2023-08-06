/** @docs https://discord.com/developers/docs/resources/channel#create-message */
import { POST, channelId, Discord, DiscordFiles, IHttpResponse, jsonResponse, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/messages`;
export type Result = Discord.RESTPostAPIChannelMessageResult;
export type Body = Discord.RESTPostAPIChannelMessageJSONBody & DiscordFiles;
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
        message_reference: true,
        nonce: true,
        sticker_ids: true,
        tts: true
    });
}
