/** @docs https://discord.com/developers/docs/resources/guild-template#modify-guild-template */
import { Discord, IHttpResponse, code, guildId, jsonResponse, PATCH, requestBody, byGuildId } from "../../../util.js";

export const rateLimit = byGuildId;
export const route = PATCH`api:/guilds/${guildId}/templates/${code}`;
export type Result = Discord.RESTPatchAPIGuildTemplateResult;
export type Body = Discord.RESTPatchAPIGuildTemplateJSONBody;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        description: true,
        name: true
    });
}