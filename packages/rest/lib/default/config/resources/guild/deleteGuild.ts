/** @docs https://discord.com/developers/docs/resources/guild#delete-guild */
import { byGuildId, DELETE, guildId, IHttpResponse, noContent } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}`;
export function read(value: IHttpResponse) {
    return noContent(value);
}
