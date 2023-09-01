import * as Discord from 'discord-api-types/v10';
import { Heartbeat } from './Heartbeat.js';
import { Deferred, abortListener, waitAll } from '@yadal/core';
import { IGatewayConnection } from './GatewayConnection.js';
import { CloseDetails, GatewayEvents } from './GatewayEventConsumer.js';

export type LifecycleResult =
    & CloseDetails
    & (
        | { reconnect: true; resume: { url?: string; config: GatewayResumeData }; }
        | { reconnect: boolean; resume: undefined }
    )

export async function connectionLifecycle(connection: IGatewayConnection, config: SessionConfig, signal?: AbortSignal): Promise<LifecycleResult> {
    let sequenceId = null;
    const waitClose = new Deferred<CloseDetails>();
    using stack = new DisposableStack();
    stack.use(abortListener(signal, () => connection.close(closeCodes.endSession, 'Disconnect due to abort signal')));
    stack.use(connection.handle({
        [Discord.GatewayOpcodes.Reconnect]: () => connection.close(closeCodes.resumable, 'Disconnect due to requested reconnect'),
        [Discord.GatewayOpcodes.InvalidSession]: p => connection.close(closeCodes[p.d ? 'resumable' : 'endSession'], 'Disconnected due to invalid session'),
        [Discord.GatewayOpcodes.Dispatch]: p => sequenceId = p.s,
        close: d => waitClose.resolve(d)
    }))

    const [heart, session, closed] = await waitAll([
        heartbeat(connection, config, signal),
        'session_id' in config
            ? resume(connection, config, signal)
            : identify(connection, config, signal),
        waitClose.promise
    ]);

    const closeCode = closed.code ?? 0;
    if (!canResume(closeCode) || sequenceId === null) {
        return {
            ...closed,
            reconnect: canReconnect(closeCode),
            resume: undefined
        }
    }
    return {
        ...closed,
        reconnect: true,
        resume: {
            url: session.url,
            config: {
                ...session,
                heartbeat: heart,
                token: config.token,
                seq: sequenceId
            }
        }
    }
}

export type SessionConfig =
    | Discord.GatewayIdentifyData
    | GatewayResumeData

export interface GatewayResumeData extends Discord.GatewayResumeData {
    readonly heartbeat: {
        readonly startTime: number;
        readonly interval: number;
    }
}

const closeCodes = {
    endSession: 1000,
    endSessionAlso: 1000,
    resumable: 3000
}

function canReconnect(code: number) {
    return !unrecoverableCloseCodes.has(code);
}

const unrecoverableCloseCodes = new Set([
    Discord.GatewayCloseCodes.AuthenticationFailed,
    Discord.GatewayCloseCodes.InvalidShard,
    Discord.GatewayCloseCodes.InvalidAPIVersion,
    Discord.GatewayCloseCodes.ShardingRequired,
    Discord.GatewayCloseCodes.InvalidIntents,
    Discord.GatewayCloseCodes.DisallowedIntents
]);

function canResume(code: number) {
    return !reidentifyCloseCodes.has(code);
}

const reidentifyCloseCodes = new Set([
    ...unrecoverableCloseCodes,
    closeCodes.endSession,
    closeCodes.endSessionAlso,
    Discord.GatewayCloseCodes.NotAuthenticated,
    Discord.GatewayCloseCodes.InvalidSeq,
    Discord.GatewayCloseCodes.SessionTimedOut
]);


async function heartbeat(connection: IGatewayConnection, config: SessionConfig, signal?: AbortSignal) {
    const heartbeat = await createHeartbeat(connection, config, signal);
    await heartbeat.stopped;
    return { ...heartbeat };
}

async function createHeartbeat(connection: IGatewayConnection, config: SessionConfig, signal?: AbortSignal) {
    if ('heartbeat' in config)
        return new Heartbeat(config.heartbeat.startTime, config.heartbeat.interval, connection);

    const { d: { heartbeat_interval } } = await wait(connection, Discord.GatewayOpcodes.Hello, signal);
    const start = Date.now() + Math.random() * heartbeat_interval;
    return new Heartbeat(start, heartbeat_interval, connection);
}


async function resume(connection: IGatewayConnection, config: Discord.GatewayResumeData, signal?: AbortSignal) {
    await wait(connection, 'open', signal);
    await connection.send({
        op: Discord.GatewayOpcodes.Resume,
        d: {
            seq: config.seq,
            session_id: config.session_id,
            token: config.token
        }
    }, signal);
    await wait(connection, "RESUMED", signal);
    return { session_id: config.session_id, url: undefined };
}

async function identify(connection: IGatewayConnection, config: Discord.GatewayIdentifyData, signal?: AbortSignal) {
    await wait(connection, Discord.GatewayOpcodes.Hello, signal)
    await connection.send({
        op: Discord.GatewayOpcodes.Identify,
        d: {
            intents: config.intents,
            properties: config.properties,
            token: config.token,
            compress: config.compress,
            large_threshold: config.large_threshold,
            presence: config.presence,
            shard: config.shard
        }
    }, signal)
    const { d: { session_id, resume_gateway_url } } = await wait(connection, "READY", signal);
    return {
        session_id,
        url: resume_gateway_url
    };
}

async function wait<Event extends keyof GatewayEvents>(connection: IGatewayConnection, event: Event, signal?: AbortSignal) {
    const result = new Deferred<GatewayEvents[Event][0]>();
    using stack = new DisposableStack();
    stack.use(abortListener(signal, result.reject));
    stack.use(connection.handle({
        close: () => result.reject(new Error('Connection closed')),
        [event]: (p: GatewayEvents[Event][0]) => result.resolve(p),
    }));
    return await result.promise;
}