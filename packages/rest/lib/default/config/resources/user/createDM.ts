/** @docs https://discord.com/developers/docs/resources/user#create-dm */
import { byRoute, Discord, IHttpResponse, jsonResponse, POST, requestBody } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/users/@me/channels`;
export type Result = Discord.APIDMChannel;
export type Body = Discord.RESTPostAPICurrentUserCreateDMChannelJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        recipient_id: true
    });
}