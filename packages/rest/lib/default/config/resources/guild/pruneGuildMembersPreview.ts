/** @docs https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/prune`;
export type Result = Discord.RESTGetAPIGuildPruneCountResult;
export type Query = Discord.RESTGetAPIGuildPruneCountQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        days: true,
        include_roles: true
    })
}