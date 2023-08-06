/** @docs https://discord.com/developers/docs/resources/guild#search-guild-members */

import { GET, guildId, Discord, IHttpResponse, jsonResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/members/search`;
export type Result = Discord.RESTGetAPIGuildMembersSearchResult;
export type Query = Discord.RESTGetAPIGuildMembersSearchQuery;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function query(model: Query) {
    return queryParams(model, {
        limit: true,
        query: true
    })
}
