/** @docs https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records */
import { PUT, applicationId, Discord, IHttpResponse, jsonResponse, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PUT`api:/applications/${applicationId}/role-connections/metadata`;
export type Result = Discord.RESTPutAPIApplicationRoleConnectionMetadataResult;
export type Body = Discord.RESTPutAPIApplicationRoleConnectionMetadataJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: { metadata: Body; }) {
    return requestBody(model, 'metadata');
}