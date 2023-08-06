/** @docs https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands */
import { PUT, applicationId, guildId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/applications/${applicationId}/guilds/${guildId}/commands`;
export type Result = Discord.RESTPutAPIApplicationGuildCommandsResult;
export type Body = Discord.RESTPutAPIApplicationGuildCommandsJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: { commands: Body; }) {
    return requestBody(model, 'commands');
}