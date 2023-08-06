/** @docs https://discord.com/developers/docs/resources/channel#get-channel */
import { GET, channelId, Discord, IHttpResponse, jsonResponse, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}`;
export type Result = Discord.RESTGetAPIChannelResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
