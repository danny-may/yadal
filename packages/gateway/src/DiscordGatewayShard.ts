import { IDiscordGatewayConnectionFactory, SessionConfig } from "./DiscordGatewayConnection";

export class DiscordGatewayShard {
    constructor(options: IDiscordGatewaySessionOptions) {

    }

    connect(config: SessionConfig) {

    }

    disconnect() {

    }
}

export interface IDiscordGatewaySessionOptions {
    connectionFactory: IDiscordGatewayConnectionFactory
}