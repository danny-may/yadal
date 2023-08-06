/** @docs https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
import { PUT, applicationId, guildId, commandId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
export type Result = Discord.RESTPutAPIApplicationCommandPermissionsResult;
export type Body = Discord.RESTPutAPIApplicationCommandPermissionsJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        permissions: true
    });
}