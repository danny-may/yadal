/** @docs https://discord.com/developers/docs/resources/channel#group-dm-add-recipient */
import { PUT, channelId, userId, Discord, IHttpResponse, noContent, requestBody, byChannelId } from "../../../util.js";

export const rateLimit = byChannelId;
export const route = PUT`api:/channels/${channelId}/recipient/${userId}`;
export type Body = Discord.RESTPutAPIChannelRecipientJSONBody;
export function read(response: IHttpResponse) {
    return noContent(response);
}
export function body(model: Body) {
    return requestBody(model, {
        access_token: true,
        nick: true
    });
}