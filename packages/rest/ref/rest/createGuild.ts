/*
 * Auto generated file, do not edit
 */
import { type CreateGuildRequestHeaders, type RateLimitError, type GuildResponse, type ErrorResponse, type GuildCreateRequest } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createGuild";
export type RouteModel = {

};
const routeRegex = /^\/guilds$/i;
export const route = {
    method: "POST",
    template: "/guilds",
    keys: Object.freeze([] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds$/i;
    },
    create(_?: RouteModel) {
        return `/guilds` as const satisfies `/${string}`;
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
        return `post /guilds` as const;
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
export type HeaderModel = CreateGuildRequestHeaders;
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
export type Response = GuildResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildResponse;
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
export type Body = GuildCreateRequest;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"],
        jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(model["name"]))
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("region" in model) {
        const value = model["region"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"region\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("icon" in model) {
        const value = model["icon"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"icon\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("verification_level" in model) {
        const value = model["verification_level"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"verification_level\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_message_notifications" in model) {
        const value = model["default_message_notifications"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"default_message_notifications\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("explicit_content_filter" in model) {
        const value = model["explicit_content_filter"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"explicit_content_filter\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("preferred_locale" in model) {
        const value = model["preferred_locale"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"preferred_locale\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("afk_timeout" in model) {
        const value = model["afk_timeout"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"afk_timeout\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("roles" in model) {
        const value = model["roles"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"roles\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("channels" in model) {
        const value = model["channels"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"channels\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("afk_channel_id" in model) {
        const value = model["afk_channel_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"afk_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("system_channel_id" in model) {
        const value = model["system_channel_id"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"system_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("system_channel_flags" in model) {
        const value = model["system_channel_flags"];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded["\"system_channel_flags\":"], encoder.encode(JSON.stringify(value)));
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
    "\"description\":":encoder.encode("\"description\":"),
    "\"region\":":encoder.encode("\"region\":"),
    "\"icon\":":encoder.encode("\"icon\":"),
    "\"verification_level\":":encoder.encode("\"verification_level\":"),
    "\"default_message_notifications\":":encoder.encode("\"default_message_notifications\":"),
    "\"explicit_content_filter\":":encoder.encode("\"explicit_content_filter\":"),
    "\"preferred_locale\":":encoder.encode("\"preferred_locale\":"),
    "\"afk_timeout\":":encoder.encode("\"afk_timeout\":"),
    "\"roles\":":encoder.encode("\"roles\":"),
    "\"channels\":":encoder.encode("\"channels\":"),
    "\"afk_channel_id\":":encoder.encode("\"afk_channel_id\":"),
    "\"system_channel_id\":":encoder.encode("\"system_channel_id\":"),
    "\"system_channel_flags\":":encoder.encode("\"system_channel_flags\":")
} as const;
