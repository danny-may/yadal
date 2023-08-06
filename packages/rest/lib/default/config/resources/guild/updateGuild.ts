/** @docs https://discord.com/developers/docs/resources/guild#modify-guild */
import { PATCH, guildId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}`;
export type Result = Discord.RESTPatchAPIGuildResult;
export type Body = Discord.RESTPatchAPIGuildJSONBody;
export const headers = auditLogReason;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        afk_channel_id: true,
        afk_timeout: true,
        banner: true,
        default_message_notifications: true,
        description: true,
        discovery_splash: true,
        explicit_content_filter: true,
        features: true,
        icon: true,
        name: true,
        owner_id: true,
        preferred_locale: true,
        premium_progress_bar_enabled: true,
        public_updates_channel_id: true,
        region: true,
        rules_channel_id: true,
        safety_alerts_channel_id: true,
        splash: true,
        system_channel_flags: true,
        system_channel_id: true,
        verification_level: true
    })
}