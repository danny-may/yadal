/** @docs https://discord.com/developers/docs/resources/channel#modify-channel */
import { PATCH, channelId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PATCH`api:/channels/${channelId}`;
export type Result = Discord.RESTPatchAPIChannelResult;
export type Body = Discord.RESTPatchAPIChannelJSONBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        archived: true,
        auto_archive_duration: true,
        available_tags: true,
        bitrate: true,
        default_auto_archive_duration: true,
        default_forum_layout: true,
        default_reaction_emoji: true,
        default_sort_order: true,
        default_thread_rate_limit_per_user: true,
        invitable: true,
        locked: true,
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
    });
}
