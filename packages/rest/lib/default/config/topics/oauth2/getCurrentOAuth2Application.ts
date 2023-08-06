/** @docs https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/oauth2/applications/@me`;
export type Result = Discord.RESTGetAPIOAuth2CurrentApplicationResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}