/** @docs https://discord.com/developers/docs/reference#image-formatting-cdn-endpoints */
import { GET, IHttpResponse, contentResponse, num, byRoute } from "../../util.js";

export const rateLimit = byRoute;
export const route = GET`cdn:/embed/avatars/${num('index')}.png`;
export function read(response: IHttpResponse) {
    return contentResponse(response);
}