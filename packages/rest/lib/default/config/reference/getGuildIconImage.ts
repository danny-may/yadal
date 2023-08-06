/** @docs https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints */
import { GET, entityId, hash, animatableImage, IHttpResponse, contentResponse, byRoute } from "../../util.js";

export const rateLimit = byRoute;
export const route = GET`cdn:/icons/${entityId}/${hash}.${animatableImage}`;
export function read(response: IHttpResponse) {
    return contentResponse(response);
}
