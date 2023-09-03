/*
 * Auto generated file, do not edit
 */
import { type GetRoleIconRequestPath } from '../../../../types.js';
import { DiscordRestError } from '../../../../helpers.js';
export const name = "getRoleIcon";
export type RouteModel = GetRoleIconRequestPath;
const routeRegex = /^\/role-icons\/(?<role_id>.*?)\/(?<role_icon>.*?)\.(?<format>.*?)$/i;
export const route = {
    method: "GET",
    template: Object.freeze({
        raw: "/role-icons/{role_id}/{role_icon}.{format}" as const,
        keys: Object.freeze(["role_id","role_icon","format"] as const),
        segments: Object.freeze(["/role-icons/","/",".",""] as const)
    }),
    authentication: Object.freeze({
        "Anonymous": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/role-icons\/(?<role_id>.*?)\/(?<role_icon>.*?)\.(?<format>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/role-icons/${encodeURIComponent(model.role_id)}/${encodeURIComponent(model.role_icon)}.${encodeURIComponent(model.format)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["role_id"]: decodeURIComponent(match.groups!["role_id"]!),
            ["role_icon"]: decodeURIComponent(match.groups!["role_icon"]!),
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
