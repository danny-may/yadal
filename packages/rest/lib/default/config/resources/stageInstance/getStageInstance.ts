/** @docs https://discord.com/developers/docs/resources/stage-instance#get-stage-instance */
import { Discord, IHttpResponse, channelId, jsonResponse, POST, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/stage-instances/${channelId}`;
export type Result = Discord.RESTGetAPIStageInstanceResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}