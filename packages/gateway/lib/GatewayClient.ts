import * as Discord from 'discord-api-types/v10';
import { Deferred, SnakeCaseToPascalCase, abortListener } from '@yadal/core';
import { IGatewayConnection } from './GatewayConnection.js';
import { GatewayEvents, CloseDetails } from './GatewayEventConsumer.js';
import { GatewayEventEmitter } from './GatewayEventEmitter.js';

interface EventHandlerRegister<T extends keyof GatewayEvents> {
    (handler: (...args: GatewayEvents[T]) => unknown): Disposable;
    <This>(handler: (this: This, ...args: GatewayEvents[T]) => unknown, thisArg: This): Disposable;
}

type DispatchOpCodeNameMap =
    & { [P in Discord.GatewayDispatchEvents as `${P}`]: SnakeCaseToPascalCase<Lowercase<P>> }
    & { [P in keyof typeof Discord.GatewayOpcodes as Discord.GatewayOpcodes & typeof Discord.GatewayOpcodes[P]]: P }

type SendMethods = { [P in Discord.GatewaySendPayload as `send${DispatchOpCodeNameMap[P['op']]}`]: (message: P['d'], signal?: AbortSignal) => Promise<void>; }
type GatewaySendNameMap = { [P in Discord.GatewaySendPayload['op']]: DispatchOpCodeNameMap[P]; }
type GatewayEventNameMap = { [P in keyof GatewayEvents]: P extends keyof DispatchOpCodeNameMap ? DispatchOpCodeNameMap[P] : SnakeCaseToPascalCase<Lowercase<`${P}`>>; }
type EventWaitResult<Event extends keyof GatewayEvents> = [GatewayEvents[Event][0]] extends [never] ? void : GatewayEvents[Event][0];
type EventWaitOneOfResult<Event extends keyof GatewayEvents> = { [P in Event]: { event: P; result: EventWaitResult<P> } }[Event];
type EventMethods =
    & { [P in keyof GatewayEvents as `${'on' | 'once'}${GatewayEventNameMap[P]}`]: EventHandlerRegister<P> }
    & { [P in keyof GatewayEvents as `wait${GatewayEventNameMap[P]}`]: (signal?: AbortSignal) => Promise<EventWaitResult<P>> }

export interface IGatewayClientFactory {
    createClient(connection: IGatewayConnection): IGatewayClient;
}
export class GatewayClientFactory implements IGatewayClientFactory {
    createClient(connection: IGatewayConnection): IGatewayClient {
        return new GatewayClient({ connection })
    }
}

export interface IGatewayClient extends SendMethods, EventMethods {
    close(code?: number, reason?: string): void;
    on<Event extends keyof GatewayEvents>(event: Event, handler: (...args: GatewayEvents[Event]) => unknown): Disposable;
    on<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This, ...args: GatewayEvents[Event]) => unknown, thisArg: This): Disposable;
    once<Event extends keyof GatewayEvents>(event: Event, handler: (...args: GatewayEvents[Event]) => unknown): Disposable;
    once<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This, ...args: GatewayEvents[Event]) => unknown, thisArg: This): Disposable;
    wait<Event extends keyof GatewayEvents>(event: Event, signal?: AbortSignal): Promise<EventWaitResult<Event>>;
    waitOneOf<Event extends keyof GatewayEvents>(events: readonly Event[], signal?: AbortSignal): Promise<EventWaitOneOfResult<Event>>;
}

const { receiveNameMap, sendNameMap } = config();
export interface GatewayClient extends SendMethods, EventMethods { }
export class GatewayClient implements IGatewayClient {
    readonly #connection: IGatewayConnection;
    readonly #emitter: GatewayEventEmitter;
    #open: boolean;
    #closeData?: CloseDetails;

    constructor(options: GatewayClientOptions) {
        this.#connection = options.connection;
        this.#open = false;
        this.#emitter = new GatewayEventEmitter();

        this.#connection.handle(this.#emitter.asConsumer());

        this.onOpen(() => this.#open = true);
        this.onClose(x => {
            this.#open = false;
            this.#closeData = x;
        });
    }

    static {
        for (const [opCodeStr, name] of sendNameMap) {
            const opCode = Number(opCodeStr) as Discord.GatewaySendPayload['op'];
            Object.assign(this.prototype, {
                async [`send${name}`](this: GatewayClient, message: Discord.GatewaySendPayload['d'], signal?: AbortSignal) {
                    return await this.#send(opCode, message, signal);
                }
            })
        }
        for (const [event, name] of receiveNameMap) {
            Object.assign(this.prototype, {
                [`once${name}`]<This>(this: GatewayClient, handler: (this: This, ...args: unknown[]) => unknown, thisArg: This) {
                    return this.once(event, handler, thisArg);
                },
                [`on${name}`]<This>(this: GatewayClient, handler: (this: This, ...args: unknown[]) => unknown, thisArg: This) {
                    return this.on(event, handler, thisArg);
                },
                [`wait${name}`](this: GatewayClient, signal?: AbortSignal) {
                    return this.wait(event, signal);
                }
            })
        }
    }

    close(code?: number, reason?: string) {
        this.#connection.close(code, reason);
    }

    on<Event extends keyof GatewayEvents>(event: Event, handler: (...args: GatewayEvents[Event]) => unknown): Disposable
    on<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This, ...args: GatewayEvents[Event]) => unknown, thisArg: This): Disposable
    on<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This | undefined, ...args: GatewayEvents[Event]) => unknown, thisArg?: This): Disposable {
        return this.#emitter.handle({ [event]: handler.bind(thisArg) })
    }

    once<Event extends keyof GatewayEvents>(event: Event, handler: (...args: GatewayEvents[Event]) => unknown): Disposable
    once<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This, ...args: GatewayEvents[Event]) => unknown, thisArg: This): Disposable
    once<Event extends keyof GatewayEvents, This>(event: Event, handler: (this: This | undefined, ...args: GatewayEvents[Event]) => unknown, thisArg?: This): Disposable {
        const handle = this.on(event, function (...args) {
            handle[Symbol.dispose]();
            return handler.call(this, ...args);
        } as typeof handler, thisArg)
        return handle;
    }

    wait<Event extends keyof GatewayEvents>(event: Event, signal?: AbortSignal): Promise<EventWaitResult<Event>>;
    async wait(event: keyof GatewayEvents, signal?: AbortSignal) {
        switch (this.#shortCircuitWait([event])) {
            case 'close': return this.#closeData;
            case 'open': return undefined;
        }

        const deferred = new Deferred<unknown>();
        using stack = new DisposableStack();
        stack.use(abortListener(signal, deferred.reject));
        stack.use(this.on(event, (...data) => deferred.resolve(data[0])));
        if (event !== 'close')
            this.#rejectOnClose(stack, deferred);
        return await deferred.promise as EventWaitResult<keyof GatewayEvents>;
    }

    waitOneOf<Event extends keyof GatewayEvents>(events: readonly Event[], signal?: AbortSignal): Promise<EventWaitOneOfResult<Event>>
    async waitOneOf(events: ReadonlyArray<keyof GatewayEvents>, signal?: AbortSignal) {
        if (events.length === 0)
            throw new Error('No events supplied');
        switch (this.#shortCircuitWait(events)) {
            case 'close': return { event: 'close', result: this.#closeData };
            case 'open': return { event: 'open', result: undefined };
        }

        const deferred = new Deferred<{ event: keyof GatewayEvents, result: EventWaitResult<keyof GatewayEvents> }>();
        using stack = new DisposableStack();
        stack.use(abortListener(signal, deferred.reject));
        for (const event of events)
            stack.use(this.on(event, (result?) => deferred.resolve({ event, result })));
        if (!events.includes('close'))
            this.#rejectOnClose(stack, deferred);
        return await deferred.promise as EventWaitOneOfResult<keyof GatewayEvents>;
    }

    async #send<P extends Discord.GatewaySendPayload>(opCode: P['op'], message: P['d'], signal?: AbortSignal) {
        await this.#connection.send({ op: opCode, d: message } as Discord.GatewaySendPayload, signal);
    }

    #shortCircuitWait(events: ReadonlyArray<keyof GatewayEvents>) {
        if (this.#closeData !== undefined) {
            if (events.includes('close'))
                return 'close';
            throw new Error('Connection is closed')
        }
        if (this.#open && events.includes('open'))
            return 'open';
        return 'other';
    }

    #rejectOnClose<T>(stack: DisposableStack, deferred: Deferred<T>) {
        stack.use(this.onClose(() => deferred.reject(new Error('Connection closed'))));
    }
}

interface GatewayClientOptions {
    readonly connection: IGatewayConnection;
}

function config() {
    const sendNameMap: GatewaySendNameMap = {
        1: 'Heartbeat',
        2: 'Identify',
        3: 'PresenceUpdate',
        4: 'VoiceStateUpdate',
        6: 'Resume',
        8: 'RequestGuildMembers'
    };
    const receiveNameMap: GatewayEventNameMap = {
        close: 'Close',
        error: 'Error',
        open: 'Open',
        send: 'Send',
        0: 'Dispatch',
        1: 'Heartbeat',
        7: 'Reconnect',
        9: 'InvalidSession',
        10: 'Hello',
        11: 'HeartbeatAck',
        APPLICATION_COMMAND_PERMISSIONS_UPDATE: 'ApplicationCommandPermissionsUpdate',
        CHANNEL_CREATE: 'ChannelCreate',
        CHANNEL_DELETE: 'ChannelDelete',
        CHANNEL_PINS_UPDATE: 'ChannelPinsUpdate',
        CHANNEL_UPDATE: 'ChannelUpdate',
        GUILD_BAN_ADD: 'GuildBanAdd',
        GUILD_BAN_REMOVE: 'GuildBanRemove',
        GUILD_CREATE: 'GuildCreate',
        GUILD_DELETE: 'GuildDelete',
        GUILD_EMOJIS_UPDATE: 'GuildEmojisUpdate',
        GUILD_INTEGRATIONS_UPDATE: 'GuildIntegrationsUpdate',
        GUILD_MEMBER_ADD: 'GuildMemberAdd',
        GUILD_MEMBER_REMOVE: 'GuildMemberRemove',
        GUILD_MEMBERS_CHUNK: 'GuildMembersChunk',
        GUILD_MEMBER_UPDATE: 'GuildMemberUpdate',
        GUILD_ROLE_CREATE: 'GuildRoleCreate',
        GUILD_ROLE_DELETE: 'GuildRoleDelete',
        GUILD_ROLE_UPDATE: 'GuildRoleUpdate',
        GUILD_STICKERS_UPDATE: 'GuildStickersUpdate',
        GUILD_UPDATE: 'GuildUpdate',
        INTEGRATION_CREATE: 'IntegrationCreate',
        INTEGRATION_DELETE: 'IntegrationDelete',
        INTEGRATION_UPDATE: 'IntegrationUpdate',
        INTERACTION_CREATE: 'InteractionCreate',
        INVITE_CREATE: 'InviteCreate',
        INVITE_DELETE: 'InviteDelete',
        MESSAGE_CREATE: 'MessageCreate',
        MESSAGE_DELETE: 'MessageDelete',
        MESSAGE_DELETE_BULK: 'MessageDeleteBulk',
        MESSAGE_REACTION_ADD: 'MessageReactionAdd',
        MESSAGE_REACTION_REMOVE: 'MessageReactionRemove',
        MESSAGE_REACTION_REMOVE_ALL: 'MessageReactionRemoveAll',
        MESSAGE_REACTION_REMOVE_EMOJI: 'MessageReactionRemoveEmoji',
        MESSAGE_UPDATE: 'MessageUpdate',
        PRESENCE_UPDATE: 'PresenceUpdate',
        STAGE_INSTANCE_CREATE: 'StageInstanceCreate',
        STAGE_INSTANCE_DELETE: 'StageInstanceDelete',
        STAGE_INSTANCE_UPDATE: 'StageInstanceUpdate',
        READY: 'Ready',
        RESUMED: 'Resumed',
        THREAD_CREATE: 'ThreadCreate',
        THREAD_DELETE: 'ThreadDelete',
        THREAD_LIST_SYNC: 'ThreadListSync',
        THREAD_MEMBERS_UPDATE: 'ThreadMembersUpdate',
        THREAD_MEMBER_UPDATE: 'ThreadMemberUpdate',
        THREAD_UPDATE: 'ThreadUpdate',
        TYPING_START: 'TypingStart',
        USER_UPDATE: 'UserUpdate',
        VOICE_SERVER_UPDATE: 'VoiceServerUpdate',
        VOICE_STATE_UPDATE: 'VoiceStateUpdate',
        WEBHOOKS_UPDATE: 'WebhooksUpdate',
        GUILD_SCHEDULED_EVENT_CREATE: 'GuildScheduledEventCreate',
        GUILD_SCHEDULED_EVENT_UPDATE: 'GuildScheduledEventUpdate',
        GUILD_SCHEDULED_EVENT_DELETE: 'GuildScheduledEventDelete',
        GUILD_SCHEDULED_EVENT_USER_ADD: 'GuildScheduledEventUserAdd',
        GUILD_SCHEDULED_EVENT_USER_REMOVE: 'GuildScheduledEventUserRemove',
        AUTO_MODERATION_RULE_CREATE: 'AutoModerationRuleCreate',
        AUTO_MODERATION_RULE_UPDATE: 'AutoModerationRuleUpdate',
        AUTO_MODERATION_RULE_DELETE: 'AutoModerationRuleDelete',
        AUTO_MODERATION_ACTION_EXECUTION: 'AutoModerationActionExecution',
        GUILD_AUDIT_LOG_ENTRY_CREATE: 'GuildAuditLogEntryCreate'
    }
    return { sendNameMap: entries(sendNameMap), receiveNameMap: entries(receiveNameMap) };
}
function entries<T extends object>(source: T) {
    return Object.entries(source) as Array<{ [P in keyof T]: P extends number | string ? [P, T[P]] : never }[keyof T]>;
}