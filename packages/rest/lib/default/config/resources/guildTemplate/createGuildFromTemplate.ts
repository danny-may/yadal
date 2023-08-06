/** @docs https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template */
import { Discord, IHttpResponse, code, jsonResponse, POST, requestBody, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/guilds/templates/${code}`;
export type Result = Discord.APIGuild;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        icon: true,
        name: true
    });
}
export interface Body {
    readonly name: string;
    readonly icon?: string;
}