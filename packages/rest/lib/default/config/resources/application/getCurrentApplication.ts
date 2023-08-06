/** @docs https://discord.com/developers/docs/resources/application#get-current-application */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/applications/@me`
export type Result = Discord.RESTGetCurrentApplicationResult;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
