/*
 * Auto generated file, do not edit
 */
import { type UpdateGuildRequestPath, type GuildResponse, type ErrorResponse, type GuildPatchRequestPartial } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "PATCH";
export const name = "updateGuild";
export type RouteModel = UpdateGuildRequestPath;
export const route = "/guilds/{guild_id}";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = GuildResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildResponse;
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
export type Body = GuildPatchRequestPartial;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const chunks = [
        jsonEncoded["{"]
    ];
    if ("name" in model) {
        const value = model["name"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"name\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"description\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("region" in model) {
        const value = model["region"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"region\":"], encoder.encode(JSON.stringify(value)));
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
    if ("verification_level" in model) {
        const value = model["verification_level"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"verification_level\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("default_message_notifications" in model) {
        const value = model["default_message_notifications"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"default_message_notifications\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("explicit_content_filter" in model) {
        const value = model["explicit_content_filter"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"explicit_content_filter\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("preferred_locale" in model) {
        const value = model["preferred_locale"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"preferred_locale\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("afk_timeout" in model) {
        const value = model["afk_timeout"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"afk_timeout\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("afk_channel_id" in model) {
        const value = model["afk_channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"afk_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("system_channel_id" in model) {
        const value = model["system_channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"system_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("owner_id" in model) {
        const value = model["owner_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"owner_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("splash" in model) {
        const value = model["splash"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"splash\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("banner" in model) {
        const value = model["banner"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"banner\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("system_channel_flags" in model) {
        const value = model["system_channel_flags"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"system_channel_flags\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("features" in model) {
        const value = model["features"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"features\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("discovery_splash" in model) {
        const value = model["discovery_splash"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"discovery_splash\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("home_header" in model) {
        const value = model["home_header"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"home_header\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("rules_channel_id" in model) {
        const value = model["rules_channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"rules_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("safety_alerts_channel_id" in model) {
        const value = model["safety_alerts_channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"safety_alerts_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("public_updates_channel_id" in model) {
        const value = model["public_updates_channel_id"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"public_updates_channel_id\":"], encoder.encode(JSON.stringify(value)));
        }
    }
    if ("premium_progress_bar_enabled" in model) {
        const value = model["premium_progress_bar_enabled"];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded["\"premium_progress_bar_enabled\":"], encoder.encode(JSON.stringify(value)));
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
    "\"name\":":encoder.encode("\"name\":"),
    "\"description\":":encoder.encode("\"description\":"),
    "\"region\":":encoder.encode("\"region\":"),
    "\"icon\":":encoder.encode("\"icon\":"),
    "\"verification_level\":":encoder.encode("\"verification_level\":"),
    "\"default_message_notifications\":":encoder.encode("\"default_message_notifications\":"),
    "\"explicit_content_filter\":":encoder.encode("\"explicit_content_filter\":"),
    "\"preferred_locale\":":encoder.encode("\"preferred_locale\":"),
    "\"afk_timeout\":":encoder.encode("\"afk_timeout\":"),
    "\"afk_channel_id\":":encoder.encode("\"afk_channel_id\":"),
    "\"system_channel_id\":":encoder.encode("\"system_channel_id\":"),
    "\"owner_id\":":encoder.encode("\"owner_id\":"),
    "\"splash\":":encoder.encode("\"splash\":"),
    "\"banner\":":encoder.encode("\"banner\":"),
    "\"system_channel_flags\":":encoder.encode("\"system_channel_flags\":"),
    "\"features\":":encoder.encode("\"features\":"),
    "\"discovery_splash\":":encoder.encode("\"discovery_splash\":"),
    "\"home_header\":":encoder.encode("\"home_header\":"),
    "\"rules_channel_id\":":encoder.encode("\"rules_channel_id\":"),
    "\"safety_alerts_channel_id\":":encoder.encode("\"safety_alerts_channel_id\":"),
    "\"public_updates_channel_id\":":encoder.encode("\"public_updates_channel_id\":"),
    "\"premium_progress_bar_enabled\":":encoder.encode("\"premium_progress_bar_enabled\":")
} as const;
