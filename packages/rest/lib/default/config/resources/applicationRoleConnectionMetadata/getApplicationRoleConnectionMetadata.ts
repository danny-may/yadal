/** @docs https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records */
import { GET, applicationId, Discord, IHttpResponse, jsonResponse, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/applications/${applicationId}/role-connections/metadata`;
export type Result = Discord.RESTGetAPIApplicationRoleConnectionMetadataResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
