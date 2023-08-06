/** @docs https://discord.com/developers/docs/resources/sticker#create-guild-sticker */
import { Discord, IHttpResponse, jsonResponse, POST, guildId, DiscordFile, auditLogReason, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/stickers`;
export type Result = Discord.RESTPostAPIGuildStickerResult;
export type Body = Discord.RESTPostAPIGuildStickerFormDataBody & { file: DiscordFile; };
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        description: true,
        file: true,
        name: true,
        tags: true
    });
}