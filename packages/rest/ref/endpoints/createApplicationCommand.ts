/*
 * Auto generated file, do not edit
 */
import { type CreateApplicationCommandRequestPath, type CreateApplicationCommandRequestHeaders, type RateLimitError, type ApplicationCommandResponse, type ErrorResponse, type CreateApplicationCommandRequestJSON } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createApplicationCommand";
export type RouteModel = CreateApplicationCommandRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)\/commands$/i;
export const route = {
    method: "POST",
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
        return ["global", `post /applications/<any>/commands`] as const;
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
export type HeaderModel = CreateApplicationCommandRequestHeaders;
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
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationCommandResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as ApplicationCommandResponse;
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
export type Body = CreateApplicationCommandRequestJSON;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"])),jsonEncoded[","],
        jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(model["type"]))
    ];
    if ("name_localizations" in model) {
        const value = model["name_localizations"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"name_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description_localizations" in model) {
        const value = model["description_localizations"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description_localizations\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("options" in model) {
        const value = model["options"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"options\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_member_permissions" in model) {
        const value = model["default_member_permissions"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_member_permissions\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("dm_permission" in model) {
        const value = model["dm_permission"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"dm_permission\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    chunks.push(jsonEncoded["}"]);
    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };
    
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
    "\"dm_permission\":":encoder.encode("\"dm_permission\":"),
    "\"type\":":encoder.encode("\"type\":")
} as const;
