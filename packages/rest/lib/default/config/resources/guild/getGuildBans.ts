/** @docs https://discord.com/developers/docs/resources/guild#get-guild-bans */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/bans`;
export type Result = Discord.RESTGetAPIGuildBansResult;
export type Query = Discord.RESTGetAPIGuildBansQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        limit: true,
        before: true,
        after: true
    })
}