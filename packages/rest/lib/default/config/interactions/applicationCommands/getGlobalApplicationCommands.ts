/** @docs https://discord.com/developers/docs/interactions/application-commands#get-global-application-commands */
import { GET, applicationId, Discord, IHttpResponse, jsonResponse, queryParams, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/applications/${applicationId}/commands`;
export type Result = Discord.RESTGetAPIApplicationCommandsResult;
export type Query = Discord.RESTGetAPIApplicationCommandsQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        with_localizations: true
    });
}