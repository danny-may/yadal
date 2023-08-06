/** @docs https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance */
import { IHttpResponse, auditLogReason, channelId, noContent, DELETE, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = DELETE`api:/stage-instances/${channelId}`;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return noContent(value);
}