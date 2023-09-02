/*
 * Auto generated file, do not edit
 */
import { type CreateGuildStickerRequestPath, type CreateGuildStickerRequestHeaders, type GuildStickerResponse, type RateLimitError, type ErrorResponse, type CreateGuildStickerRequestFormData } from '../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../helpers.js';
export const name = "createGuildSticker";
export type RouteModel = CreateGuildStickerRequestPath;
const routeRegex = /^\/guilds\/(?<guild_id>.*?)\/stickers$/i;
export const route = {
    method: "POST",
    template: Object.freeze({
        raw: "/guilds/{guild_id}/stickers" as const,
        keys: Object.freeze(["guild_id"] as const),
        segments: Object.freeze(["/guilds/","/stickers"] as const)
    }),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/guilds\/(?<guild_id>.*?)\/stickers$/i;
    },
    create(model: RouteModel) {
        return `/guilds/${encodeURIComponent(model.guild_id)}/stickers` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!)
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
        return `post /guilds/${model.guild_id}/stickers` as const;
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
export type HeaderModel = CreateGuildStickerRequestHeaders;
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
export type Response = GuildStickerResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as GuildStickerResponse;
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
export type Body = CreateGuildStickerRequestFormData;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks: ArrayBufferView[] = [
        formEncoded["--"], boundary, formEncoded["payload_json"],
        encoder.encode(JSON.stringify({
            "name": model["name" as keyof typeof model],
            "tags": model["tags" as keyof typeof model],
            "description": model["description" as keyof typeof model]
        })), formEncoded["lf"],
        formEncoded["--"], boundary, formEncoded["\"file\".1"], encoder.encode(encodeURIComponent(model["file"].name ?? "file")),
        formEncoded["\"file\".2"], encoder.encode(model["file"].contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
        model["file"].content, formEncoded["lf"],
        formEncoded["--"], boundary, formEncoded["--"]
    ];
    
    return {
        type: `multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}`,
        content: chunks
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
const formEncoded = {
    "--":encoder.encode("--"),
    "lf":encoder.encode("\n"),
    "payload_json":encoder.encode("\nContent-Disposition: form-data; name=\"payload_json\"\nContent-Type: application/json\n\n"),
    "\"file\".1":encoder.encode("\nContent-Disposition: form-data; name=file; filename=\""),
    "\"file\".2":encoder.encode("\"\nContent-Type: ")
} as const;
