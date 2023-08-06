/** @docs https://discord.com/developers/docs/resources/channel#deleteclose-channel */
import { DELETE, channelId, Discord, auditLogReason, IHttpResponse, jsonResponse, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = DELETE`api:/channels/${channelId}`;
export type Result = Discord.RESTDeleteAPIChannelResult;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
