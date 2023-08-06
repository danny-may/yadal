/** @docs https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/gateway/bot`;
export type Result = Discord.RESTGetAPIGatewayBotResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}