/*
 * Auto generated file, do not edit
 */
import { type GetAchievementIconRequestPath } from '../../../../../../../types.js';
import { DiscordRestError } from '../../../../../../../helpers.js';
export const name = "getAchievementIcon";
export type RouteModel = GetAchievementIconRequestPath;
const routeRegex = /^\/app-assets\/(?<application_id>.*?)\/achievements\/(?<achievement_id>.*?)\/icons\/(?<icon_hash>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: "/app-assets/{application_id}/achievements/{achievement_id}/icons/{icon_hash}.{format}",
    keys: Object.freeze(["application_id","achievement_id","icon_hash","format"] as const),
    authentication: Object.freeze({} as const),
    get regex(){
        return /^\/app-assets\/(?<application_id>.*?)\/achievements\/(?<achievement_id>.*?)\/icons\/(?<icon_hash>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/app-assets/${encodeURIComponent(model.application_id)}/achievements/${encodeURIComponent(model.achievement_id)}/icons/${encodeURIComponent(model.icon_hash)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
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
                ["achievement_id"]: decodeURIComponent(match["achievement_id"]!),
                ["icon_hash"]: decodeURIComponent(match["icon_hash"]!),
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
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}