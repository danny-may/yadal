/*
 * Auto generated file, do not edit
 */
import { type ExecuteWebhookRequestPath, type ExecuteWebhookRequestQuery, type MessageResponse, type ErrorResponse, type ExecuteWebhookRequestJSON, type ExecuteWebhookRequestURLEncoded, type ExecuteWebhookRequestFormData } from '../discord.js';
import { DiscordRestError } from '../helpers.js';
export const method = "POST";
export const name = "executeWebhook";
export type RouteModel = ExecuteWebhookRequestPath;
export const route = "/webhooks/{webhook_id}/{webhook_token}";
export const routeKeys = Object.freeze(["webhook_id", "webhook_token"] as const);
export type QueryModel = ExecuteWebhookRequestQuery;
export const queryKeys = Object.freeze(["wait", "thread_id"] as const);
export type Response = (MessageResponse | undefined);
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as MessageResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type "${String(contentType)}" response with status code ${statusCode}`);
    }
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
export type Body = (ExecuteWebhookRequestJSON | ExecuteWebhookRequestURLEncoded | ExecuteWebhookRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [

    ];
    if ("content" in model) {
        const value = model["content"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"content\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("embeds" in model) {
        const value = model["embeds"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"embeds\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("allowed_mentions" in model) {
        const value = model["allowed_mentions"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"allowed_mentions\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("components" in model) {
        const value = model["components"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"components\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("attachments" in model) {
        const value = model["attachments"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"attachments\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("tts" in model) {
        const value = model["tts"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"tts\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"flags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("username" in model) {
        const value = model["username"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"username\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("avatar_url" in model) {
        const value = model["avatar_url"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"avatar_url\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("thread_name" in model) {
        const value = model["thread_name"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"thread_name\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("applied_tags" in model) {
        const value = model["applied_tags"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"applied_tags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    "\"content\".1":encoder.encode("\nContent-Disposition: form-data; name=content\nContent-Type: application/json\n\n"),
    "\"embeds\".1":encoder.encode("\nContent-Disposition: form-data; name=embeds\nContent-Type: application/json\n\n"),
    "\"allowed_mentions\".1":encoder.encode("\nContent-Disposition: form-data; name=allowed_mentions\nContent-Type: application/json\n\n"),
    "\"components\".1":encoder.encode("\nContent-Disposition: form-data; name=components\nContent-Type: application/json\n\n"),
    "\"attachments\".1":encoder.encode("\nContent-Disposition: form-data; name=attachments\nContent-Type: application/json\n\n"),
    "\"tts\".1":encoder.encode("\nContent-Disposition: form-data; name=tts\nContent-Type: application/json\n\n"),
    "\"flags\".1":encoder.encode("\nContent-Disposition: form-data; name=flags\nContent-Type: application/json\n\n"),
    "\"username\".1":encoder.encode("\nContent-Disposition: form-data; name=username\nContent-Type: application/json\n\n"),
    "\"avatar_url\".1":encoder.encode("\nContent-Disposition: form-data; name=avatar_url\nContent-Type: application/json\n\n"),
    "\"thread_name\".1":encoder.encode("\nContent-Disposition: form-data; name=thread_name\nContent-Type: application/json\n\n"),
    "\"applied_tags\".1":encoder.encode("\nContent-Disposition: form-data; name=applied_tags\nContent-Type: application/json\n\n")
} as const;
