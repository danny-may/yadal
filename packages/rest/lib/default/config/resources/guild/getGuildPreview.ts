/** @docs https://discord.com/developers/docs/resources/guild#get-guild-preview */
import { GET, guildId, Discord, IHttpResponse, jsonResponse, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/preview`;
export type Result = Discord.RESTGetAPIGuildPreviewResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
