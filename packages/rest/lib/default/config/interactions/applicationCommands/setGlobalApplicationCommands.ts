/** @docs https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands */
import { PUT, applicationId, Discord, IHttpResponse, jsonResponse, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PUT`api:/applications/${applicationId}/commands`;
export type Result = Discord.RESTPutAPIApplicationCommandsResult;
export type Body = Discord.RESTPutAPIApplicationCommandsJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: { commands: Body; }) {
    return requestBody(model, 'commands');
}
