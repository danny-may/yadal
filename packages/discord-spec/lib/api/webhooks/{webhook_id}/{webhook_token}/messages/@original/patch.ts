/*
 * Auto generated file, do not edit
 */
import { type UpdateOriginalWebhookMessageRequestPath, type UpdateOriginalWebhookMessageRequestQuery, type UpdateOriginalWebhookMessageRequestHeaders, type MessageResponse, type RateLimitError, type ErrorResponse, type IncomingWebhookUpdateRequestPartial, type UpdateOriginalWebhookMessageRequestFormData } from '../../../../../../types.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../../../helpers.js';
export const name = "updateOriginalWebhookMessage";
export type RouteModel = UpdateOriginalWebhookMessageRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/@original$/i;
export const route = {
    method: "PATCH",
    template: Object.freeze({
        raw: "/webhooks/{webhook_id}/{webhook_token}/messages/@original" as const,
        keys: Object.freeze(["webhook_id","webhook_token"] as const),
        segments: Object.freeze(["/webhooks/","/","/messages/@original"] as const)
    }),
    authentication: Object.freeze({
        "Anonymous": Object.freeze([] as const),
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/@original$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/messages/@original` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null ? null : {
            ["webhook_id"]: decodeURIComponent(match.groups!["webhook_id"]!),
            ["webhook_token"]: decodeURIComponent(match.groups!["webhook_token"]!)
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
export const rateLimit = {
    global: true,
    bucket(model: { [P in "webhook_id" | "webhook_token"]: RouteModel[P] | string; }) {
        return `patch /webhooks/${model.webhook_id}/${model.webhook_token}/messages/@original` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = UpdateOriginalWebhookMessageRequestQuery;
export const query = {
    keys: Object.freeze(["thread_id"] as const),
    * getValues(model: QueryModel) {
        if ("thread_id" in model) {
            const value = model["thread_id"];
            if (value !== undefined && value !== null) {
                yield ["thread_id", String(value)] as ["thread_id", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = UpdateOriginalWebhookMessageRequestHeaders;
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
export type Response = MessageResponse;
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as MessageResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 429) {
        if (contentType === "application/json") {
            throw new DiscordRateLimitError(JSON.parse(decode(await content())) as RateLimitError);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode >= 400 && statusCode <= 499) {
        if (contentType === "application/json") {
            throw new DiscordRestError(JSON.parse(decode(await content())) as ErrorResponse);
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);
}
export type Body = (IncomingWebhookUpdateRequestPartial | UpdateOriginalWebhookMessageRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    if (
        ("files[0]" in model && model["files[0]"] != null)
        || ("files[1]" in model && model["files[1]"] != null)
        || ("files[2]" in model && model["files[2]"] != null)
        || ("files[3]" in model && model["files[3]"] != null)
        || ("files[4]" in model && model["files[4]"] != null)
        || ("files[5]" in model && model["files[5]"] != null)
        || ("files[6]" in model && model["files[6]"] != null)
        || ("files[7]" in model && model["files[7]"] != null)
        || ("files[8]" in model && model["files[8]"] != null)
        || ("files[9]" in model && model["files[9]"] != null)
    ) {
        const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
        const boundary = encoder.encode(boundaryStr);
        const chunks: ArrayBufferView[] = [
            formEncoded["--"], boundary, formEncoded["payload_json"],
            encoder.encode(JSON.stringify({
                "content": model["content" as keyof typeof model],
                "embeds": model["embeds" as keyof typeof model],
                "allowed_mentions": model["allowed_mentions" as keyof typeof model],
                "components": model["components" as keyof typeof model],
                "attachments": model["attachments" as keyof typeof model],
                "flags": model["flags" as keyof typeof model]
            })), formEncoded["lf"]
        ];
        if ("files[0]" in model) {
            const value = model["files[0]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[0]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[0]")),
                    formEncoded["\"files[0]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[1]" in model) {
            const value = model["files[1]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[1]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[1]")),
                    formEncoded["\"files[1]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[2]" in model) {
            const value = model["files[2]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[2]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[2]")),
                    formEncoded["\"files[2]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[3]" in model) {
            const value = model["files[3]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[3]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[3]")),
                    formEncoded["\"files[3]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[4]" in model) {
            const value = model["files[4]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[4]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[4]")),
                    formEncoded["\"files[4]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[5]" in model) {
            const value = model["files[5]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[5]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[5]")),
                    formEncoded["\"files[5]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[6]" in model) {
            const value = model["files[6]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[6]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[6]")),
                    formEncoded["\"files[6]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[7]" in model) {
            const value = model["files[7]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[7]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[7]")),
                    formEncoded["\"files[7]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[8]" in model) {
            const value = model["files[8]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[8]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[8]")),
                    formEncoded["\"files[8]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        if ("files[9]" in model) {
            const value = model["files[9]"];
            if (value !== undefined) {
                chunks.push(
                    formEncoded["--"], boundary, formEncoded["\"files[9]\".1"], encoder.encode(encodeURIComponent(value.name ?? "files[9]")),
                    formEncoded["\"files[9]\".2"], encoder.encode(value.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
                    value.content, formEncoded["lf"]
                );
            }
        }
        chunks.push(formEncoded["--"], boundary, formEncoded["--"]);
        return {
            type: `multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}`,
            content: chunks
        };
    } else {
        return {
            type: `application/json; charset=${encoder.encoding}`,
            content: [encoder.encode(JSON.stringify({
                "content": model["content" as keyof typeof model],
                "embeds": model["embeds" as keyof typeof model],
                "allowed_mentions": model["allowed_mentions" as keyof typeof model],
                "components": model["components" as keyof typeof model],
                "attachments": model["attachments" as keyof typeof model],
                "flags": model["flags" as keyof typeof model]
            }))]
        };
    }
}
declare const TextDecoder: typeof import('node:util').TextDecoder;
declare type TextDecoder = import('node:util').TextDecoder;
const decoder = new TextDecoder();
const typedArray: new () => Exclude<Extract<Parameters<TextDecoder["decode"]>[0], ArrayBufferView>, DataView> = Object.getPrototypeOf(Uint8Array.prototype).constructor;
function decode(content: ArrayBufferView) {
    if (content instanceof typedArray || content instanceof DataView)
        return decoder.decode(content);
    return decoder.decode(new Uint8Array(content.buffer, content.byteOffset, content.byteLength));
}
declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
const formEncoded = {
    "--":encoder.encode("--"),
    "lf":encoder.encode("\n"),
    "payload_json":encoder.encode("\nContent-Disposition: form-data; name=\"payload_json\"\nContent-Type: application/json\n\n"),
    "\"files[0]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[0]; filename=\""),
    "\"files[0]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[1]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[1]; filename=\""),
    "\"files[1]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[2]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[2]; filename=\""),
    "\"files[2]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[3]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[3]; filename=\""),
    "\"files[3]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[4]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[4]; filename=\""),
    "\"files[4]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[5]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[5]; filename=\""),
    "\"files[5]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[6]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[6]; filename=\""),
    "\"files[6]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[7]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[7]; filename=\""),
    "\"files[7]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[8]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[8]; filename=\""),
    "\"files[8]\".2":encoder.encode("\"\nContent-Type: "),
    "\"files[9]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[9]; filename=\""),
    "\"files[9]\".2":encoder.encode("\"\nContent-Type: ")
} as const;
