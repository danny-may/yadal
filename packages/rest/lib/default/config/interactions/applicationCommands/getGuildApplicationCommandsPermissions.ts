/** @docs https://discord.com/developers/docs/interactions/application-commands#get-guild-application-command-permissions */
import { GET, applicationId, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
export type Result = Discord.RESTGetAPIGuildApplicationCommandsPermissionsResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}