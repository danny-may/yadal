/*
 * Auto generated file, do not edit
 */
export * as getMyOauth2Application from './oauth2/applications/@me/get.js';
export * as listMyConnections from './users/@me/connections/get.js';
export * as createDm from './users/@me/channels/post.js';
export * as listMyGuilds from './users/@me/guilds/get.js';
export * as getMyApplication from './applications/@me/get.js';
export * as updateMyApplication from './applications/@me/patch.js';
export * as getBotGateway from './gateway/bot/get.js';
export * as getMyOauth2Authorization from './oauth2/@me/get.js';
export * as listVoiceRegions from './voice/regions/get.js';
export * as getMyUser from './users/@me/get.js';
export * as updateMyUser from './users/@me/patch.js';
export * as createStageInstance from './stage-instances/post.js';
export * as listStickerPacks from './sticker-packs/get.js';
export * as getGateway from './gateway/get.js';
export * as createGuild from './guilds/post.js';
export * as listMyPrivateArchivedThreads from './channels/{channel_id}/users/@me/threads/archived/private/get.js';
export * as listGuildApplicationCommandPermissions from './applications/{application_id}/guilds/{guild_id}/commands/permissions/get.js';
export * as getGuildApplicationCommandPermissions from './applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions/get.js';
export * as setGuildApplicationCommandPermissions from './applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions/put.js';
export * as addMyMessageReaction from './channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me/put.js';
export * as deleteMyMessageReaction from './channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me/delete.js';
export * as listPrivateArchivedThreads from './channels/{channel_id}/threads/archived/private/get.js';
export * as listPublicArchivedThreads from './channels/{channel_id}/threads/archived/public/get.js';
export * as getApplicationUserRoleConnection from './users/@me/applications/{application_id}/role-connection/get.js';
export * as updateApplicationUserRoleConnection from './users/@me/applications/{application_id}/role-connection/put.js';
export * as getMyGuildMember from './users/@me/guilds/{guild_id}/member/get.js';
export * as getApplicationRoleConnectionsMetadata from './applications/{application_id}/role-connections/metadata/get.js';
export * as updateApplicationRoleConnectionsMetadata from './applications/{application_id}/role-connections/metadata/put.js';
export * as getGuildApplicationCommand from './applications/{application_id}/guilds/{guild_id}/commands/{command_id}/get.js';
export * as deleteGuildApplicationCommand from './applications/{application_id}/guilds/{guild_id}/commands/{command_id}/delete.js';
export * as updateGuildApplicationCommand from './applications/{application_id}/guilds/{guild_id}/commands/{command_id}/patch.js';
export * as listGuildApplicationCommands from './applications/{application_id}/guilds/{guild_id}/commands/get.js';
export * as bulkSetGuildApplicationCommands from './applications/{application_id}/guilds/{guild_id}/commands/put.js';
export * as createGuildApplicationCommand from './applications/{application_id}/guilds/{guild_id}/commands/post.js';
export * as joinThread from './channels/{channel_id}/thread-members/@me/put.js';
export * as leaveThread from './channels/{channel_id}/thread-members/@me/delete.js';
export * as bulkDeleteMessages from './channels/{channel_id}/messages/bulk-delete/post.js';
export * as deleteUserMessageReaction from './channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}/delete.js';
export * as listMessageReactionsByEmoji from './channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/get.js';
export * as deleteAllMessageReactionsByEmoji from './channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/delete.js';
export * as deleteAllMessageReactions from './channels/{channel_id}/messages/{message_id}/reactions/delete.js';
export * as crosspostMessage from './channels/{channel_id}/messages/{message_id}/crosspost/post.js';
export * as createThreadFromMessage from './channels/{channel_id}/messages/{message_id}/threads/post.js';
export * as getOriginalWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/@original/get.js';
export * as deleteOriginalWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/@original/delete.js';
export * as updateOriginalWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/@original/patch.js';
export * as listGuildScheduledEventUsers from './guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/get.js';
export * as getAutoModerationRule from './guilds/{guild_id}/auto-moderation/rules/{rule_id}/get.js';
export * as deleteAutoModerationRule from './guilds/{guild_id}/auto-moderation/rules/{rule_id}/delete.js';
export * as updateAutoModerationRule from './guilds/{guild_id}/auto-moderation/rules/{rule_id}/patch.js';
export * as listAutoModerationRules from './guilds/{guild_id}/auto-moderation/rules/get.js';
export * as createAutoModerationRule from './guilds/{guild_id}/auto-moderation/rules/post.js';
export * as updateSelfVoiceState from './guilds/{guild_id}/voice-states/@me/patch.js';
export * as searchGuildMembers from './guilds/{guild_id}/members/search/get.js';
export * as getActiveGuildThreads from './guilds/{guild_id}/threads/active/get.js';
export * as updateMyGuildMember from './guilds/{guild_id}/members/@me/patch.js';
export * as addGuildMemberRole from './guilds/{guild_id}/members/{user_id}/roles/{role_id}/put.js';
export * as deleteGuildMemberRole from './guilds/{guild_id}/members/{user_id}/roles/{role_id}/delete.js';
export * as leaveGuild from './users/@me/guilds/{guild_id}/delete.js';
export * as getApplicationCommand from './applications/{application_id}/commands/{command_id}/get.js';
export * as deleteApplicationCommand from './applications/{application_id}/commands/{command_id}/delete.js';
export * as updateApplicationCommand from './applications/{application_id}/commands/{command_id}/patch.js';
export * as listApplicationCommands from './applications/{application_id}/commands/get.js';
export * as bulkSetApplicationCommands from './applications/{application_id}/commands/put.js';
export * as createApplicationCommand from './applications/{application_id}/commands/post.js';
export * as createInteractionResponse from './interactions/{interaction_id}/{interaction_token}/callback/post.js';
export * as getThreadMember from './channels/{channel_id}/thread-members/{user_id}/get.js';
export * as addThreadMember from './channels/{channel_id}/thread-members/{user_id}/put.js';
export * as deleteThreadMember from './channels/{channel_id}/thread-members/{user_id}/delete.js';
export * as listThreadMembers from './channels/{channel_id}/thread-members/get.js';
export * as setChannelPermissionOverwrite from './channels/{channel_id}/permissions/{overwrite_id}/put.js';
export * as deleteChannelPermissionOverwrite from './channels/{channel_id}/permissions/{overwrite_id}/delete.js';
export * as addGroupDmUser from './channels/{channel_id}/recipients/{user_id}/put.js';
export * as deleteGroupDmUser from './channels/{channel_id}/recipients/{user_id}/delete.js';
export * as followChannel from './channels/{channel_id}/followers/post.js';
export * as getMessage from './channels/{channel_id}/messages/{message_id}/get.js';
export * as deleteMessage from './channels/{channel_id}/messages/{message_id}/delete.js';
export * as updateMessage from './channels/{channel_id}/messages/{message_id}/patch.js';
export * as listMessages from './channels/{channel_id}/messages/get.js';
export * as createMessage from './channels/{channel_id}/messages/post.js';
export * as listChannelWebhooks from './channels/{channel_id}/webhooks/get.js';
export * as createWebhook from './channels/{channel_id}/webhooks/post.js';
export * as listChannelInvites from './channels/{channel_id}/invites/get.js';
export * as createChannelInvite from './channels/{channel_id}/invites/post.js';
export * as createThread from './channels/{channel_id}/threads/post.js';
export * as triggerTypingIndicator from './channels/{channel_id}/typing/post.js';
export * as pinMessage from './channels/{channel_id}/pins/{message_id}/put.js';
export * as unpinMessage from './channels/{channel_id}/pins/{message_id}/delete.js';
export * as listPinnedMessages from './channels/{channel_id}/pins/get.js';
export * as getWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/{message_id}/get.js';
export * as deleteWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/{message_id}/delete.js';
export * as updateWebhookMessage from './webhooks/{webhook_id}/{webhook_token}/messages/{message_id}/patch.js';
export * as executeGithubCompatibleWebhook from './webhooks/{webhook_id}/{webhook_token}/github/post.js';
export * as executeSlackCompatibleWebhook from './webhooks/{webhook_id}/{webhook_token}/slack/post.js';
export * as getGuildTemplate from './guilds/templates/{code}/get.js';
export * as createGuildFromTemplate from './guilds/templates/{code}/post.js';
export * as getGuildNewMemberWelcome from './guilds/{guild_id}/new-member-welcome/get.js';
export * as getGuildScheduledEvent from './guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/get.js';
export * as deleteGuildScheduledEvent from './guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/delete.js';
export * as updateGuildScheduledEvent from './guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/patch.js';
export * as listGuildScheduledEvents from './guilds/{guild_id}/scheduled-events/get.js';
export * as createGuildScheduledEvent from './guilds/{guild_id}/scheduled-events/post.js';
export * as getGuildWelcomeScreen from './guilds/{guild_id}/welcome-screen/get.js';
export * as updateGuildWelcomeScreen from './guilds/{guild_id}/welcome-screen/patch.js';
export * as updateVoiceState from './guilds/{guild_id}/voice-states/{user_id}/patch.js';
export * as deleteGuildIntegration from './guilds/{guild_id}/integrations/{integration_id}/delete.js';
export * as listGuildIntegrations from './guilds/{guild_id}/integrations/get.js';
export * as getGuildWidget from './guilds/{guild_id}/widget.json/get.js';
export * as getGuildsOnboarding from './guilds/{guild_id}/onboarding/get.js';
export * as putGuildsOnboarding from './guilds/{guild_id}/onboarding/put.js';
export * as getGuildVanityUrl from './guilds/{guild_id}/vanity-url/get.js';
export * as listGuildAuditLogEntries from './guilds/{guild_id}/audit-logs/get.js';
export * as getGuildWidgetPng from './guilds/{guild_id}/widget.png/get.js';
export * as syncGuildTemplate from './guilds/{guild_id}/templates/{code}/put.js';
export * as deleteGuildTemplate from './guilds/{guild_id}/templates/{code}/delete.js';
export * as updateGuildTemplate from './guilds/{guild_id}/templates/{code}/patch.js';
export * as listGuildTemplates from './guilds/{guild_id}/templates/get.js';
export * as createGuildTemplate from './guilds/{guild_id}/templates/post.js';
export * as getGuildSticker from './guilds/{guild_id}/stickers/{sticker_id}/get.js';
export * as deleteGuildSticker from './guilds/{guild_id}/stickers/{sticker_id}/delete.js';
export * as updateGuildSticker from './guilds/{guild_id}/stickers/{sticker_id}/patch.js';
export * as listGuildChannels from './guilds/{guild_id}/channels/get.js';
export * as createGuildChannel from './guilds/{guild_id}/channels/post.js';
export * as bulkUpdateGuildChannels from './guilds/{guild_id}/channels/patch.js';
export * as listGuildStickers from './guilds/{guild_id}/stickers/get.js';
export * as createGuildSticker from './guilds/{guild_id}/stickers/post.js';
export * as getGuildWebhooks from './guilds/{guild_id}/webhooks/get.js';
export * as getGuildMember from './guilds/{guild_id}/members/{user_id}/get.js';
export * as addGuildMember from './guilds/{guild_id}/members/{user_id}/put.js';
export * as deleteGuildMember from './guilds/{guild_id}/members/{user_id}/delete.js';
export * as updateGuildMember from './guilds/{guild_id}/members/{user_id}/patch.js';
export * as listGuildMembers from './guilds/{guild_id}/members/get.js';
export * as getGuildPreview from './guilds/{guild_id}/preview/get.js';
export * as listGuildInvites from './guilds/{guild_id}/invites/get.js';
export * as listGuildVoiceRegions from './guilds/{guild_id}/regions/get.js';
export * as getGuildEmoji from './guilds/{guild_id}/emojis/{emoji_id}/get.js';
export * as deleteGuildEmoji from './guilds/{guild_id}/emojis/{emoji_id}/delete.js';
export * as updateGuildEmoji from './guilds/{guild_id}/emojis/{emoji_id}/patch.js';
export * as listGuildEmojis from './guilds/{guild_id}/emojis/get.js';
export * as createGuildEmoji from './guilds/{guild_id}/emojis/post.js';
export * as getGuildWidgetSettings from './guilds/{guild_id}/widget/get.js';
export * as updateGuildWidgetSettings from './guilds/{guild_id}/widget/patch.js';
export * as deleteGuildRole from './guilds/{guild_id}/roles/{role_id}/delete.js';
export * as updateGuildRole from './guilds/{guild_id}/roles/{role_id}/patch.js';
export * as listGuildRoles from './guilds/{guild_id}/roles/get.js';
export * as createGuildRole from './guilds/{guild_id}/roles/post.js';
export * as bulkUpdateGuildRoles from './guilds/{guild_id}/roles/patch.js';
export * as previewPruneGuild from './guilds/{guild_id}/prune/get.js';
export * as pruneGuild from './guilds/{guild_id}/prune/post.js';
export * as getGuildBan from './guilds/{guild_id}/bans/{user_id}/get.js';
export * as banUserFromGuild from './guilds/{guild_id}/bans/{user_id}/put.js';
export * as unbanUserFromGuild from './guilds/{guild_id}/bans/{user_id}/delete.js';
export * as listGuildBans from './guilds/{guild_id}/bans/get.js';
export * as setGuildMfaLevel from './guilds/{guild_id}/mfa/post.js';
export * as getStageInstance from './stage-instances/{channel_id}/get.js';
export * as deleteStageInstance from './stage-instances/{channel_id}/delete.js';
export * as updateStageInstance from './stage-instances/{channel_id}/patch.js';
export * as getApplication from './applications/{application_id}/get.js';
export * as updateApplication from './applications/{application_id}/patch.js';
export * as getWebhookByToken from './webhooks/{webhook_id}/{webhook_token}/get.js';
export * as executeWebhook from './webhooks/{webhook_id}/{webhook_token}/post.js';
export * as deleteWebhookByToken from './webhooks/{webhook_id}/{webhook_token}/delete.js';
export * as updateWebhookByToken from './webhooks/{webhook_id}/{webhook_token}/patch.js';
export * as getChannel from './channels/{channel_id}/get.js';
export * as deleteChannel from './channels/{channel_id}/delete.js';
export * as updateChannel from './channels/{channel_id}/patch.js';
export * as getSticker from './stickers/{sticker_id}/get.js';
export * as getWebhook from './webhooks/{webhook_id}/get.js';
export * as deleteWebhook from './webhooks/{webhook_id}/delete.js';
export * as updateWebhook from './webhooks/{webhook_id}/patch.js';
export * as inviteResolve from './invites/{code}/get.js';
export * as inviteRevoke from './invites/{code}/delete.js';
export * as getGuild from './guilds/{guild_id}/get.js';
export * as deleteGuild from './guilds/{guild_id}/delete.js';
export * as updateGuild from './guilds/{guild_id}/patch.js';
export * as getUser from './users/{user_id}/get.js';