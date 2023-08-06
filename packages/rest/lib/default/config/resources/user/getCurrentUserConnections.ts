/** @docs https://discord.com/developers/docs/resources/user#get-user-connections */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/users/@me/connections`;
export type Result = Discord.RESTGetAPICurrentUserConnectionsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}