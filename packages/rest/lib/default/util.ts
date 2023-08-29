import { escapeRegex } from '@yadal/core';
import { DiscordFile, DiscordFiles } from '../DiscordFile.js';
import { DiscordRateLimitError, DiscordRestError } from '../errors.js';
import { HttpHeaders, IHttpContent, IHttpResponse } from '../http/index.js';
import { route, RouteParameter } from '../routes/index.js';
import type * as Discord from 'discord-api-types/v10';
import { ErrorResponse, RateLimitError } from '../../ref/discord.js';

export {
    Discord,
    DiscordFile,
    type DiscordFiles,
    type IHttpResponse,
    type IHttpContent
};
export const GET = route('GET');
export const PATCH = route('PATCH');
export const DELETE = route('DELETE');
export const POST = route('POST');
export const PUT = route('PUT');

export const hash = str('hash');
export const code = str('code');
export const entityId = id('id');
export const guildId = id('guildId');
export const eventId = id('eventId');
export const integrationId = id('integrationId');
export const ruleId = id('ruleId');
export const userId = id('userId');
export const roleId = id('roleId');
export const channelId = id('channelId');
export const stickerId = id('stickerId');
export const messageId = id('messageId');
export const emojiId = id('emojiId');
export const permissionId = id('permissionId');
export const applicationId = id('applicationId');
export const achievementId = id('achievementId');
export const commandId = id('commandId');
export const webhookId = id('webhookId');
export const token = str('token');
export const emoji = str('emoji');
export const staticImage = pick('format', 'png', 'jpeg', 'jpg', 'webp');
export const animatableImage = pick('format', 'png', 'jpeg', 'jpg', 'webp', 'gif');

export const byRoute = { global: true, pick: [] } as const;
export const byGuildId = { global: true, pick: ['guildId'] } as const;
export const byChannelId = { global: true, pick: ['channelId'] } as const;
export const byWebhookId = { global: true, pick: ['webhookId'] } as const;
export const byWebhookToken = { global: true, pick: ['webhookId', 'token'] } as const;

const decoder = new TextDecoder();
const encoder = new TextEncoder();

export function id<Key extends PropertyKey>(key: Key): RouteParameter<Key, string | bigint> {
    return {
        key,
        pattern: /^\d+$/,
        parse: BigInt,
        stringify: String
    }
}
export function num<Key extends PropertyKey>(key: Key): RouteParameter<Key, number> {
    return {
        key,
        pattern: /^[+-]?\d+(?:\.\d+)?$/,
        parse: Number,
        stringify: String
    }
}
export function str<Key extends PropertyKey>(key: Key): RouteParameter<Key, string> {
    return {
        key,
        pattern: /^.*$/,
        parse: decodeURIComponent,
        stringify: encodeURIComponent
    }
}
export function pick<Key extends PropertyKey, const Choices extends readonly string[]>(key: Key, ...choices: Choices): RouteParameter<Key, Choices[number]> {
    return {
        key,
        pattern: new RegExp(`^(?:${choices.map(escapeRegex).join('|')})$`),
        parse: String,
        stringify: String
    }
}

type LocaleStringsRaw = { default: string } & Partial<Record<Discord.Locale, string>>;
export type LocaleStrings = { [P in keyof LocaleStringsRaw]: LocaleStringsRaw[P] };
export async function contentResponse(response: IHttpResponse) {
    return response.body;
}
export async function jsonResponse<T>(response: IHttpResponse): Promise<T extends never ? void : T>
export async function jsonResponse(response: IHttpResponse): Promise<unknown> {
    const body = response.body;
    const contentType = body.headers?.get('content-type') ?? '';
    if (!contentType.startsWith('application/json') && !contentType.startsWith('text/json'))
        throw new Error(`Expected response to be json but got ${contentType}`);

    const chunks = [];
    for await (const chunk of body.stream())
        chunks.push(decoder.decode(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)));
    const result = JSON.parse(chunks.join('')) as unknown;

    if (response.status >= 200 && response.status < 400)
        return result;

    if (typeof result === 'object' && result !== null && 'retry_after' in result)
        throw new DiscordRateLimitError(result as RateLimitError);

    throw new DiscordRestError(result as ErrorResponse)
}
export function* queryParams<T extends object>(model: T, props: { [P in AnyKeyOf<T>]-?: boolean }) {
    for (const [key, allow] of Object.entries(props) as Array<[keyof T, boolean]>) {
        if (!allow)
            continue;
        const value = model[key];
        if (value !== undefined)
            yield [key, String(value)] as const;
    }
}
export function auditLogReason(options: { auditLogReason?: string }) {
    const headers = new HttpHeaders();
    if (options.auditLogReason !== undefined)
        headers.set('x-audit-log-reason', options.auditLogReason);
    return headers;
}
export function noContent(response: IHttpResponse) {
    if (response.status !== 204)
        throw new Error(`Expected an empty response (204), but got ${response.status}`);
    return Promise.resolve()
}

type AnyKeyOf<T> = keyof { [P in T as keyof P]: never };
type BodyProps<T> = Exclude<string & AnyKeyOf<T>, `files[${string}]`>;
export function requestBody<T extends object>(model: T, properties: { [P in BodyProps<T>]-?: boolean }): IHttpContent
export function requestBody<T extends object, K extends PropertyKey>(model: { [P in K]: T }, property: K): IHttpContent
export function requestBody<T extends object>(model: T, arg: { [P in keyof T]-?: boolean } | keyof T) {
    if (typeof arg === 'object') {
        return createRequestBody(model, k => arg[k]);
    }
    return createRequestBody(model[arg] as object);
}
const charBytes = {
    '{': encoder.encode('{'),
    '}': encoder.encode('}'),
    ',': encoder.encode(','),
    '\n': encoder.encode('\n')
}
function createRequestBody<T extends object>(model: T, keyFilter: (key: string & keyof T) => boolean = () => true) {
    const json: string[] = [];
    const fields: IFormField[] = [];
    for (const [key, value] of Object.entries(model) as Array<[string & keyof T, unknown]>) {
        if (value === undefined)
            continue;
        if (value instanceof DiscordFile) {
            fields.push(Object.create(value.content, {
                name: { value: key },
                fileName: { value: value.name }
            }))
        } else if (keyFilter(key)) {
            json.push(`${JSON.stringify(key)}:${JSON.stringify(value)}`)
        }
    }
    const content: IHttpContent = {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
        * stream() {
            yield charBytes['{'];
            switch (json.length) {
                case 0:
                    break;
                default: for (const prop of json.slice(0, -1)) {
                    yield encoder.encode(prop);
                    yield charBytes[','];
                }
                // fallthrough
                case 1:
                    yield encoder.encode(json.at(-1));
                    break;
            }
            yield charBytes['}'];
        }
    }
    if (fields.length === 0)
        return content;

    fields.push({
        ...content,
        name: 'payload_json'
    });
    return createFormData(fields);
}
function createFormData(fields: Iterable<IFormField>): IHttpContent {
    const boundary = createFormDataBoundary();
    return {
        headers: new HttpHeaders({
            'content-type': `multipart/form-data; boundary=${boundary}; charset=${encoder.encoding}`
        }),
        async * stream() {
            for (const field of fields) {
                yield encoder.encode(field.fileName === undefined
                    ? `--${boundary}\nContent-Disposition: form-data; name=${encodeURIComponent(field.name)}\n`
                    : `--${boundary}\nContent-Disposition: form-data; name=${encodeURIComponent(field.name)}; filename=${encodeURIComponent(__filename)}\n`);
                for (const [header, value] of field.headers ?? []) {
                    if (header.toLowerCase() === 'content-disposition') {

                    } else {
                        yield encoder.encode(`${header}: ${value}\n`);
                    }
                }
                yield charBytes['\n'];
                yield* field.stream();
                yield charBytes['\n'];
            }
        },
    }
}
const randomHex = () => Math.floor(Math.random() * 1000000000000000).toString(16);
function createFormDataBoundary() {
    return `boundary-${randomHex() + randomHex() + randomHex() + randomHex()}`;
}
interface IFormField extends IHttpContent {
    readonly name: string;
    readonly fileName?: string;
}