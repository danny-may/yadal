/** @docs https://discord.com/developers/docs/resources/voice#list-voice-regions */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/voice/regions`;
export type Result = Discord.RESTGetAPIVoiceRegionsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}