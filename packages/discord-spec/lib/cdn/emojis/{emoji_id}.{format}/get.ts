/*
 * Auto generated file, do not edit
 */
import { type GetCustomEmojiRequestPath } from '../../../types.js';
import { DiscordRestError } from '../../../helpers.js';
export const name = "getCustomEmoji";
export type RouteModel = GetCustomEmojiRequestPath;
const routeRegex = /^\/emojis\/(?<emoji_id>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: "/emojis/{emoji_id}.{format}",
    keys: Object.freeze(["emoji_id","format"] as const),
    authentication: Object.freeze({} as const),
    get regex(){
        return /^\/emojis\/(?<emoji_id>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/emojis/${encodeURIComponent(model.emoji_id)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["emoji_id"]: decodeURIComponent(match["emoji_id"]!),
                ["format"]: decodeURIComponent(match["format"]!)
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