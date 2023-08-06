/** @docs https://discord.com/developers/docs/resources/sticker#delete-guild-sticker */
import { IHttpResponse, DELETE, guildId, stickerId, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/stickers/${stickerId}`;
export function read(value: IHttpResponse) {
    return noContent(value);
}