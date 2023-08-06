/** @docs https://discord.com/developers/docs/resources/guild#modify-user-voice-state */
import { PATCH, guildId, Discord, IHttpResponse, jsonResponse, requestBody, userId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/voice-states/${userId}`;
export type Result = Discord.RESTPatchAPIGuildVoiceStateUserResult;
export type Body = Discord.RESTPatchAPIGuildVoiceStateUserJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        suppress: true
    });
}