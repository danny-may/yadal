/** @docs https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions */
import { GET, applicationId, guildId, commandId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
export type Result = Discord.RESTGetAPIApplicationCommandPermissionsResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}