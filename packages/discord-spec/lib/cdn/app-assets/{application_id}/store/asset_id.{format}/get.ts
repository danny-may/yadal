/*
 * Auto generated file, do not edit
 */
import { type GetStorePageAssetRequestPath } from '../../../../../types.js';
import { DiscordRestError } from '../../../../../helpers.js';
export const name = "getStorePageAsset";
export type RouteModel = GetStorePageAssetRequestPath;
const routeRegex = /^\/app-assets\/(?<application_id>.*?)\/store\/asset_id\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: Object.freeze({
        raw: "/app-assets/{application_id}/store/asset_id.{format}" as const,
        keys: Object.freeze(["application_id","format"] as const),
        segments: Object.freeze(["/app-assets/","/store/asset_id.",""] as const)
    }),
    authentication: Object.freeze({
        "Anonymous": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/app-assets\/(?<application_id>.*?)\/store\/asset_id\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/app-assets/${encodeURIComponent(model.application_id)}/store/asset_id.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!),
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
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
