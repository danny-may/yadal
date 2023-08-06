/** @docs https://discord.com/developers/docs/resources/invite#get-invite */
import { Discord, IHttpResponse, code, jsonResponse, queryParams, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/invites/${code}`;
export type Result = Discord.RESTGetAPIInviteResult;
export type Query = Discord.RESTGetAPIInviteQuery;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function query(model: Query) {
    return queryParams(model, {
        guild_scheduled_event_id: true,
        with_counts: true,
        with_expiration: true
    })
}