/** @docs https://discord.com/developers/docs/resources/guild#add-guild-member */
import { PUT, guildId, userId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PUT`api:/guilds/${guildId}/members/${userId}`;
export type Result = Discord.RESTPutAPIGuildMemberResult;
export type Body = Discord.RESTPutAPIGuildMemberJSONBody;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        access_token: true,
        deaf: true,
        mute: true,
        nick: true,
        roles: true
    })
}