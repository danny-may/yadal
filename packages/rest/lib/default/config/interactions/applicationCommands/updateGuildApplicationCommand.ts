/** @docs https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command */
import { PATCH, applicationId, guildId, commandId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
export type Result = Discord.RESTPatchAPIApplicationGuildCommandResult;
export type Body = Discord.RESTPatchAPIApplicationGuildCommandJSONBody;
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