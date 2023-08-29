/*
 * Auto generated file, do not edit
 */
import { type UpdateWebhookMessageRequestPath, type UpdateWebhookMessageRequestQuery, type UpdateWebhookMessageRequestHeaders, type MessageResponse, type RateLimitError, type ErrorResponse, type IncomingWebhookUpdateRequestPartial, type UpdateWebhookMessageRequestFormData } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "updateWebhookMessage";
export type RouteModel = UpdateWebhookMessageRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/(?<message_id>.*?)$/i;
export const route = {
    method: "PATCH",
    template: "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    keys: Object.freeze(["webhook_id","webhook_token","message_id"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)\/messages\/(?<message_id>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}/messages/${encodeURIComponent(model.message_id)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ["webhook_id"]: decodeURIComponent(match.groups!["webhook_id"]!),
                ["webhook_token"]: decodeURIComponent(match.groups!["webhook_token"]!),
                ["message_id"]: decodeURIComponent(match.groups!["message_id"]!)
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
    global: false,
    bucket(model: { ["webhook_id"]: RouteModel["webhook_id"] | string; ["webhook_token"]: RouteModel["webhook_token"] | string; }) {
        return `patch /webhooks/${model.webhook_id}/${model.webhook_token}/messages/<any>` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = UpdateWebhookMessageRequestQuery;
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
export type HeaderModel = UpdateWebhookMessageRequestHeaders;
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
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return await resolve(contentType, content) as MessageResponse;
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
export type Body = (IncomingWebhookUpdateRequestPartial | UpdateWebhookMessageRequestFormData);
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    const boundaryStr = `boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join('-')}`;
    const boundary = encoder.encode(boundaryStr);
    const chunks = [
        
    ];
    if ("content" in model) {
        const value = model["content"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"content\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("embeds" in model) {
        const value = model["embeds"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"embeds\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("allowed_mentions" in model) {
        const value = model["allowed_mentions"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"allowed_mentions\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("components" in model) {
        const value = model["components"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"components\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("attachments" in model) {
        const value = model["attachments"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"attachments\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"flags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("files[0]" in model) {
        const value = model["files[0]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[0]\".1"], encoder.encode(encodeURIComponent(name ?? "files[0]")), formEncoded["\"files[0]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[1]" in model) {
        const value = model["files[1]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[1]\".1"], encoder.encode(encodeURIComponent(name ?? "files[1]")), formEncoded["\"files[1]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[2]" in model) {
        const value = model["files[2]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[2]\".1"], encoder.encode(encodeURIComponent(name ?? "files[2]")), formEncoded["\"files[2]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[3]" in model) {
        const value = model["files[3]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[3]\".1"], encoder.encode(encodeURIComponent(name ?? "files[3]")), formEncoded["\"files[3]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[4]" in model) {
        const value = model["files[4]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[4]\".1"], encoder.encode(encodeURIComponent(name ?? "files[4]")), formEncoded["\"files[4]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[5]" in model) {
        const value = model["files[5]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[5]\".1"], encoder.encode(encodeURIComponent(name ?? "files[5]")), formEncoded["\"files[5]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[6]" in model) {
        const value = model["files[6]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[6]\".1"], encoder.encode(encodeURIComponent(name ?? "files[6]")), formEncoded["\"files[6]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[7]" in model) {
        const value = model["files[7]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[7]\".1"], encoder.encode(encodeURIComponent(name ?? "files[7]")), formEncoded["\"files[7]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[8]" in model) {
        const value = model["files[8]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[8]\".1"], encoder.encode(encodeURIComponent(name ?? "files[8]")), formEncoded["\"files[8]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
        }
    }
    if ("files[9]" in model) {
        const value = model["files[9]"];
        if (value !== undefined) {
            chunks.push(...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[9]\".1"], encoder.encode(encodeURIComponent(name ?? "files[9]")), formEncoded["\"files[9]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value));
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
    "\"flags\".1":encoder.encode("\nContent-Disposition: form-data; name=flags\nContent-Type: application/json\n\n"),
    "\"files[0]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[0]; filename="),
    "\"files[0]\".2":encoder.encode("\nContent-Type: "),
    "\"files[1]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[1]; filename="),
    "\"files[1]\".2":encoder.encode("\nContent-Type: "),
    "\"files[2]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[2]; filename="),
    "\"files[2]\".2":encoder.encode("\nContent-Type: "),
    "\"files[3]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[3]; filename="),
    "\"files[3]\".2":encoder.encode("\nContent-Type: "),
    "\"files[4]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[4]; filename="),
    "\"files[4]\".2":encoder.encode("\nContent-Type: "),
    "\"files[5]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[5]; filename="),
    "\"files[5]\".2":encoder.encode("\nContent-Type: "),
    "\"files[6]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[6]; filename="),
    "\"files[6]\".2":encoder.encode("\nContent-Type: "),
    "\"files[7]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[7]; filename="),
    "\"files[7]\".2":encoder.encode("\nContent-Type: "),
    "\"files[8]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[8]; filename="),
    "\"files[8]\".2":encoder.encode("\nContent-Type: "),
    "\"files[9]\".1":encoder.encode("\nContent-Disposition: form-data; name=files[9]; filename="),
    "\"files[9]\".2":encoder.encode("\nContent-Type: ")
} as const;
