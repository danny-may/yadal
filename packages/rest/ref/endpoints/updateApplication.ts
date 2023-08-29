/*
 * Auto generated file, do not edit
 */
import { type UpdateApplicationRequestPath, type UpdateApplicationRequestHeaders, type RateLimitError, type PrivateApplicationResponse, type ErrorResponse, type ApplicationFormPartial } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateApplication";
export type RouteModel = UpdateApplicationRequestPath;
const routeRegex = /^\/applications\/(?<application_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/applications/{application_id}",
    keys: Object.freeze(["application_id"] as const),
    get regex(){
        return /^\/applications\/(?<application_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/applications/${encodeURIComponent(model.application_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["application_id"]: decodeURIComponent(match.groups!["application_id"]!)
        }
    },
    rateLimitBuckets(_?: {  }) {
        return ["global", `patch /applications/<any>`] as const;
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
export type HeaderModel = UpdateApplicationRequestHeaders;
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
export type Response = PrivateApplicationResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as PrivateApplicationResponse;
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
export type Body = ApplicationFormPartial;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("icon" in model) {
        const value = model["icon"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"icon\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("cover_image" in model) {
        const value = model["cover_image"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"cover_image\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("team_id" in model) {
        const value = model["team_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"team_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"flags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("interactions_endpoint_url" in model) {
        const value = model["interactions_endpoint_url"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"interactions_endpoint_url\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("max_participants" in model) {
        const value = model["max_participants"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"max_participants\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("type" in model) {
        const value = model["type"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"type\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("tags" in model) {
        const value = model["tags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"tags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("custom_install_url" in model) {
        const value = model["custom_install_url"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"custom_install_url\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("install_params" in model) {
        const value = model["install_params"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"install_params\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("role_connections_verification_url" in model) {
        const value = model["role_connections_verification_url"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"role_connections_verification_url\":"], encoder.encode(JSON.stringify(value)));
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
    "\"description\":":encoder.encode("\"description\":"),
    "\"icon\":":encoder.encode("\"icon\":"),
    "\"cover_image\":":encoder.encode("\"cover_image\":"),
    "\"team_id\":":encoder.encode("\"team_id\":"),
    "\"flags\":":encoder.encode("\"flags\":"),
    "\"interactions_endpoint_url\":":encoder.encode("\"interactions_endpoint_url\":"),
    "\"max_participants\":":encoder.encode("\"max_participants\":"),
    "\"type\":":encoder.encode("\"type\":"),
    "\"tags\":":encoder.encode("\"tags\":"),
    "\"custom_install_url\":":encoder.encode("\"custom_install_url\":"),
    "\"install_params\":":encoder.encode("\"install_params\":"),
    "\"role_connections_verification_url\":":encoder.encode("\"role_connections_verification_url\":")
} as const;