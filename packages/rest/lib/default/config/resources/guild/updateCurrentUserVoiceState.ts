/** @docs https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state */
import { PATCH, guildId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/voice-states/@me`;
export type Result = Discord.RESTPatchAPIGuildVoiceStateCurrentMemberResult;
export type Body = Discord.RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        channel_id: true,
        request_to_speak_timestamp: true,
        suppress: true
    });
}