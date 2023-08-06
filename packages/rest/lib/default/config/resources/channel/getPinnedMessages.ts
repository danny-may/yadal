/** @docs https://discord.com/developers/docs/resources/channel#get-pinned-messages */
import { Discord, IHttpResponse, channelId, jsonResponse, GET, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/pins`;
export type Result = Discord.RESTGetAPIChannelPinsResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
