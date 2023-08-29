/*
 * Auto generated file, do not edit
 */
import { type GetStickerPackBannerRequestPath } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const name = "getStickerPackBanner";
export type RouteModel = GetStickerPackBannerRequestPath;
const routeRegex = /^\/app-assets\/710982414301790216\/store\/(?<sticker_pack_banner_asset_id>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: "/app-assets/710982414301790216/store/{sticker_pack_banner_asset_id}.{format}",
    keys: Object.freeze(["sticker_pack_banner_asset_id","format"] as const),
    authentication: Object.freeze({} as const),
    get regex(){
        return /^\/app-assets\/710982414301790216\/store\/(?<sticker_pack_banner_asset_id>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/app-assets/710982414301790216/store/${encodeURIComponent(model.sticker_pack_banner_asset_id)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["sticker_pack_banner_asset_id"]: decodeURIComponent(match.groups!["sticker_pack_banner_asset_id"]!),
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
export const rateLimit = {
    global: false,
    bucket(_?: {  }) {
        return `get /app-assets/710982414301790216/store/<any>.<any>` as const;
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
export type Response = ArrayBufferView;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "image/png") {
            return await resolve(contentType, content) as ArrayBufferView;
        }
        
        if (contentType === "image/jpeg") {
            return await resolve(contentType, content) as ArrayBufferView;
        }
        
        if (contentType === "image/webp") {
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