/*
 * Auto generated file, do not edit
 */
import { type GetMyOauth2AuthorizationRequestHeaders, type RateLimitError, type OAuth2GetAuthorizationResponse, type ErrorResponse } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "getMyOauth2Authorization";
export type RouteModel = {

};
const routeRegex = /^\/oauth2\/@me$/i;
export const route = {
    method: "GET",
    template: "/oauth2/@me",
    keys: Object.freeze([] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const),
        "OAuth2": Object.freeze([
            "activities.read",
            "activities.write",
            "applications.builds.read",
            "applications.builds.upload",
            "applications.commands",
            "applications.commands.permissions.update",
            "applications.commands.update",
            "applications.entitlements",
            "applications.store.update",
            "bot",
            "connections",
            "dm_channels.read",
            "email",
            "gdm.join",
            "guilds",
            "guilds.join",
            "guilds.members.read",
            "identify",
            "messages.read",
            "relationships.read",
            "role_connections.write",
            "rpc",
            "rpc.activities.write",
            "rpc.notifications.read",
            "rpc.screenshare.read",
            "rpc.screenshare.write",
            "rpc.video.read",
            "rpc.video.write",
            "rpc.voice.read",
            "rpc.voice.write",
            "voice",
            "webhook.incoming"
        ] as const)
    } as const),
    get regex(){
        return /^\/oauth2\/@me$/i;
    },
    create(_?: RouteModel) {
        return `/oauth2/@me` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                
            };
    },
    parse(url: `/${string}`) {
        const result = route.tryParse(url);
        if (result === null)
            throw new Error('Invalid URL');
        return result;
    }
} as const;
Object.freeze(route);
export const rateLimit = {
    global: false,
    bucket(_?: {  }) {
        return `get /oauth2/@me` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = GetMyOauth2AuthorizationRequestHeaders;
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
export type Response = OAuth2GetAuthorizationResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as OAuth2GetAuthorizationResponse;
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