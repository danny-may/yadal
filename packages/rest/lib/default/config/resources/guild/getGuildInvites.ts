/** @docs https://discord.com/developers/docs/resources/guild#get-guild-invites */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/invites`;
export type Result = Discord.RESTGetAPIGuildInvitesResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}