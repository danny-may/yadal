/** @docs https://discord.com/developers/docs/resources/user#update-user-application-role-connection */
import { Discord, IHttpResponse, applicationId, jsonResponse, PUT, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PUT`api:/users/@me/applications/${applicationId}/role-connection`;
export type Result = Discord.RESTPutAPICurrentUserApplicationRoleConnectionResult;
export type Body = Discord.RESTPutAPICurrentUserApplicationRoleConnectionJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        metadata: true,
        platform_name: true,
        platform_username: true
    });
}