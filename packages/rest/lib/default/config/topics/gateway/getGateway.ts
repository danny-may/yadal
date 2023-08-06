/** @docs https://discord.com/developers/docs/topics/gateway#get-gateway */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/gateway`;
export type Result = Discord.RESTGetAPIGatewayResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}