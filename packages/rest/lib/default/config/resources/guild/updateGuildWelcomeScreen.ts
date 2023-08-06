/** @docs https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/welcome-screen`;
export type Result = Discord.RESTPatchAPIGuildWelcomeScreenResult;
export type Body = Discord.RESTPatchAPIGuildWelcomeScreenJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        description: true,
        enabled: true,
        welcome_channels: true
    });
}