/** @docs https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/welcome-screen`;
export type Result = Discord.RESTGetAPIGuildWelcomeScreenResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}