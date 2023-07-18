import * as Discord from "discord-api-types/v10";
import { Deferred, Timeout } from "@yadal/core";
import { IDiscordGatewayConnection } from "./DiscordGatewayConnection.js";

export class Heartbeat {
    #ack: boolean;
    readonly #connection: IDiscordGatewayConnection;
    readonly #stopped: Deferred<void>;
    readonly #stack: DisposableStack;

    readonly startTime: Date;
    readonly interval: number;

    get nextBeat() {
        const now = Date.now();
        const sinceStart = now - this.startTime.valueOf();
        if (sinceStart < 0)
            return this.startTime;
        return new Date(now + this.interval - sinceStart % this.interval);
    }

    constructor(startTime: Date, interval: number, connection: IDiscordGatewayConnection) {
        this.startTime = startTime;
        this.interval = interval;
        this.#connection = connection;
        this.#ack = false;
        this.#stopped = new Deferred<void>();
        this.#stack = new DisposableStack();
        this.#stack.use(new Timeout(this.#start.bind(this), this.nextBeat.valueOf() - Date.now()));
        this.#stack.use(this.#connection.handle(Discord.GatewayOpcodes.HeartbeatAck, () => void (this.#ack = true)));
        this.#stack.use(this.#connection.handle(Discord.GatewayOpcodes.Heartbeat, () => this.#beat(true)));
    }

    stop() {
        this.#stopped.resolve();
        this.#stack[Symbol.dispose]();
    }

    async throwIfErrored() {
        await this.#stopped.wait();
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
            await this.#connection.send({ op: Discord.GatewayOpcodes.Heartbeat, d: this.#connection.sequenceId });
            this.#ack = false;
        } catch (err) {
            this.#stopped.reject(err);
            this.stop();
        }
    }
}