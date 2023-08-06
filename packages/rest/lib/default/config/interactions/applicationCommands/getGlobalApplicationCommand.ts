/** @docs https://discord.com/developers/docs/interactions/application-commands#get-global-application-command */
import { GET, applicationId, commandId, Discord, IHttpResponse, jsonResponse, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/applications/${applicationId}/commands/${commandId}`;
export type Result = Discord.RESTGetAPIApplicationCommandResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}