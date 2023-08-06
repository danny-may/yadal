/** @docs https://discord.com/developers/docs/resources/channel#start-thread-without-message */
import { POST, channelId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/threads`;
export type Result = Discord.RESTPostAPIChannelThreadsResult;
export type Body = Discord.RESTPostAPIChannelThreadsJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        auto_archive_duration: true,
        invitable: true,
        name: true,
        rate_limit_per_user: true,
        type: true
    });
}