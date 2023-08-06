/** @docs https://discord.com/developers/docs/resources/user#get-user */
import { Discord, IHttpResponse, jsonResponse, GET, userId, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/users/${userId}`;
export type Result = Discord.RESTGetAPIUserResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}