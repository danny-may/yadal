/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildApplicationCommandRequestPath, type UpdateGuildApplicationCommandRequestHeaders, type ApplicationCommandResponse, type RateLimitError, type ErrorResponse, type UpdateGuildApplicationCommandRequestJSON } from '../../../../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../../helpers.js';
export const name = "updateGuildApplicationCommand";
export type RouteModel = UpdateGuildApplicationCommandRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/guilds\/(?<guild_id>.*?)\/commands\/(?<command_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/applications/{application_id}/guilds/{guild_id}/commands/{command_id}",
    keys: Object.freeze(["application_id","guild_id","command_id"] as const),
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
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["application_id"]: decodeURIComponent(match["application_id"]!),
                ["guild_id"]: decodeURIComponent(match["guild_id"]!),
                ["command_id"]: decodeURIComponent(match["command_id"]!)
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
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("name_localizations" in model) {
        const value = model["name_localizations"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description_localizations" in model) {
        const value = model["description_localizations"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("options" in model) {
        const value = model["options"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"options\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_member_permissions" in model) {
        const value = model["default_member_permissions"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_member_permissions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("dm_permission" in model) {
        const value = model["dm_permission"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"dm_permission\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    chunks.push(jsonEncoded["}"]);
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };
    
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
const jsonEncoded = {
    ",":encoder.encode(","),
    "{":encoder.encode("{"),
    "}":encoder.encode("}"),
    "\"name\":":encoder.encode("\"name\":"),
    "\"name_localizations\":":encoder.encode("\"name_localizations\":"),
    "\"description\":":encoder.encode("\"description\":"),
    "\"description_localizations\":":encoder.encode("\"description_localizations\":"),
    "\"options\":":encoder.encode("\"options\":"),
    "\"default_member_permissions\":":encoder.encode("\"default_member_permissions\":"),
    "\"dm_permission\":":encoder.encode("\"dm_permission\":")
} as const;
