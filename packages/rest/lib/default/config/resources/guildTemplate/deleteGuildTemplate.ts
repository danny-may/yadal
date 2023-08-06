/** @docs https://discord.com/developers/docs/resources/guild-template#delete-guild-template */
import { Discord, IHttpResponse, code, guildId, jsonResponse, DELETE, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/templates/${code}`;
export type Result = Discord.APITemplate;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}