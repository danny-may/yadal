/** @docs https://discord.com/developers/docs/resources/user#modify-current-user */
import { byRoute, Discord, IHttpResponse, jsonResponse, PATCH, requestBody } from "../../../util.js";

export const rateLimit = byRoute;
export const route = PATCH`api:/users/@me`;
export type Result = Discord.RESTPatchAPICurrentUserResult;
export type Body = Discord.RESTPatchAPICurrentUserJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        avatar: true,
        username: true
    })
}