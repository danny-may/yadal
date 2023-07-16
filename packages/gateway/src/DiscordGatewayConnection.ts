import * as Discord from 'discord-api-types/v10';
import { IRateLimit, IRateLimitFactory } from './IRateLimit';
import { WebSocket, WebSocketFactory } from './socket';
import { EventListener, EventManager } from './EventManager';
import { DiscordMessageEvents, emitDiscordMessage } from './emitDiscordMessage';
import { Heartbeat } from './Heartbeat';
import { URL } from 'url';
import { IMessageCompressor, IMessageCompressorFactory } from './compression';
import { IMessageSerializer, IMessageSerializerFactory } from './serialization';

export interface IDiscordGatewayConnectionFactory {
    createConnection(config: SessionConfig): IDiscordGatewayConnection;
}

export interface IDiscordGatewayConnection extends EventListener<GatewayConnectionEvents> {
    get sequenceId(): number | null;
    close(code?: number, reason?: string): void;
    send(payload: Discord.GatewaySendPayload, signal?: AbortSignal): Promise<boolean>;
    waitComplete(signal?: AbortSignal): Promise<DiscordGatewayDisconnectData>;
}

export type DiscordGatewayDisconnectData =
    | { code?: number; reason?: string; timestamp: Date, reconnect: true, resume: SessionResumeData }
    | { code?: number; reason?: string; timestamp: Date, reconnect: boolean, resume?: undefined }

export type GatewayConnectionEvents =
    & DiscordMessageEvents
    & {
        connected: [timestamp: Date],
        disconnected: [data: DiscordGatewayDisconnectData],
        done: [timestamp: Date],
        sent: [payload: Discord.GatewaySendPayload]
    }

export class DiscordGatewayConnectionFactory implements IDiscordGatewayConnectionFactory {
    readonly #options: DiscordGatewayConnectionFactoryOptions;
    constructor(options: DiscordGatewayConnectionFactoryOptions) {
        this.#options = options;
    }

    createConnection(config: SessionConfig): IDiscordGatewayConnection {
        return new DiscordGatewayConnection({
            ...this.#options,
            config
        })
    }
}

const closeCode = {
    endSession: 1000,
    endSessionAlso: 1000,
    resumable: 3000
}

export class DiscordGatewayConnection extends EventListener<GatewayConnectionEvents> implements IDiscordGatewayConnection {
    readonly #socket: WebSocket;
    readonly #rateLimit: IRateLimit<Discord.GatewaySendPayload>;
    readonly #serializer: IMessageSerializer;
    readonly #compressor: IMessageCompressor;
    readonly #events: EventManager<GatewayConnectionEvents>;
    #sequenceId: number | null = null;
    #pending = 0;
    #isOpen?: boolean;
    #resumeData?: Omit<SessionResumeData, 'seq'>;

    get sequenceId() {
        return this.#sequenceId;
    }

    constructor(options: DiscordGatewayConnectionOptions) {
        const events = new EventManager<GatewayConnectionEvents>();
        super(events);
        this.#events = events;

        this.#rateLimit = options.rateLimit.createRateLimit();
        this.#serializer = options.serializer.createSerializer();
        this.#compressor = options.compressor.createCompressor();

        this.once(Discord.GatewayOpcodes.Reconnect, () => this.close(closeCode.resumable, 'Disconnect due to requested reconnect'));
        this.once(Discord.GatewayOpcodes.InvalidSession, m => this.close(closeCode[m.d ? 'resumable' : 'endSession'], 'Disconnected due to invalid session'));

        const url = this.#getUrl(options.config.url);
        this.#socket = options.socket.createSocket(url);
        this.#socket.on('message', m => void this.#processMessage(m));
        this.#socket.once('open', () => void this.#initializeConnection(options.config));
        this.#socket.once('close', (...args) => this.#finalizeConnection(...args));
    }

    #getUrl(url: URL) {
        url = new URL(url.toString());
        setHeader(url, 'encoding', this.#serializer.type);
        setHeader(url, 'compress', getTransportCompression(this.#compressor.type));
        return url;
    }

    async #initializeConnection(config: SessionConfig) {
        if (!(this.#isOpen ??= true))
            return;

        this.#pending++;
        this.#socket.once('close', () => {
            if (--this.#pending === 0)
                this.#events.set('done', new Date())
        });

        try {
            const [heartbeat, [sessionId, reconnectUrl]] = await Promise.all([
                this.#createHeartbeat(config),
                this.#authenticate(config)
            ]);
            this.#socket.once('close', () => heartbeat.stop());
            this.#resumeData = {
                heartbeat: { ...heartbeat },
                session_id: sessionId,
                token: config.token,
                url: reconnectUrl
            }
            await heartbeat.throwIfErrored();
        } catch (error) {
            this.#events.emit('error', error);
        } finally {
            this.close(closeCode.endSession);
        }
    }

    #finalizeConnection(code?: number, reason?: string) {
        this.#isOpen = false;
        const common = { code, reason, timestamp: new Date() };
        const reconnectable = !unrecoverableCloseCodes.has(code ??= 0);
        const resumable = !reidentifyCloseCodes.has(code) && this.#resumeData !== undefined && this.#sequenceId !== null;
        this.#events.set('disconnected', resumable
            ? { ...common, reconnect: true, resume: { ...this.#resumeData!, seq: this.#sequenceId! } }
            : { ...common, reconnect: reconnectable });
    }

    async #createHeartbeat(config: SessionConfig) {
        if ('heartbeat' in config)
            return new Heartbeat(config.heartbeat.startTime, config.heartbeat.interval, this);

        const { d: hello } = await this.wait(Discord.GatewayOpcodes.Hello, { throw: ['done', 'disconnected'] });
        const start = new Date(Date.now() + Math.random() * hello.heartbeat_interval);
        return new Heartbeat(start, hello.heartbeat_interval, this);
    }

    async #authenticate(config: SessionConfig) {
        const result = 'session_id' in config
            ? await this.#resume(config)
            : await this.#identify(config);
        this.#events.set('connected', new Date());
        return result;
    }

    async #resume(config: SessionResumeData) {
        const payload: Discord.GatewayResumeData = {
            seq: config.seq,
            session_id: config.session_id,
            token: config.token
        }
        if (!await this.send({ op: Discord.GatewayOpcodes.Resume, d: payload }))
            throw new Error('Failed to send resume message');
        await this.wait(Discord.GatewayDispatchEvents.Resumed, { throw: ['done', 'disconnected'] })
        return [config.session_id, config.url] as const;
    }

    async #identify(config: SessionIdentifyData) {
        await this.wait(Discord.GatewayOpcodes.Hello, { throw: ['done', 'disconnected'] });
        const payload: Discord.GatewayIdentifyData = {
            intents: config.intents,
            properties: config.properties,
            token: config.token,
            compress: this.#compressor.type === 'payload',
            large_threshold: config.large_threshold,
            presence: config.presence,
            shard: config.shard
        }
        if (!await this.send({ op: Discord.GatewayOpcodes.Identify, d: payload }))
            throw new Error('Failed to send identify message')
        const ready = await this.wait(Discord.GatewayDispatchEvents.Ready, { throw: ['done', 'disconnected'] });
        return [ready.d.session_id, new URL(ready.d.resume_gateway_url)] as const;
    }

    async #processMessage(message: ArrayBufferView) {
        this.#pending++;
        try {
            for (const data of this.#compressor.decompress(message)) {
                const payload = this.#serializer.deserialize(data);
                if (typeof payload.s === 'number')
                    this.#sequenceId = payload.s;
                emitDiscordMessage(this.#events, payload);
            }
        } catch (error) {
            this.#events.emit('error', error);
        } finally {
            if (--this.#pending === 0)
                this.#events.set('done', new Date());
        }
    }

    close(code?: number, reason?: string) {
        this.#socket.close(code, reason);
    }

    async send(message: Discord.GatewaySendPayload, signal?: AbortSignal) {
        if (!anonymousOpCodes.has(message.op))
            await this.wait(['connected', 'disconnected'], { signal });
        if (!this.#isOpen)
            return false;

        await this.#rateLimit.wait(message, signal);
        if (!this.#isOpen)
            return false;

        try {
            this.#socket.send(this.#serializer.serialize(message));
            this.#events.emit('sent', message);
            return true;
        } catch {
            return false;
        }
    }

    async waitComplete(signal?: AbortSignal) {
        const [result] = await Promise.all([
            this.wait('disconnected', { signal }),
            this.wait('done', { signal })
        ]);
        return result;
    }
}

export interface DiscordGatewayConnectionFactoryOptions {
    readonly socket: WebSocketFactory;
    readonly rateLimit: IRateLimitFactory<Discord.GatewaySendPayload>;
    readonly serializer: IMessageSerializerFactory;
    readonly compressor: IMessageCompressorFactory;
}

export interface DiscordGatewayConnectionOptions extends DiscordGatewayConnectionFactoryOptions {
    readonly config: SessionConfig;
}

export type SessionConfig =
    | SessionIdentifyData
    | SessionResumeData

export interface SessionIdentifyData extends Discord.GatewayIdentifyData {
    readonly url: URL;
}

export interface SessionResumeData extends Discord.GatewayResumeData {
    readonly url: URL;
    readonly heartbeat: {
        readonly startTime: Date;
        readonly interval: number;
    }
}

const transportCompressionPrefix: IMessageCompressor['type'] = 'transport:';
function getTransportCompression(compressionType: IMessageCompressor['type']) {
    if (!compressionType.startsWith(transportCompressionPrefix))
        return undefined;

    return compressionType.slice(transportCompressionPrefix.length);
}

const anonymousOpCodes = new Set([
    Discord.GatewayOpcodes.Identify,
    Discord.GatewayOpcodes.Resume,
    Discord.GatewayOpcodes.Heartbeat
]);

const unrecoverableCloseCodes = new Set([
    Discord.GatewayCloseCodes.AuthenticationFailed,
    Discord.GatewayCloseCodes.InvalidShard,
    Discord.GatewayCloseCodes.InvalidAPIVersion,
    Discord.GatewayCloseCodes.ShardingRequired,
    Discord.GatewayCloseCodes.InvalidIntents,
    Discord.GatewayCloseCodes.DisallowedIntents
]);

const reidentifyCloseCodes = new Set([
    ...unrecoverableCloseCodes,
    closeCode.endSession,
    closeCode.endSessionAlso,
    Discord.GatewayCloseCodes.NotAuthenticated,
    Discord.GatewayCloseCodes.InvalidSeq,
    Discord.GatewayCloseCodes.SessionTimedOut
]);

function setHeader(url: URL, key: string, value: string | undefined) {
    if (value === undefined)
        url.searchParams.delete(key);
    else
        url.searchParams.set(key, value);
}
