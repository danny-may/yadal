/** @docs https://discord.com/developers/docs/resources/channel#get-channel-invites */
import { Discord, IHttpResponse, channelId, jsonResponse, GET, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/invites`;
export type Result = Discord.RESTGetAPIChannelInvitesResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}