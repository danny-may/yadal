import { AbortController, AbortSignal, Blob, URL, abortable, sleep } from '@yadal/dep';
import * as Discord from 'discord-api-types/v10';
import { DiscordGatewayConnection, MessageMap } from './DiscordGatewayConnection';
import { IRateLimit } from './IRateLimit';

export class DiscordGatewayShard {
    readonly #connection: DiscordGatewayConnection;
    readonly #waitIdentified: Promise<unknown>;
    readonly #waitLifecycle: Promise<unknown>;
    readonly #identifyData: Discord.GatewayIdentify | Discord.GatewayResume;
    #ack: boolean;

    get sequenceId(): number | null {
        return this.#connection.sequenceId;
    }

    constructor(options: DiscordGatewayShardOptions) {
        this.#connection = new DiscordGatewayConnection({
            decode: options.decode,
            encode: options.encode,
            rateLimit: options.rateLimit,
            url: options.url
        });

        this.#identifyData = options.identify;
        this.#waitIdentified = this.#identify();
        this.#ack = true;
        this.#waitLifecycle = Promise.all([
            this.#heartbeat(),
            this.#handleHeartbeatAck(),
            this.#defibrillate()
        ]);
    }

    close(code?: number, reason?: string) {
        this.#connection.close(code, reason);
    }

    async send(message: Discord.GatewaySendPayload, signal?: AbortSignal) {
        await this.#connection.send(message, signal);
    }

    async waitOpen(signal?: AbortSignal) {
        return await this.#connection.waitOpen(signal);
    }

    async waitClose(signal?: AbortSignal) {
        return await this.#connection.waitClose(signal);
    }

    async waitIdentified(signal?: AbortSignal) {
        await abortable(this.#waitIdentified, signal);
    }

    async waitLifecycle(signal?: AbortSignal) {
        await abortable(this.#waitLifecycle, signal);
    }

    messages<T extends keyof MessageMap>(type: T, signal?: AbortSignal): AsyncGenerator<MessageMap[T]>
    messages(type?: keyof MessageMap, signal?: AbortSignal): AsyncGenerator<Discord.GatewayReceivePayload>;
    async *messages(type: keyof MessageMap = '*', signal?: AbortSignal) {
        yield* this.#connection.messages(type, signal);
    }

    waitMessage<T extends keyof MessageMap>(type: T, signal?: AbortSignal): Promise<MessageMap[T]>
    waitMessage(type?: keyof MessageMap, signal?: AbortSignal): Promise<Discord.GatewayReceivePayload>;
    async waitMessage(type: keyof MessageMap = '*', signal?: AbortSignal) {
        return await this.#connection.waitMessage(type, signal);
    }

    async #identify() {
        await this.#connection.waitMessage(Discord.GatewayOpcodes.Hello);
        await this.#connection.send(this.#identifyData);
        await this.#connection.waitMessage(Discord.GatewayDispatchEvents.Ready);
    }

    async #handleHeartbeatAck() {
        for await (const _ of this.#connection.messages(Discord.GatewayOpcodes.HeartbeatAck))
            this.#ack = true;
    }

    async #defibrillate() {
        for await (const _ of this.#connection.messages(Discord.GatewayOpcodes.Heartbeat))
            await this.#sendHeartbeat();
    }

    async #heartbeat() {
        const controller = new AbortController();
        try {
            this.#connection.waitClose().then(() => controller.abort(controller));
            const hello = await this.#connection.waitMessage(Discord.GatewayOpcodes.Hello, controller.signal);
            const interval = hello.d.heartbeat_interval;
            await sleep(interval * Math.random(), controller.signal);
            const start = Date.now();
            while (true) {
                await this.#sendHeartbeat(controller.signal);
                await sleep((Date.now() - start) % interval, controller.signal);
            }
        } catch (err) {
            if (err === controller)
                return;
            throw err;
        }
    }

    async #sendHeartbeat(signal?: AbortSignal) {
        if (!this.#ack)
            void this.close();

        this.#ack = false;
        await this.#connection.send({ op: Discord.GatewayOpcodes.Heartbeat, d: this.#connection.sequenceId }, signal);
    }
}

export interface DiscordGatewayShardOptions {
    url: URL;
    identify: Discord.GatewayIdentify | Discord.GatewayResume;
    encode: (value: Discord.GatewaySendPayload, signal?: AbortSignal) => PromiseLike<Blob> | Blob;
    decode: (value: Blob, signal?: AbortSignal) => PromiseLike<Discord.GatewayReceivePayload>;
    rateLimit: IRateLimit<Discord.GatewaySendPayload>
}
