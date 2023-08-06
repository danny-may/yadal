/** @docs https://discord.com/developers/docs/resources/guild#elete-guild-integration */
import { DELETE, guildId, Discord, IHttpResponse, jsonResponse, integrationId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = DELETE`api:/guilds/${guildId}/integrations/${integrationId}`;
export type Result = Discord.RESTDeleteAPIGuildIntegrationResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}