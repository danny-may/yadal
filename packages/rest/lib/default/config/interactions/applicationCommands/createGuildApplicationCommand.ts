/** @docs https://discord.com/developers/docs/interactions/application-commands#create-guild-application-command */
import { POST, applicationId, guildId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/applications/${applicationId}/guilds/${guildId}/commands`;
export type Result = Discord.RESTPostAPIApplicationGuildCommandsResult;
export type Body = Discord.RESTPostAPIApplicationGuildCommandsJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        default_member_permissions: true,
        default_permission: true,
        description: true,
        description_localizations: true,
        name: true,
        name_localizations: true,
        nsfw: true,
        options: true,
        type: true
    });
}