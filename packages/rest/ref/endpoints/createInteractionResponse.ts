/*
 * Auto generated file, do not edit
 */
import { type CreateInteractionResponseRequestPath, type ErrorResponse, type CreateInteractionResponseRequestJSON, type CreateInteractionResponseRequestURLEncoded, type CreateInteractionResponseRequestFormData } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "createInteractionResponse";
export type RouteModel = CreateInteractionResponseRequestPath;
export const route = "/interactions/{interaction_id}/{interaction_token}/callback";
export const routeKeys = Object.freeze(["interaction_id", "interaction_token"] as const);
export type Response = undefined;
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 204) {
        return undefined;
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(await resolve(contentType, content) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = (CreateInteractionResponseRequestJSON | CreateInteractionResponseRequestURLEncoded | CreateInteractionResponseRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [
        formEncoded["--"], boundary, formEncoded["\"type\".1"], encoder.encode(JSON.stringify(model["type"])), formEncoded["lf"]
    ];
    if ("data" in model) {
        const value = model["data"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"data\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    "\"type\".1":encoder.encode("\nContent-Disposition: form-data; name=type\nContent-Type: application/json\n\n"),
    "\"data\".1":encoder.encode("\nContent-Disposition: form-data; name=data\nContent-Type: application/json\n\n")
} as const;
