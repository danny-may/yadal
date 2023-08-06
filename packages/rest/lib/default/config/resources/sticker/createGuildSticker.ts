/** @docs https://discord.com/developers/docs/resources/sticker#modify-guild-sticker */
import { Discord, IHttpResponse, jsonResponse, PATCH, guildId, auditLogReason, requestBody, stickerId, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/stickers/${stickerId}`;
export type Result = Discord.RESTPatchAPIGuildStickerResult;
export type Body = Discord.RESTPatchAPIGuildStickerJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        description: true,
        name: true,
        tags: true
    });
}