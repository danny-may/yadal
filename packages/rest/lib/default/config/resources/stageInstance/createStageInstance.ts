/** @docs https://discord.com/developers/docs/resources/stage-instance#create-stage-instance */
import { Discord, IHttpResponse, auditLogReason, jsonResponse, POST, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/stage-instances`;
export type Result = Discord.RESTPostAPIStageInstanceResult;
export type Body = Discord.RESTPostAPIStageInstanceJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        privacy_level: true,
        send_start_notification: true,
        topic: true
    })
}