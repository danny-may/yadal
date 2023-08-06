/** @docs https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance */
import { Discord, IHttpResponse, auditLogReason, channelId, jsonResponse, PATCH, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PATCH`api:/stage-instances/${channelId}`;
export type Result = Discord.RESTPatchAPIStageInstanceResult;
export type Body = Discord.RESTPatchAPIStageInstanceJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        privacy_level: true,
        topic: true
    })
}