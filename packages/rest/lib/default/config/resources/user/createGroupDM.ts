/** @docs https://discord.com/developers/docs/resources/user#create-group-dm */
import { byRoute, Discord, IHttpResponse, jsonResponse, POST, requestBody } from "../../../util.js";

export const rateLimit = byRoute;
export const route = POST`api:/users/@me/channels`;
export type Result = Discord.APIGroupDMChannel;
export function read(value: IHttpResponse) {
    return jsonResponse<Result>(value);
}
export function body(model: Body) {
    return requestBody(model, {
        access_tokens: true,
        nicks: true
    });
}
export interface Body {
    readonly access_tokens: string[];
    readonly nicks: Record<Discord.Snowflake, string>;
}