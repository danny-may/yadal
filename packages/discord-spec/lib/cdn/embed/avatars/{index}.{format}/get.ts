/*
 * Auto generated file, do not edit
 */
import { type GetDefaultUserAvatarRequestPath } from '../../../../types.js';
import { DiscordRestError } from '../../../../helpers.js';
export const name = "getDefaultUserAvatar";
export type RouteModel = GetDefaultUserAvatarRequestPath;
const routeRegex = /^\/embed\/avatars\/(?<index>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: Object.freeze({
        raw: "/embed/avatars/{index}.{format}" as const,
        keys: Object.freeze(["index","format"] as const),
        segments: Object.freeze(["/embed/avatars/",".",""] as const)
    }),
    authentication: Object.freeze({
        "Anonymous": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/embed\/avatars\/(?<index>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/embed/avatars/${encodeURIComponent(model.index)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["index"]: decodeURIComponent(match.groups!["index"]!),
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
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
