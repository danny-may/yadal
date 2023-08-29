/*
 * Auto generated file, do not edit
 */
import { type AddGroupDmUserRequestPath, type AddGroupDmUserRequestHeaders, type RateLimitError, type AddGroupDmUserResponseJSON, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "addGroupDmUser";
export type RouteModel = AddGroupDmUserRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/recipients\/(?<user_id>.*?)$/i;
export const route = {
    method: "PUT",
    template: "/channels/{channel_id}/recipients/{user_id}",
    keys: Object.freeze(["channel_id","user_id"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/recipients\/(?<user_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/recipients/${encodeURIComponent(model.user_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!),
            ["user_id"]: decodeURIComponent(match.groups!["user_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `put /channels/${model.channel_id}/recipients/<any>`] as const;
    }
} as const;
Object.freeze(route);
export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = AddGroupDmUserRequestHeaders;
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
export type Response = (AddGroupDmUserResponseJSON | undefined);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as AddGroupDmUserResponseJSON;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 204) {
        return undefined;
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