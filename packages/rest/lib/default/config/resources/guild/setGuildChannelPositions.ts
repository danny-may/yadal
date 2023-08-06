/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions */
import { PATCH, guildId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/channels`;
export type Result = Discord.RESTPatchAPIGuildChannelPositionsResult;
export type Body = { channels: Discord.RESTPatchAPIGuildChannelPositionsJSONBody };
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, 'channels')
}
