/** @docs https://discord.com/developers/docs/interactions/application-commands#edit-global-application-command */
import { PATCH, applicationId, commandId, Discord, IHttpResponse, jsonResponse, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PATCH`api:/applications/${applicationId}/commands/${commandId}`;
export type Result = Discord.RESTPatchAPIApplicationCommandResult;
export type Body = Discord.RESTPatchAPIApplicationCommandJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        default_member_permissions: true,
        description: true,
        description_localizations: true,
        dm_permission: true,
        name: true,
        name_localizations: true,
        nsfw: true,
        options: true,
        type: true,
        default_permission: true
    });
}
