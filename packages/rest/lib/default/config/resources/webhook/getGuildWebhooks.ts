/** @docs https://discord.com/developers/docs/resources/webhook#get-guild-webhooks */
import { Discord, IHttpResponse, guildId, jsonResponse, GET, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/webhooks`;
export type Result = Discord.RESTGetAPIGuildWebhooksResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}