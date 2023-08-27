/*
 * Auto generated file, do not edit
 */
import { DiscordRestError } from '../helpers.js';
import { type PrivateApplicationResponse, type ErrorResponse, type ApplicationFormPartial } from '../discord.js';
export const method = "PATCH";
export const name = "updateMyApplication";
export type RouteModel = {};
export const route = "/applications/@me";
export const routeKeys = Object.freeze([] as const);
export type Response = PrivateApplicationResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as PrivateApplicationResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
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
