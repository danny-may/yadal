/** @docs https://discord.com/developers/docs/interactions/application-commands#get-guild-application-commands */
import { GET, applicationId, guildId, Discord, IHttpResponse, jsonResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/applications/${applicationId}/guilds/${guildId}/commands`;
export type Result = Discord.RESTGetAPIApplicationGuildCommandsResult;
export type Query = Discord.RESTGetAPIApplicationGuildCommandsQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        with_localizations: true
    });
}