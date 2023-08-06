/** @docs https://discord.com/developers/docs/resources/guild#get-guild-voice-regions */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/regions`;
export type Result = Discord.RESTGetAPIGuildVoiceRegionsResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}