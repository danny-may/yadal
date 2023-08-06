/** @docs https://discord.com/developers/docs/resources/guild-template#get-guild-template */
import { Discord, IHttpResponse, code, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/guilds/templates/${code}`;
export type Result = Discord.APITemplate;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}