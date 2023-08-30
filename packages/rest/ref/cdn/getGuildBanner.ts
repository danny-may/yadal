/*
 * Auto generated file, do not edit
 */
import { type GetGuildBannerRequestPath } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const name = "getGuildBanner";
export type RouteModel = GetGuildBannerRequestPath;
const routeRegex = /^\/banners\/(?<guild_id>.*?)\/(?<guild_banner>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: "/banners/{guild_id}/{guild_banner}.{format}",
    keys: Object.freeze(["guild_id","guild_banner","format"] as const),
    authentication: Object.freeze({} as const),
    get regex(){
        return /^\/banners\/(?<guild_id>.*?)\/(?<guild_banner>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/banners/${encodeURIComponent(model.guild_id)}/${encodeURIComponent(model.guild_banner)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["guild_id"]: decodeURIComponent(match.groups!["guild_id"]!),
                ["guild_banner"]: decodeURIComponent(match.groups!["guild_banner"]!),
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
export type Response = ArrayBufferView;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "image/png") {
            return await content() as ArrayBufferView;
        }
        if (contentType === "image/jpeg") {
            return await content() as ArrayBufferView;
        }
        if (contentType === "image/webp") {
            return await content() as ArrayBufferView;
        }
        if (contentType === "image/gif") {
            return await content() as ArrayBufferView;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
