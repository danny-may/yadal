/** @docs https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints */
import { GET, entityId, hash, staticImage, IHttpResponse, contentResponse, byRoute } from "../../util.js";

export const rateLimit = byRoute;
export const route = GET`cdn:/splashes/${entityId}/${hash}.${staticImage}`;
export function read(response: IHttpResponse) {
    return contentResponse(response);
}