/** @docs https://discord.com/developers/docs/resources/guild#get-guild-widget-image */
import { GET, guildId, Discord, IHttpResponse, contentResponse, queryParams, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = GET`api:/guilds/${guildId}/widget.png`;
export type Query = Discord.RESTGetAPIGuildWidgetImageQuery;
export function read(value: IHttpResponse) {
    return contentResponse(value);
}
export function query(model: Query) {
    return queryParams(model, {
        style: true
    })
}