/** @docs https://discord.com/developers/docs/resources/sticker#get-sticker */
import { Discord, IHttpResponse, stickerId, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/stickers/${stickerId}`;
export type Result = Discord.RESTGetAPIGuildStickerResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}