import { IDiscordGatewayConnectionFactory, SessionConfig } from "./DiscordGatewayConnection.js";

export class DiscordGatewayShard {
    constructor(_options: IDiscordGatewaySessionOptions) {

    }

    connect(_config: SessionConfig) {

    }

    disconnect() {

    }
}

export interface IDiscordGatewaySessionOptions {
    connectionFactory: IDiscordGatewayConnectionFactory
}