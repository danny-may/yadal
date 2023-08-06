/** @docs https://discord.com/developers/docs/resources/channel#create-channel-invite */
import { Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, POST, channelId, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/invites`;
export type Result = Discord.RESTPostAPIChannelInviteResult;
export type Body = Discord.RESTPostAPIChannelInviteJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        max_age: true,
        max_uses: true,
        target_application_id: true,
        target_type: true,
        target_user_id: true,
        temporary: true,
        unique: true
    });
}
