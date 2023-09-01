import * as Discord from 'discord-api-types/v10';
import { Deferred, scopedTimeout } from "@yadal/core";
import { IGatewayConnection } from "./GatewayConnection.js";

export class Heartbeat {
    #ack: boolean;
    #seq: null | number;
    readonly #connection: IGatewayConnection;
    readonly #stopped: Deferred<void>;
    readonly #stack: DisposableStack;

    readonly startTime: number;
    readonly interval: number;

    get #nextBeat() {
        const now = Date.now();
        const sinceStart = now - this.startTime;
        if (sinceStart < 0)
            return this.startTime;
        return now + this.interval - sinceStart % this.interval;
    }

    constructor(startTime: number, interval: number, connection: IGatewayConnection) {
        this.startTime = startTime;
        this.interval = interval;
        this.#connection = connection;
        this.#ack = false;
        this.#seq = null;
        this.#stopped = new Deferred<void>();
        this.#stack = new DisposableStack();
        this.#stack.use(scopedTimeout(this.#start.bind(this), this.#nextBeat - Date.now()));
        this.#stack.use(this.#connection.handle({
            [Discord.GatewayOpcodes.Dispatch]: p => this.#seq = p.s,
            [Discord.GatewayOpcodes.HeartbeatAck]: () => this.#ack = true,
            [Discord.GatewayOpcodes.Heartbeat]: () => void this.#beat(true),
            'close': () => this.stop()
        }))
    }

    stop() {
        this.#stopped.resolve();
        this.#stack[Symbol.dispose]();
    }

    get stopped() {
        return this.#stopped.promise;
    }

    async #start() {
        const i = setInterval(() => this.#beat(true), this.interval);
        this.#stack.defer(() => clearInterval(i));
        await this.#beat(false);
    }

    async #beat(checkAck: boolean) {
        try {
            if (checkAck && !this.#ack)
                throw new Error('Previous heartbeat wasnt acknowledged');
            await this.#connection.send({ op: Discord.GatewayOpcodes.Heartbeat, d: this.#seq });
            this.#ack = false;
        } catch (err) {
            this.#stopped.reject(err);
            this.stop();
        }
    }
}