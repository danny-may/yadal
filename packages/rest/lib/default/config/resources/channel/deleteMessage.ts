/** @docs https://discord.com/developers/docs/resources/channel#delete-message */
import { snowflake } from "@yadal/core";
import { DELETE, channelId, messageId, auditLogReason, IHttpResponse, noContent } from "../../../util.js";

const days14 = 1209600000;
export const rateLimit = {
    pick: (model: { channelId: bigint | string, messageId: bigint | string }) => [
        model.channelId,
        Date.now() - snowflake.toTimestamp(model.messageId) > days14 ? 'old' : 'new'
    ],
    global: true
} as const;
export const route = DELETE`api:/channels/${channelId}/messages/${messageId}`;
export const headers = auditLogReason;
export function read(response: IHttpResponse) {
    return noContent(response);
}
