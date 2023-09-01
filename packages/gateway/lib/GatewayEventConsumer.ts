import * as Discord from 'discord-api-types/v10';

export type GatewayEventConsumer = {
    readonly [P in GatewayEvent]?: (...args: GatewayEvents[P]) => void
} & {
    readonly unhandled?: <Event extends GatewayEvent>(event: Event, ...args: GatewayEvents[Event]) => void;
}

export interface CloseDetails {
    readonly code?: number;
    readonly reason?: string;
}

export type GatewayEvent = keyof GatewayEvents;
export type GatewayEvents =
    & { [P in Discord.GatewayReceivePayload as P['op']]: [payload: P]; }
    & { [P in Discord.GatewayDispatchPayload as `${P['t']}`]: [payload: P]; }
    & {
        error: [error: unknown];
        open: [];
        close: [details: CloseDetails];
        send: [payload: Discord.GatewaySendPayload];
    };

export const gatewayEvents = Object.freeze(Object.values(eventMap()));
export function globalGatewayEventConsumer(handler: <Event extends GatewayEvent>(event: Event, ...args: GatewayEvents[Event]) => void) {
    return Object.fromEntries(gatewayEvents.map(e => [e, handler])) as Required<GatewayEventConsumer>
}

function eventMap(): { [P in GatewayEvent]: P } {
    return {
        [Discord.GatewayOpcodes.Hello]: Discord.GatewayOpcodes.Hello,
        [Discord.GatewayOpcodes.Heartbeat]: Discord.GatewayOpcodes.Heartbeat,
        [Discord.GatewayOpcodes.HeartbeatAck]: Discord.GatewayOpcodes.HeartbeatAck,
        [Discord.GatewayOpcodes.InvalidSession]: Discord.GatewayOpcodes.InvalidSession,
        [Discord.GatewayOpcodes.Reconnect]: Discord.GatewayOpcodes.Reconnect,
        [Discord.GatewayOpcodes.Dispatch]: Discord.GatewayOpcodes.Dispatch,
        AUTO_MODERATION_RULE_CREATE: 'AUTO_MODERATION_RULE_CREATE',
        AUTO_MODERATION_RULE_UPDATE: 'AUTO_MODERATION_RULE_UPDATE',
        AUTO_MODERATION_RULE_DELETE: 'AUTO_MODERATION_RULE_DELETE',
        AUTO_MODERATION_ACTION_EXECUTION: 'AUTO_MODERATION_ACTION_EXECUTION',
        APPLICATION_COMMAND_PERMISSIONS_UPDATE: 'APPLICATION_COMMAND_PERMISSIONS_UPDATE',
        CHANNEL_CREATE: 'CHANNEL_CREATE',
        CHANNEL_DELETE: 'CHANNEL_DELETE',
        CHANNEL_UPDATE: 'CHANNEL_UPDATE',
        CHANNEL_PINS_UPDATE: 'CHANNEL_PINS_UPDATE',
        GUILD_BAN_ADD: 'GUILD_BAN_ADD',
        GUILD_BAN_REMOVE: 'GUILD_BAN_REMOVE',
        GUILD_CREATE: 'GUILD_CREATE',
        GUILD_DELETE: 'GUILD_DELETE',
        GUILD_EMOJIS_UPDATE: 'GUILD_EMOJIS_UPDATE',
        GUILD_INTEGRATIONS_UPDATE: 'GUILD_INTEGRATIONS_UPDATE',
        GUILD_MEMBER_ADD: 'GUILD_MEMBER_ADD',
        GUILD_MEMBER_REMOVE: 'GUILD_MEMBER_REMOVE',
        GUILD_MEMBERS_CHUNK: 'GUILD_MEMBERS_CHUNK',
        GUILD_MEMBER_UPDATE: 'GUILD_MEMBER_UPDATE',
        GUILD_UPDATE: 'GUILD_UPDATE',
        GUILD_ROLE_DELETE: 'GUILD_ROLE_DELETE',
        GUILD_ROLE_CREATE: 'GUILD_ROLE_CREATE',
        GUILD_ROLE_UPDATE: 'GUILD_ROLE_UPDATE',
        GUILD_SCHEDULED_EVENT_CREATE: 'GUILD_SCHEDULED_EVENT_CREATE',
        GUILD_SCHEDULED_EVENT_UPDATE: 'GUILD_SCHEDULED_EVENT_UPDATE',
        GUILD_SCHEDULED_EVENT_DELETE: 'GUILD_SCHEDULED_EVENT_DELETE',
        GUILD_SCHEDULED_EVENT_USER_ADD: 'GUILD_SCHEDULED_EVENT_USER_ADD',
        GUILD_SCHEDULED_EVENT_USER_REMOVE: 'GUILD_SCHEDULED_EVENT_USER_REMOVE',
        GUILD_STICKERS_UPDATE: 'GUILD_STICKERS_UPDATE',
        INTEGRATION_CREATE: 'INTEGRATION_CREATE',
        INTEGRATION_DELETE: 'INTEGRATION_DELETE',
        INTEGRATION_UPDATE: 'INTEGRATION_UPDATE',
        INTERACTION_CREATE: 'INTERACTION_CREATE',
        INVITE_CREATE: 'INVITE_CREATE',
        INVITE_DELETE: 'INVITE_DELETE',
        MESSAGE_CREATE: 'MESSAGE_CREATE',
        MESSAGE_DELETE_BULK: 'MESSAGE_DELETE_BULK',
        MESSAGE_DELETE: 'MESSAGE_DELETE',
        MESSAGE_REACTION_ADD: 'MESSAGE_REACTION_ADD',
        MESSAGE_REACTION_REMOVE_ALL: 'MESSAGE_REACTION_REMOVE_ALL',
        MESSAGE_REACTION_REMOVE: 'MESSAGE_REACTION_REMOVE',
        MESSAGE_REACTION_REMOVE_EMOJI: 'MESSAGE_REACTION_REMOVE_EMOJI',
        MESSAGE_UPDATE: 'MESSAGE_UPDATE',
        PRESENCE_UPDATE: 'PRESENCE_UPDATE',
        STAGE_INSTANCE_CREATE: 'STAGE_INSTANCE_CREATE',
        STAGE_INSTANCE_DELETE: 'STAGE_INSTANCE_DELETE',
        STAGE_INSTANCE_UPDATE: 'STAGE_INSTANCE_UPDATE',
        READY: 'READY',
        RESUMED: 'RESUMED',
        THREAD_LIST_SYNC: 'THREAD_LIST_SYNC',
        THREAD_MEMBERS_UPDATE: 'THREAD_MEMBERS_UPDATE',
        THREAD_MEMBER_UPDATE: 'THREAD_MEMBER_UPDATE',
        THREAD_CREATE: 'THREAD_CREATE',
        THREAD_DELETE: 'THREAD_DELETE',
        THREAD_UPDATE: 'THREAD_UPDATE',
        TYPING_START: 'TYPING_START',
        USER_UPDATE: 'USER_UPDATE',
        VOICE_SERVER_UPDATE: 'VOICE_SERVER_UPDATE',
        VOICE_STATE_UPDATE: 'VOICE_STATE_UPDATE',
        WEBHOOKS_UPDATE: 'WEBHOOKS_UPDATE',
        GUILD_AUDIT_LOG_ENTRY_CREATE: 'GUILD_AUDIT_LOG_ENTRY_CREATE',
        error: 'error',
        open: 'open',
        close: 'close',
        send: 'send'
    }
}