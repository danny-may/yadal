/** @docs https://discord.com/developers/docs/resources/guild-template#sync-guild-template */
import { Discord, IHttpResponse, code, guildId, jsonResponse, PUT, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/guilds/${guildId}/templates/${code}`;
export type Result = Discord.RESTPutAPIGuildTemplateSyncResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}