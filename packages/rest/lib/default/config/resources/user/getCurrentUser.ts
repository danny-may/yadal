/** @docs https://discord.com/developers/docs/resources/user#get-current-user */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/users/@me`;
export type Result = Discord.RESTGetAPICurrentUserResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}