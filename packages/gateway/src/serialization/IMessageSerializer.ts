import * as Discord from 'discord-api-types/v10';
import { ISerializer } from './ISerializer';

export interface IMessageSerializerFactory {
    createSerializer(): IMessageSerializer;
}

export interface IMessageSerializer {
    readonly type?: string;
    serialize(value: Discord.GatewaySendPayload): ArrayBufferView;
    deserialize(value: ArrayBufferView): Discord.GatewayReceivePayload;
}


export class MessageSerializerFactory implements IMessageSerializerFactory {
    readonly #serializer: ISerializer;
    readonly #type?: string;

    constructor(serializer: ISerializer, type?: string) {
        this.#serializer = serializer;
        this.#type = type;
    }

    createSerializer() {
        return new MessageSerializer(this.#serializer, this.#type);
    }
}

export class MessageSerializer implements IMessageSerializer {
    readonly type?: string;
    readonly #serializer: ISerializer;

    constructor(serializer: ISerializer, type?: string) {
        this.#serializer = serializer;
        this.type = type;
    }

    serialize(value: Discord.GatewaySendPayload): ArrayBufferView {
        return this.#serializer.serialize(value);
    }

    deserialize(value: ArrayBufferView) {
        return this.#serializer.deserialize(value) as Discord.GatewayReceivePayload;
    }
}