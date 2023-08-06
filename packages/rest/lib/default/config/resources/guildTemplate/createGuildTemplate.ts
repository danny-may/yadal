/** @docs https://discord.com/developers/docs/resources/guild-template#create-guild-template */
import { Discord, IHttpResponse, guildId, jsonResponse, POST, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = POST`api:/guilds/${guildId}/templates`;
export type Result = Discord.RESTPostAPIGuildTemplatesResult;
export type Body = Discord.RESTPostAPIGuildTemplatesJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        description: true,
        name: true
    });
}