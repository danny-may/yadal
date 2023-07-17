import * as Discord from "discord-api-types/v10";
import { Deferred } from "@yadal/core";
import { IDiscordGatewayConnection } from "./DiscordGatewayConnection.js";
import { IEventHandle } from "./EventManager.js";

export class Heartbeat {
    #ack: boolean;
    #beatInterval?: NodeJS.Timer;
    readonly #connection: IDiscordGatewayConnection;
    readonly #stopped: Deferred<void>;
    readonly #waitStart: NodeJS.Timeout;
    readonly #ackHandle: IEventHandle;
    readonly #defibrilateHandle: IEventHandle;

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
        this.#waitStart = setTimeout(this.#start.bind(this), this.nextBeat.valueOf() - Date.now());
        this.#ackHandle = this.#connection.handle(Discord.GatewayOpcodes.HeartbeatAck, () => void (this.#ack = true));
        this.#defibrilateHandle = this.#connection.handle(Discord.GatewayOpcodes.Heartbeat, () => this.#beat(true));
    }

    stop() {
        clearTimeout(this.#waitStart);
        clearInterval(this.#beatInterval);
        this.#ackHandle.remove();
        this.#defibrilateHandle.remove();
        this.#stopped.resolve();
    }

    async throwIfErrored() {
        await this.#stopped.wait();
    }

    async #start() {
        this.#beatInterval = setInterval(() => this.#beat(true), this.interval)
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