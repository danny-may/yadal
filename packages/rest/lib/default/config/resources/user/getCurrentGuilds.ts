/** @docs https://discord.com/developers/docs/resources/user#get-current-user-guilds */
import { Discord, IHttpResponse, jsonResponse, queryParams, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/users/@me/guilds`;
export type Result = Discord.RESTGetAPICurrentUserGuildsResult;
export type Query = Discord.RESTGetAPICurrentUserGuildsQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        after: true,
        before: true,
        limit: true,
        with_counts: true
    })
}