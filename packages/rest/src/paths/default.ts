import { id, route, str } from "./route.js";

const icon = str('icon');
const guildId = id('guildId');
const userId = id('userId');
const roleId = id('roleId');
const channelId = id('channelId');
const messageId = id('messageId');
const templateCode = str('templateCode');
const ruleId = str('ruleId');
const emojiId = id('emojiId');
const emoji = str('emoji');
const integrationId = str('integrationId');
const eventId = str('eventId');
const stickerId = str('stickerId');
const permissionId = id('permissionId');
const applicationId = str('applicationId');
const inviteCode = str('inviteCode');
const webhookId = str('webhookId');
const webhookToken = str('webhookToken');
const interactionId = str('interactionId');
const commandId = str('commandId');
const interactionToken = str('interactionToken');

const cdn = route('cdn:/');
export const cdnRoutes = {
    guildBanner: cdn`/banners/${guildId}/${icon}`,
    guildIcon: cdn`/icons/${guildId}/${icon}`,
    guildSplash: cdn`/splashes/${guildId}/${icon}`,
    userAvatar: cdn`/avatars/${userId}/${icon}`,
    defaultAvatar: cdn`/embed/avatars/${icon}.png`,
}

const api = route('api:/');
export const apiRoutes = {
    gateway: api`/gateway`,
    gatewayBot: api`/gateway/bot`,
    guilds: api`/guilds`,
    globalGuildTemplates: api`/guilds/templates`,
    globalGuildTemplate: api`/guilds/templates/${templateCode}`,
    guild: api`/guilds/${guildId}`,
    guildChannels: api`/guilds/${guildId}/channels`,
    guildChannel: api`/guilds/${guildId}/channels/${channelId}`,
    autoModerationRules: api`/guilds/${guildId}/auto-moderation/rules`,
    autoModerationRule: api`/guilds/${guildId}/auto-moderation/rules/${ruleId}`,
    guildActiveThreads: api`/guilds/${guildId}/threads/active`,
    auditLogs: api`/guilds/${guildId}/audit-logs`,
    guildBans: api`/guilds/${guildId}/bans`,
    guildBan: api`/guilds/${guildId}/bans/${userId}`,
    guildWidget: api`/guilds/${guildId}/widget`,
    guildWidgetJson: api`/guilds/${guildId}/widget.json`,
    guildWidgetImage: api`/guilds/${guildId}/widget.png`,
    guildEmojis: api`/guilds/${guildId}/emojis`,
    guildEmoji: api`/guilds/${guildId}/emojis/${emojiId}`,
    guildIntegrations: api`/guilds/${guildId}/integrations`,
    guildIntegration: api`/guilds/${guildId}/integrations/${integrationId}`,
    guildInvites: api`/guilds/${guildId}/invites`,
    guildMembers: api`/guilds/${guildId}/members`,
    guildMemberSelf: api`/guilds/${guildId}/members/@me`,
    guildMember: api`/guilds/${guildId}/members/${userId}`,
    guildMemberRoles: api`/guilds/${guildId}/members/${userId}/roles`,
    guildMemberRole: api`/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    guildMemberSearch: api`/guilds/${guildId}/members/search`,
    guildPrune: api`/guilds/${guildId}/prune`,
    guildOnboarding: api`/guilds/${guildId}/onboarding`,
    guildRegions: api`/guilds/${guildId}/regions`,
    guildWebhooks: api`/guilds/${guildId}/webhooks`,
    guildVanityUrl: api`/guilds/${guildId}/vanity-url`,
    guildPreview: api`/guilds/${guildId}/preview`,
    guildMfaLevel: api`/guilds/${guildId}/mfa`,
    guildWelcomeScreen: api`/guilds/${guildId}/welcome-screen`,
    guildEvents: api`/guilds/${guildId}/scheduled-events`,
    guildEvent: api`/guilds/${guildId}/scheduled-events/${eventId}`,
    guildEventMembers: api`/guilds/${guildId}/scheduled-events/${eventId}/users`,
    guildTemplates: api`/guilds/${guildId}/templates`,
    guildTemplate: api`/guilds/${guildId}/templates/${templateCode}`,
    guildRoles: api`/guilds/${guildId}/roles`,
    guildRole: api`/guilds/${guildId}/roles/${roleId}`,
    voiceStateSelf: api`/guilds/${guildId}/voice-states/@me`,
    voiceState: api`/guilds/${guildId}/voice-states/${userId}`,
    guildDiscoveryMetadata: api`/guilds/${guildId}/discovery-metadata`,
    guildDiscoveryCategories: api`/guilds/${guildId}/discovery-categories`,
    guildStickers: api`/guilds/${guildId}/stickers`,
    guildSticker: api`/guilds/${guildId}/stickers/${stickerId}`,
    channel: api`/channels/${channelId}`,
    messages: api`/channels/${channelId}/messages`,
    bulkDeleteMessages: api`/channels/${channelId}/messages/bulk-delete`,
    message: api`/channels/${channelId}/messages/${messageId}`,
    messageCrosspost: api`/channels/${channelId}/messages/${messageId}/crosspost`,
    messageThreads: api`/channels/${channelId}/messages/${messageId}/threads`,
    messageReactions: api`/channels/${channelId}/messages/${messageId}/reactions`,
    messageReactionUsers: api`/channels/${channelId}/messages/${messageId}/reactions/${emoji}`,
    messageReactionSelf: api`/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`,
    messageReactionUser: api`/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`,
    channelPins: api`/channels/${channelId}/pins`,
    channelPin: api`/channels/${channelId}/pins/${messageId}`,
    channelPermission: api`/channels/${channelId}/permissions/${permissionId}`,
    channelThreads: api`/channels/${channelId}/threads`,
    channelArchivedThreads: api`/channels/${channelId}/threads/archived`,
    channelArchivedPublicThreads: api`/channels/${channelId}/threads/archived/public`,
    channelArchivedPrivateThreads: api`/channels/${channelId}/threads/archived/private`,
    channelSelfArchivedPrivateThreads: api`/channels/${channelId}/users/@me/threads/archived/private`,
    threadMembers: api`/channels/${channelId}/thread-members`,
    threadMemberSelf: api`/channels/${channelId}/thread-members/@me`,
    threadMember: api`/channels/${channelId}/thread-members/${userId}`,
    channelInvites: api`/channels/${channelId}/invites`,
    channelTyping: api`/channels/${channelId}/typing`,
    channelWebhooks: api`/channels/${channelId}/webhooks`,
    channelFollowers: api`/channels/${channelId}/followers`,
    channelRecipient: api`/channels/${channelId}/recipients/${userId}`,
    self: api`/users/@me`,
    selfGuilds: api`/users/@me/guilds`,
    selfGuild: api`/users/@me/guilds/${guildId}`,
    selfGuildMember: api`/users/@me/guilds/${guildId}/member`,
    dmChannels: api`/users/@me/channels`,
    connections: api`/users/@me/connections`,
    selfRoleConnections: api`/users/@me/applications/${applicationId}/role-connections`,
    user: api`/users/${userId}`,
    voiceRegions: api`/voice/regions`,
    invite: api`/invites/${inviteCode}`,
    webhook: api`/webhooks/${webhookId}`,
    webhookToken: api`/webhooks/${webhookId}/${webhookToken}`,
    slackWebhook: api`/webhooks/${webhookId}/${webhookToken}/slack`,
    githubWebhook: api`/webhooks/${webhookId}/${webhookToken}/github`,
    webhookMessage: api`/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`,
    commands: api`/applications/${applicationId}/commands`,
    command: api`/applications/${applicationId}/commands/${commandId}`,
    guildCommands: api`/applications/${applicationId}/guilds/${guildId}/commands`,
    guildCommandsPermissions: api`/applications/${applicationId}/guilds/${guildId}/commands/permissions`,
    guildCommand: api`/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
    guildCommandPermissions: api`/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`,
    applicationRoleConnectionMetadata: api`/applications/${applicationId}/role-connections/metadata`,
    interactionCallback: api`/interactions/${interactionId}/${interactionToken}/callback`,
    interactionFollowup: api`/webhooks/${applicationId}/${interactionToken}`,
    interactionOriginalMessage: api`/webhooks/${applicationId}/${interactionToken}/messages/@original`,
    interactionMessage: api`/webhooks/${applicationId}/${interactionToken}/messages/${messageId}`,
    discoveryCategories: api`/discovery/categories`,
    discoveryTerms: api`/discovery/valid-term`,
    oauthApplication: api`/oauth2/applications/@me`,
    oauthSelf: api`/oauth2/@me`,
    stageInstances: api`/stage-instances`,
    stageInstance: api`/stage-instances/${channelId}`,
    stickerPacks: api`/sticker-packs`,
    sticker: api`/stickers/${stickerId}`,
}
