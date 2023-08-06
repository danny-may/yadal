/** @docs https://discord.com/developers/docs/resources/sticker#list-nitro-sticker-packs */
import { Discord, IHttpResponse, jsonResponse, GET, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = GET`api:/sticker-packs`;
export type Result = Discord.RESTGetNitroStickerPacksResult;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}