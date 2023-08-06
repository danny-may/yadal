/** @docs https://discord.com/developers/docs/resources/invite#delete-invite */
import { Discord, IHttpResponse, auditLogReason, code, jsonResponse, DELETE, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = DELETE`api:/invites/${code}`;
export type Result = Discord.RESTDeleteAPIInviteResult;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}