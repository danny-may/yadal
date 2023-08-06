/** @docs https://discord.com/developers/docs/interactions/application-commands#create-global-application-command */
import { POST, applicationId, Discord, IHttpResponse, jsonResponse, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/applications/${applicationId}/commands`;
export type Result = Discord.RESTPostAPIApplicationCommandsResult;
export type Body = Discord.RESTPostAPIApplicationCommandsJSONBody;
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
