import * as Discord from 'discord-api-types/v10';
import { EventManager } from './EventManager.js';

export type DiscordMessageEvents =
    & { message: [message: Discord.GatewayReceivePayload] }
    & { [P in Discord.GatewayReceivePayload as P['op']]: [message: P] }
    & { [P in Discord.GatewayDispatchPayload as P['t']]: P extends never ? undefined : [message: P] }

export function emitDiscordMessage<Events extends DiscordMessageEvents>(manager: EventManager<Events>, message: Discord.GatewayReceivePayload) {
    manager.emit('message', message);
    manager.emit(message.op, message as never);
    if (message.op === Discord.GatewayOpcodes.Dispatch)
        manager.emit(message.t, message as never);
}
