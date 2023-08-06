/** @docs https://discord.com/developers/docs/resources/guild#create-guild */
import { POST, Discord, IHttpResponse, jsonResponse, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/guilds`;
export type Result = Discord.RESTPostAPIGuildsResult;
export type Body = Discord.RESTPostAPIGuildsJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        afk_channel_id: true,
        afk_timeout: true,
        channels: true,
        default_message_notifications: true,
        explicit_content_filter: true,
        icon: true,
        name: true,
        premium_progress_bar_enabled: true,
        region: true,
        roles: true,
        system_channel_flags: true,
        system_channel_id: true,
        verification_level: true
    })
}