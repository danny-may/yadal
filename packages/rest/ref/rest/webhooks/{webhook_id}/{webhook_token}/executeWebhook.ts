/*
 * Auto generated file, do not edit
 */
import { type ExecuteWebhookRequestPath, type ExecuteWebhookRequestQuery, type ExecuteWebhookRequestHeaders, type MessageResponse, type RateLimitError, type ErrorResponse, type ExecuteWebhookRequestJSON, type ExecuteWebhookRequestURLEncoded, type ExecuteWebhookRequestFormData } from '../../../../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../../../../helpers.js';
export const name = "executeWebhook";
export type RouteModel = ExecuteWebhookRequestPath;
const routeRegex = /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)$/i;
export const route = {
    method: "POST",
    template: "/webhooks/{webhook_id}/{webhook_token}",
    keys: Object.freeze(["webhook_id","webhook_token"] as const),
    authentication: Object.freeze({
        "BotToken": Object.freeze([] as const)
    } as const),
    get regex(){
        return /^\/webhooks\/(?<webhook_id>.*?)\/(?<webhook_token>.*?)$/i;
    },
    create(model: RouteModel) {
        return `/webhooks/${encodeURIComponent(model.webhook_id)}/${encodeURIComponent(model.webhook_token)}` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    tryParse(url: `/${string}`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ["webhook_id"]: decodeURIComponent(match["webhook_id"]!),
                ["webhook_token"]: decodeURIComponent(match["webhook_token"]!)
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
        return `post /webhooks/${model.webhook_id}/${model.webhook_token}` as const;
    }
} as const;
Object.freeze(rateLimit);
export type QueryModel = ExecuteWebhookRequestQuery;
export const query = {
    keys: Object.freeze(["wait","thread_id"] as const),
    * getValues(model: QueryModel) {
        if ("wait" in model) {
            const value = model["wait"];
            if (value !== undefined && value !== null) {
                yield ["wait", String(value)] as ["wait", string];
            }
        }
                if ("thread_id" in model) {
            const value = model["thread_id"];
            if (value !== undefined && value !== null) {
                yield ["thread_id", String(value)] as ["thread_id", string];
            }
        }
    }
} as const;
Object.freeze(query);
export type HeaderModel = ExecuteWebhookRequestHeaders;
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
export type Response = (MessageResponse | undefined);
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    if (statusCode === 200) {
        if (contentType === "application/json") {
            return JSON.parse(decode(await content())) as MessageResponse;
        }
        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);
    }
    if (statusCode === 204) {
        return undefined;
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
export type Body = (ExecuteWebhookRequestJSON | ExecuteWebhookRequestURLEncoded | ExecuteWebhookRequestFormData);
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
    if ("tts" in model) {
        const value = model["tts"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"tts\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"flags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("username" in model) {
        const value = model["username"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"username\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("avatar_url" in model) {
        const value = model["avatar_url"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"avatar_url\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("thread_name" in model) {
        const value = model["thread_name"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"thread_name\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    if ("applied_tags" in model) {
        const value = model["applied_tags"];
        if (value !== undefined) {
            chunks.push(formEncoded["--"], boundary, formEncoded["\"applied_tags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]);
        }
    }
    chunks.push(formEncoded["--"], boundary, formEncoded["--"]);
    return { type: `multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}`, content: chunks };
    
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
