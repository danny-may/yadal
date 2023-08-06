/** @docs https://discord.com/developers/docs/resources/user#get-user-application-role-connection */
import { Discord, IHttpResponse, applicationId, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/users/@me/applications/${applicationId}/role-connection`;
export type Result = Discord.RESTGetAPICurrentUserApplicationRoleConnectionResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}