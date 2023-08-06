/** @docs https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event */
import { IHttpResponse, eventId, guildId, noContent, DELETE, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/scheduled-events/${eventId}`;
export function read(value: IHttpResponse) {
    return noContent(value);
}