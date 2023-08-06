/** @docs https://discord.com/developers/docs/resources/channel#follow-announcement-channel */
import { Discord, IHttpResponse, channelId, jsonResponse, POST, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/followers`;
export type Result = Discord.RESTPostAPIChannelFollowersResult;
export type Body = Discord.RESTPostAPIChannelFollowersJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        webhook_channel_id: true
    });
}
