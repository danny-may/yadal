/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildApplicationCommandRequestPath, type UpdateGuildApplicationCommandRequestHeaders, type ApplicationCommandResponse, type RateLimitError, type ErrorResponse, type UpdateGuildApplicationCommandRequestJSON } from '../../../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../../helpers.js';
export const name = "updateGuildApplicationCommand";
export type RouteModel = UpdateGuildApplicationCommandRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands\/(?<command_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: Object.freeze({
        raw: "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}" as const,
        keys: Object.freeze(["application_id","guild_id","command_id"] as const),
        segments: Object.freeze(["/applications/","/guilds/","/commands/",""] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const),
        "OAuth2": Object.freeze([
            "applications.commands.update"
        ] as const)
    } as const),
    get regex(){
        return /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands\/(?<command_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}/guilds/${encodeURIComponent(model.guild_id)}/commands/${encodeURIComponent(model.command_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!),
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!),
            ["command_id"]: decodeURIComponent(match.groups!["command_id"]!)
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
    global: true,
    bucket(model: { [P in "guild_id"]: RouteModel[P] | string; }) {
        return `patch /applications/<any>/guilds/${model.guild_id}/commands/<any>` as const;
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
export type HeaderModel = UpdateGuildApplicationCommandRequestHeaders;
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
export type Response = ApplicationCommandResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as ApplicationCommandResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(JSON.parse(decode(await content())) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(JSON.parse(decode(await content())) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = UpdateGuildApplicationCommandRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    return {
        type: `application/json; charset=${encoder.encoding}`,
        content: [encoder.encode(JSON.stringify({
            "name": model["name" as keyof typeof model],
            "name_localizations": model["name_localizations" as keyof typeof model],
            "description": model["description" as keyof typeof model],
            "description_localizations": model["description_localizations" as keyof typeof model],
            "options": model["options" as keyof typeof model],
            "default_member_permissions": model["default_member_permissions" as keyof typeof model],
            "dm_permission": model["dm_permission" as keyof typeof model]
        }))]
    };
    
}
declare const TextDecoder: typeof import('node:util').TextDecoder;
declare type TextDecoder = import('node:util').TextDecoder;
const decoder = new TextDecoder();
const typedArray: new () => Exclude<Extract<Parameters<TextDecoder["decode"]>[0], ArrayBufferView>, DataView> = Object.getPrototypeOf(Uint8Array.prototype).constructor;
function decode(content: ArrayBufferView) {
    if (content instanceof typedArray || content instanceof DataView)
        return decoder.decode(content);
    return decoder.decode(new Uint8Array(content.buffer, content.byteOffset, content.byteLength));
}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
