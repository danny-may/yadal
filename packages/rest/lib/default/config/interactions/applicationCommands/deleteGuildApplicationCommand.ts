/** @docs https://discord.com/developers/docs/interactions/application-commands#delete-guild-application-command */
import { DELETE, applicationId, guildId, commandId, IHttpResponse, noContent, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}