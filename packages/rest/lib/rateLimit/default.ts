import { IRouteRateLimitConfig } from "./RateLimitManager.js";
import { IRoute, RouteModel, apiRoutes, cdnRoutes } from "../paths/index.js";

type CDN = typeof cdnRoutes;
export const cdnRateLimits: { [P in keyof CDN]: IRouteRateLimitConfig<RouteModel<CDN[P]>> } = {
    ...r(cdnRoutes, 'guildBanner', []),
    ...r(cdnRoutes, 'guildIcon', []),
    ...r(cdnRoutes, 'guildSplash', []),
    ...r(cdnRoutes, 'userAvatar', []),
    ...r(cdnRoutes, 'defaultAvatar', [])
}

type API = typeof apiRoutes
export const apiRateLimits: { [P in keyof API]: IRouteRateLimitConfig<RouteModel<API[P]>> } = {
    ...r(apiRoutes, 'gateway', []),
    ...r(apiRoutes, 'gatewayBot', []),
    ...r(apiRoutes, 'guilds', []),
    ...r(apiRoutes, 'globalGuildTemplates', []),
    ...r(apiRoutes, 'globalGuildTemplate', []),
    ...r(apiRoutes, 'guild', ['guildId']),
    ...r(apiRoutes, 'guildChannels', ['guildId']),
    ...r(apiRoutes, 'guildChannel', ['guildId']),
    ...r(apiRoutes, 'autoModerationRules', ['guildId']),
    ...r(apiRoutes, 'autoModerationRule', ['guildId']),
    ...r(apiRoutes, 'guildActiveThreads', ['guildId']),
    ...r(apiRoutes, 'auditLogs', ['guildId']),
    ...r(apiRoutes, 'guildBans', ['guildId']),
    ...r(apiRoutes, 'guildBan', ['guildId']),
    ...r(apiRoutes, 'guildWidget', ['guildId']),
    ...r(apiRoutes, 'guildWidgetJson', ['guildId']),
    ...r(apiRoutes, 'guildWidgetImage', ['guildId']),
    ...r(apiRoutes, 'guildEmojis', ['guildId']),
    ...r(apiRoutes, 'guildEmoji', ['guildId']),
    ...r(apiRoutes, 'guildIntegrations', ['guildId']),
    ...r(apiRoutes, 'guildIntegration', ['guildId']),
    ...r(apiRoutes, 'guildInvites', ['guildId']),
    ...r(apiRoutes, 'guildMembers', ['guildId']),
    ...r(apiRoutes, 'guildMemberSelf', ['guildId']),
    ...r(apiRoutes, 'guildMember', ['guildId']),
    ...r(apiRoutes, 'guildMemberRoles', ['guildId']),
    ...r(apiRoutes, 'guildMemberRole', ['guildId']),
    ...r(apiRoutes, 'guildMemberSearch', ['guildId']),
    ...r(apiRoutes, 'guildPrune', ['guildId']),
    ...r(apiRoutes, 'guildOnboarding', ['guildId']),
    ...r(apiRoutes, 'guildRegions', ['guildId']),
    ...r(apiRoutes, 'guildWebhooks', ['guildId']),
    ...r(apiRoutes, 'guildVanityUrl', ['guildId']),
    ...r(apiRoutes, 'guildPreview', ['guildId']),
    ...r(apiRoutes, 'guildMfaLevel', ['guildId']),
    ...r(apiRoutes, 'guildWelcomeScreen', ['guildId']),
    ...r(apiRoutes, 'guildEvents', ['guildId']),
    ...r(apiRoutes, 'guildEvent', ['guildId']),
    ...r(apiRoutes, 'guildEventMembers', ['guildId']),
    ...r(apiRoutes, 'guildTemplates', ['guildId']),
    ...r(apiRoutes, 'guildTemplate', ['guildId']),
    ...r(apiRoutes, 'guildRoles', ['guildId']),
    ...r(apiRoutes, 'guildRole', ['guildId']),
    ...r(apiRoutes, 'voiceStateSelf', ['guildId']),
    ...r(apiRoutes, 'voiceState', ['guildId']),
    ...r(apiRoutes, 'guildDiscoveryMetadata', ['guildId']),
    ...r(apiRoutes, 'guildDiscoveryCategories', ['guildId']),
    ...r(apiRoutes, 'guildStickers', ['guildId']),
    ...r(apiRoutes, 'guildSticker', ['guildId']),
    ...r(apiRoutes, 'channel', ['channelId']),
    ...r(apiRoutes, 'messages', ['channelId']),
    ...r(apiRoutes, 'bulkDeleteMessages', ['channelId']),
    ...r(apiRoutes, 'message', ['channelId']),
    ...r(apiRoutes, 'messageCrosspost', ['channelId']),
    ...r(apiRoutes, 'messageThreads', ['channelId']),
    ...r(apiRoutes, 'messageReactions', ['channelId']),
    ...r(apiRoutes, 'messageReactionUsers', ['channelId', 'emoji']),
    ...r(apiRoutes, 'messageReactionSelf', ['channelId', 'emoji']),
    ...r(apiRoutes, 'messageReactionUser', ['channelId', 'emoji', 'userId']),
    ...r(apiRoutes, 'channelPins', ['channelId']),
    ...r(apiRoutes, 'channelPin', ['channelId']),
    ...r(apiRoutes, 'channelPermission', ['channelId']),
    ...r(apiRoutes, 'channelThreads', ['channelId']),
    ...r(apiRoutes, 'channelArchivedThreads', ['channelId']),
    ...r(apiRoutes, 'channelArchivedPublicThreads', ['channelId']),
    ...r(apiRoutes, 'channelArchivedPrivateThreads', ['channelId']),
    ...r(apiRoutes, 'channelSelfArchivedPrivateThreads', ['channelId']),
    ...r(apiRoutes, 'threadMembers', ['channelId']),
    ...r(apiRoutes, 'threadMemberSelf', ['channelId']),
    ...r(apiRoutes, 'threadMember', ['channelId']),
    ...r(apiRoutes, 'channelInvites', ['channelId']),
    ...r(apiRoutes, 'channelTyping', ['channelId']),
    ...r(apiRoutes, 'channelWebhooks', ['channelId']),
    ...r(apiRoutes, 'channelFollowers', ['channelId']),
    ...r(apiRoutes, 'channelRecipient', ['channelId']),
    ...r(apiRoutes, 'self', []),
    ...r(apiRoutes, 'selfGuilds', []),
    ...r(apiRoutes, 'selfGuild', ['guildId']),
    ...r(apiRoutes, 'selfGuildMember', ['guildId']),
    ...r(apiRoutes, 'dmChannels', []),
    ...r(apiRoutes, 'connections', []),
    ...r(apiRoutes, 'selfRoleConnections', []),
    ...r(apiRoutes, 'user', []),
    ...r(apiRoutes, 'voiceRegions', []),
    ...r(apiRoutes, 'invite', []),
    ...r(apiRoutes, 'webhook', ['webhookId']),
    ...r(apiRoutes, 'webhookToken', ['webhookId', 'webhookToken']),
    ...r(apiRoutes, 'slackWebhook', ['webhookId', 'webhookToken']),
    ...r(apiRoutes, 'githubWebhook', ['webhookId', 'webhookToken']),
    ...r(apiRoutes, 'webhookMessage', ['webhookId', 'webhookToken']),
    ...r(apiRoutes, 'commands', []),
    ...r(apiRoutes, 'command', []),
    ...r(apiRoutes, 'guildCommands', ['guildId']),
    ...r(apiRoutes, 'guildCommandsPermissions', ['guildId']),
    ...r(apiRoutes, 'guildCommand', ['guildId']),
    ...r(apiRoutes, 'guildCommandPermissions', ['guildId']),
    ...r(apiRoutes, 'applicationRoleConnectionMetadata', []),
    ...r(apiRoutes, 'interactionCallback', [], false),
    ...r(apiRoutes, 'interactionFollowup', [], false),
    ...r(apiRoutes, 'interactionOriginalMessage', [], false),
    ...r(apiRoutes, 'interactionMessage', [], false),
    ...r(apiRoutes, 'discoveryCategories', []),
    ...r(apiRoutes, 'discoveryTerms', []),
    ...r(apiRoutes, 'oauthApplication', []),
    ...r(apiRoutes, 'oauthSelf', []),
    ...r(apiRoutes, 'stageInstances', []),
    ...r(apiRoutes, 'stageInstance', ['channelId']),
    ...r(apiRoutes, 'stickerPacks', []),
    ...r(apiRoutes, 'sticker', [])
}

const defaultSymbol = Symbol();
function r<Routes extends Record<PropertyKey, IRoute<object>>, Key extends keyof Routes>(routes: Routes, route: Key, keep: Array<keyof RouteModel<Routes[Key]>>, global = true) {
    const shouldKeep = new Set<unknown>(keep);
    const result: IRouteRateLimitConfig<RouteModel<Routes[Key]>> = {
        global,
        route: routes[route] as IRoute<RouteModel<Routes[Key]>>,
        toRouteKey(model) {
            return new Proxy(model as object, {
                get(_, prop) {
                    const value = model[prop as keyof typeof _];
                    if (shouldKeep.has(prop))
                        return value;
                    switch (typeof value) {
                        case 'bigint': return 0n;
                        case 'boolean': return false;
                        case 'function': return value;
                        case 'number': return 0;
                        case 'string': return '';
                        case 'symbol': return defaultSymbol;
                        case 'undefined': return undefined;
                        case 'object':
                            return value === null
                                ? null
                                : Object.create(Object.getPrototypeOf(value));
                    }
                    return Object.getPrototypeOf(model[prop as keyof typeof _])
                }
            }) as typeof model
        }
    }
    return { [route]: result } as { [P in Key]: IRouteRateLimitConfig<RouteModel<Routes[Key]>> };
}
