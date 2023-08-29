/*
 * Auto generated file, do not edit
 */
import { type GetStickerRequestPath } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const name = "getSticker";
export type RouteModel = GetStickerRequestPath;
const routeRegex = /^\/stickers\/(?<sticker_id>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: "/stickers/{sticker_id}.{format}",
    keys: Object.freeze(["sticker_id","format"] as const),
    authentication: Object.freeze({} as const),
    get regex(){
        return /^\/stickers\/(?<sticker_id>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/stickers/${encodeURIComponent(model.sticker_id)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["sticker_id"]: decodeURIComponent(match.groups!["sticker_id"]!),
                ["format"]: decodeURIComponent(match.groups!["format"]!)
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

export type QueryModel = {

};
export const query = {
    keys: Object.freeze([] as const),
    * getValues(_?: QueryModel) {
        
    }
} as const;
Object.freeze(query);
export type HeaderModel = {

};
export const headers = {
    keys: Object.freeze([] as const),
    getValues(_?: HeaderModel) {
        const result = {} as { [P in keyof HeaderModel]?: string };
        
        return result;
    }
} as const;
Object.freeze(headers);
export type Response = (ArrayBufferView | Record<string, unknown>);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "image/png") {
            return await resolve(contentType, content) as ArrayBufferView;
        }
        
        if (contentType === "application/json") {
            return await resolve(contentType, content) as Record<string, unknown>;
        }
        
        if (contentType === "image/gif") {
            return await resolve(contentType, content) as ArrayBufferView;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}