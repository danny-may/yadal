/** @docs https://discord.com/developers/docs/resources/webhook#get-channel-webhooks */
import { Discord, IHttpResponse, channelId, jsonResponse, GET, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = GET`api:/channels/${channelId}/webhooks`;
export type Result = Discord.RESTGetAPIChannelWebhooksResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}