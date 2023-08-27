/*
 * Auto generated file, do not edit
 */
import { type CreateGuildStickerRequestPath, type GuildStickerResponse, type ErrorResponse, type CreateGuildStickerRequestFormData } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createGuildSticker";
export type RouteModel = CreateGuildStickerRequestPath;
export const route = "/guilds/{guild_id}/stickers";
export const routeKeys = Object.freeze(["guild_id"] as const);
export type Response = GuildStickerResponse;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 201) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as GuildStickerResponse;
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
export type Body = CreateGuildStickerRequestFormData;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [
        formEncoded["--"], boundary, formEncoded["\"name\".1"], encoder.encode(JSON.stringify(model["name"])), formEncoded["lf"],
        formEncoded["--"], boundary, formEncoded["\"tags\".1"], encoder.encode(JSON.stringify(model["tags"])), formEncoded["lf"],
        ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"file\".1"], encoder.encode(encodeURIComponent(name ?? "file")), formEncoded["\"file\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(model["file"])
    ];
    if ("description" in model) {
        const value = model["description"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"description\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    chunks.push(formEncoded["--"], boundary, formEncoded["--"]);
    return { type: `multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}`, content: chunks };

}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const formEncoded = {
    "--":encoder.encode("--"),
    "lf":encoder.encode("\n"),
    "\"name\".1":encoder.encode("\nContent-Disposition: form-data; name=name\nContent-Type: application/json\n\n"),
    "\"tags\".1":encoder.encode("\nContent-Disposition: form-data; name=tags\nContent-Type: application/json\n\n"),
    "\"file\".1":encoder.encode("\nContent-Disposition: form-data; name=file; filename="),
    "\"file\".2":encoder.encode("\nContent-Type: "),
    "\"description\".1":encoder.encode("\nContent-Disposition: form-data; name=description\nContent-Type: application/json\n\n")
} as const;
