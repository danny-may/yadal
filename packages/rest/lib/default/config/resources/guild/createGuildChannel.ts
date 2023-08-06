/** @docs https://discord.com/developers/docs/resources/guild#create-guild-channel */
import { POST, guildId, Discord, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/channels`;
export type Result = Discord.RESTPostAPIGuildChannelResult;
export type Body = Discord.RESTPostAPIGuildChannelJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        available_tags: true,
        bitrate: true,
        default_auto_archive_duration: true,
        default_forum_layout: true,
        default_reaction_emoji: true,
        default_sort_order: true,
        default_thread_rate_limit_per_user: true,
        flags: true,
        name: true,
        nsfw: true,
        parent_id: true,
        permission_overwrites: true,
        position: true,
        rate_limit_per_user: true,
        rtc_region: true,
        topic: true,
        type: true,
        user_limit: true,
        video_quality_mode: true
    })
}
