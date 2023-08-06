/** @docs https://discord.com/developers/docs/resources/user#leave-guild */
import { Discord, IHttpResponse, guildId, noContent, DELETE, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/users/@me/guilds/${guildId}`;
export type Result = Discord.RESTGetAPICurrentUserResult;
export function read(value: IHttpResponse) {
    return noContent(value);
}