/*
 * Auto generated file, do not edit
 */
import { type ListApplicationCommandsRequestPath, type ListApplicationCommandsRequestQuery, type ListApplicationCommandsRequestHeaders, type RateLimitError, type ListApplicationCommandsResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "listApplicationCommands";
export type RouteModel = ListApplicationCommandsRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/commands$/i;
export const route = {
    method: "GET",
    template: "/applications/{application_id}/commands",
    keys: Object.freeze(["application_id"] as const),
    get regex(){
        return /^\/applications\/(?<application_id>.*?)\/commands$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}/commands` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!)
        }
    },
    rateLimitBuckets(_?: {  }) {
        return ["global", `get /applications/<any>/commands`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = ListApplicationCommandsRequestQuery;
export const query = {
    keys: Object.freeze(["with_localizations"] as const),
    * getValues(model: QueryModel) {
        if ("with_localizations" in model) {
            const value = model["with_localizations"];
            if (value !== undefined && value !== null) {
                yield ["with_localizations", String(value)] as ["with_localizations", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = ListApplicationCommandsRequestHeaders;
export const headers = {
    keys: Object.freeze(["x-audit-log-reason"] as const),
    getValues(model: HeaderModel) {
        const result = {} as { [P in keyof HeaderModel]?: string };
        if ("x-audit-log-reason" in model) {
            const value = model["x-audit-log-reason"];
            if (value !== undefined && value !== null) {
                result["x-audit-log-reason"] = String(value);
            }
        }
        return result;
    }
} as const;
Object.freeze(headers);
export type Response = ListApplicationCommandsResponseJSON;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ListApplicationCommandsResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(await resolve(contentType, content) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}