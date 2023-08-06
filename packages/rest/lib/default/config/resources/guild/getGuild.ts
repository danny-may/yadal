/** @docs https://discord.com/developers/docs/resources/guild#get-guild */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}`;
export type Result = Discord.RESTGetAPIGuildResult;
export type Query = Discord.RESTGetAPIGuildQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        with_counts: true
    })
}