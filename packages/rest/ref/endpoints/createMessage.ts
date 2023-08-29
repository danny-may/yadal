/*
 * Auto generated file, do not edit
 */
import { type CreateMessageRequestPath, type CreateMessageRequestHeaders, type RateLimitError, type MessageResponse, type ErrorResponse, type MessageCreateRequest, type CreateMessageRequestFormData } from '../discord.js';
import { DiscordRestError, DiscordRateLimitError } from '../helpers.js';
export const name = "createMessage";
export type RouteModel = CreateMessageRequestPath;
const routeRegex = /^\/channels\/(?<channel_id>.*?)\/messages$/i;
export const route = {
    method: "POST",
    template: "/channels/{channel_id}/messages",
    keys: Object.freeze(["channel_id"] as const),
    get regex(){
        return /^\/channels\/(?<channel_id>.*?)\/messages$/i;
    },
    create(model: RouteModel) {
        return `/channels/${encodeURIComponent(model.channel_id)}/messages` as const satisfies `/${string}`;
    },
    test(url: `/${string}`) {
        return routeRegex.test(url);
    },
    parse(url: `/${string}`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ["channel_id"]: decodeURIComponent(match.groups!["channel_id"]!)
        }
    },
    rateLimitBuckets(model: { ["channel_id"]: RouteModel["channel_id"] | string; }) {
        return ["global", `post /channels/${model.channel_id}/messages`] as const;
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
export type HeaderModel = CreateMessageRequestHeaders;
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
export type Body = (MessageCreateRequest | CreateMessageRequestFormData);
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
    if ("sticker_ids" in model) {
        const value = model["sticker_ids"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"sticker_ids\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    if ("flags" in model) {
        const value = model["flags"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"flags\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    if ("message_reference" in model) {
        const value = model["message_reference"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"message_reference\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
            )
        }
    }
    if ("nonce" in model) {
        const value = model["nonce"];
        if (value !== undefined) {
            chunks.push(
                formEncoded["--"], boundary, formEncoded["\"nonce\".1"], encoder.encode(JSON.stringify(value)), formEncoded["lf"]
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
    if ("files[0]" in model) {
        const value = model["files[0]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[0]\".1"], encoder.encode(encodeURIComponent(name ?? "files[0]")), formEncoded["\"files[0]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[1]" in model) {
        const value = model["files[1]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[1]\".1"], encoder.encode(encodeURIComponent(name ?? "files[1]")), formEncoded["\"files[1]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[2]" in model) {
        const value = model["files[2]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[2]\".1"], encoder.encode(encodeURIComponent(name ?? "files[2]")), formEncoded["\"files[2]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[3]" in model) {
        const value = model["files[3]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[3]\".1"], encoder.encode(encodeURIComponent(name ?? "files[3]")), formEncoded["\"files[3]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[4]" in model) {
        const value = model["files[4]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[4]\".1"], encoder.encode(encodeURIComponent(name ?? "files[4]")), formEncoded["\"files[4]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[5]" in model) {
        const value = model["files[5]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[5]\".1"], encoder.encode(encodeURIComponent(name ?? "files[5]")), formEncoded["\"files[5]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[6]" in model) {
        const value = model["files[6]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[6]\".1"], encoder.encode(encodeURIComponent(name ?? "files[6]")), formEncoded["\"files[6]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[7]" in model) {
        const value = model["files[7]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[7]\".1"], encoder.encode(encodeURIComponent(name ?? "files[7]")), formEncoded["\"files[7]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[8]" in model) {
        const value = model["files[8]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[8]\".1"], encoder.encode(encodeURIComponent(name ?? "files[8]")), formEncoded["\"files[8]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
            )
        }
    }
    if ("files[9]" in model) {
        const value = model["files[9]"];
        if (value !== undefined) {
            chunks.push(
                ...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded["\"files[9]\".1"], encoder.encode(encodeURIComponent(name ?? "files[9]")), formEncoded["\"files[9]\".2"], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(value)
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
    "\"sticker_ids\".1":encoder.encode("\nContent-Disposition: form-data; name=sticker_ids\nContent-Type: application/json\n\n"),
    "\"components\".1":encoder.encode("\nContent-Disposition: form-data; name=components\nContent-Type: application/json\n\n"),
    "\"flags\".1":encoder.encode("\nContent-Disposition: form-data; name=flags\nContent-Type: application/json\n\n"),
    "\"attachments\".1":encoder.encode("\nContent-Disposition: form-data; name=attachments\nContent-Type: application/json\n\n"),
    "\"message_reference\".1":encoder.encode("\nContent-Disposition: form-data; name=message_reference\nContent-Type: application/json\n\n"),
    "\"nonce\".1":encoder.encode("\nContent-Disposition: form-data; name=nonce\nContent-Type: application/json\n\n"),
    "\"tts\".1":encoder.encode("\nContent-Disposition: form-data; name=tts\nContent-Type: application/json\n\n"),
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
