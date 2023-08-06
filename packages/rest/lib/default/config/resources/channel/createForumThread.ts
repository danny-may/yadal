/** @docs https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel */
import { POST, channelId, Discord, auditLogReason, IHttpResponse, jsonResponse, requestBody, DiscordFile, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = POST`api:/channels/${channelId}/threads`;
export type Result = Discord.RESTPostAPIChannelThreadsResult;
export type Body = RESTPostAPIGuildForumThreadsFormDataBody;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return jsonResponse<Result>(response);
}
export function body(model: Body) {
    return requestBody(model, {
        auto_archive_duration: true,
        name: true,
        rate_limit_per_user: true,
        applied_tags: true,
        message: true
    });
}

export interface RESTPostAPIGuildForumThreadsFormDataBody extends Discord.RESTPostAPIChannelMessagesThreadsJSONBody {
    applied_tags?: Discord.Snowflake[];
    message: Pick<Discord.RESTPostAPIChannelMessageJSONBody, 'content' | 'embeds' | 'allowed_mentions' | 'components' | 'sticker_ids' | 'attachments' | 'flags'>;
    [key: `files[${bigint}]`]: DiscordFile;
}
