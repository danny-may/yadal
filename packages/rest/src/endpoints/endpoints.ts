import { DiscordRateLimitError, DiscordRestError } from "../errors";
import { HttpHeaders, HttpMethod, IHttpContent, IHttpResponse } from "../http";
import { IEndpoint } from "./IEndpoint";
import * as Discord from 'discord-api-types/v10'
import { apiRoutes, cdnRoutes } from "../paths/default";
import { DiscordFile } from "./DiscordFile";
import { IRoute } from "../paths";

export const cdnEndpoints = {
    getGuildBanner: buildEndpoint('getGuildBanner', 'GET', cdnRoutes.guildBanner, contentResponse, noBody, noHeaders, noQuery),
    getGuildIcon: buildEndpoint('getGuildIcon', 'GET', cdnRoutes.guildIcon, contentResponse, noBody, noHeaders, noQuery),
    getGuildSplash: buildEndpoint('getGuildSplash', 'GET', cdnRoutes.guildSplash, contentResponse, noBody, noHeaders, noQuery),
    getUserAvatar: buildEndpoint('getUserAvatar', 'GET', cdnRoutes.userAvatar, contentResponse, noBody, noHeaders, noQuery),
    getDefaultAvatar: buildEndpoint('getDefaultAvatar', 'GET', cdnRoutes.defaultAvatar, contentResponse, noBody, noHeaders, noQuery),
}

export const apiEndpoints = {
    getGlobalCommands: buildEndpoint('getGlobalCommands', 'GET', apiRoutes.commands, jsonResponse<Discord.RESTGetAPIApplicationCommandsResult>, noBody, noHeaders, query<Discord.RESTGetAPIApplicationCommandsQuery>({ with_localizations: true })),
    editGlobalCommands: buildEndpoint('editGlobalCommands', 'PUT', apiRoutes.commands, jsonResponse<Discord.RESTPutAPIApplicationCommandsResult>, jsonBody<{ commands: Discord.RESTPutAPIApplicationCommandsJSONBody }>({ commands: true }), noHeaders, noQuery),
    createGlobalCommand: buildEndpoint('getGlobalCommand', 'POST', apiRoutes.commands, jsonResponse<Discord.RESTPostAPIApplicationCommandsResult>, jsonBody<Discord.RESTPostAPIApplicationCommandsJSONBody>({ default_member_permissions: true, description: true, description_localizations: true, dm_permission: true, name: true, name_localizations: true, nsfw: true, options: true, type: true, default_permission: true, }), noHeaders, noQuery),
    getGlobalCommand: buildEndpoint('getGlobalCommand', 'GET', apiRoutes.command, jsonResponse<Discord.RESTGetAPIApplicationCommandResult>, noBody, noHeaders, noQuery),
    editGlobalCommand: buildEndpoint('editGlobalCommand', 'PATCH', apiRoutes.command, jsonResponse<Discord.RESTPatchAPIApplicationCommandResult>, jsonBody<Discord.RESTPatchAPIApplicationCommandJSONBody>({ default_member_permissions: true, description: true, description_localizations: true, dm_permission: true, name: true, name_localizations: true, nsfw: true, options: true, type: true, default_permission: true }), noHeaders, noQuery),
    deleteGlobalCommand: buildEndpoint('deleteGlobalCommand', 'DELETE', apiRoutes.command, noContent, noBody, noHeaders, noQuery),
    getGuildCommands: buildEndpoint('getGuildCommands', 'GET', apiRoutes.guildCommands, jsonResponse<Discord.RESTGetAPIApplicationGuildCommandsResult>, noBody, noHeaders, query<Discord.RESTGetAPIApplicationGuildCommandsQuery>({ with_localizations: true })),
    editGuildCommands: buildEndpoint('editGuildCommands', 'PUT', apiRoutes.guildCommands, jsonResponse<Discord.RESTPutAPIApplicationGuildCommandsResult>, jsonBody<{ commands: Discord.RESTPutAPIApplicationGuildCommandsJSONBody }>({ commands: true }), noHeaders, noQuery),
    createGuildCommand: buildEndpoint('createGuildCommand', 'POST', apiRoutes.guildCommands, jsonResponse<Discord.RESTPostAPIApplicationGuildCommandsResult>, jsonBody<Discord.RESTPostAPIApplicationGuildCommandsJSONBody>({ default_member_permissions: true, default_permission: true, description: true, description_localizations: true, name: true, name_localizations: true, nsfw: true, options: true, type: true }), noHeaders, noQuery),
    getGuildCommand: buildEndpoint('getGuildCommand', 'GET', apiRoutes.guildCommand, jsonResponse<Discord.RESTGetAPIApplicationGuildCommandResult>, noBody, noHeaders, noQuery),
    editGuildCommand: buildEndpoint('editGuildCommand', 'PATCH', apiRoutes.guildCommand, jsonResponse<Discord.RESTPatchAPIApplicationGuildCommandResult>, jsonBody<Discord.RESTPatchAPIApplicationGuildCommandJSONBody>({ default_member_permissions: true, default_permission: true, description: true, description_localizations: true, name: true, name_localizations: true, nsfw: true, options: true, type: true }), noHeaders, noQuery),
    deleteGuildCommand: buildEndpoint('deleteGuildCommand', 'DELETE', apiRoutes.guildCommand, noContent, noBody, noHeaders, noQuery),
    getGuildCommandsPermissions: buildEndpoint('getGuildCommandsPermissions', 'GET', apiRoutes.guildCommandsPermissions, jsonResponse<Discord.RESTGetAPIGuildApplicationCommandsPermissionsResult>, noBody, noHeaders, noQuery),
    editGuildCommandsPermissions: buildEndpoint('editGuildCommandsPermissions', 'PUT', apiRoutes.guildCommandsPermissions, jsonResponse<Discord.RESTPutAPIGuildApplicationCommandsPermissionsResult>, jsonBody<{ permissions: Discord.RESTPutAPIGuildApplicationCommandsPermissionsJSONBody }>({ permissions: true }), noHeaders, noQuery),
    getGuildCommandPermissions: buildEndpoint('getGuildCommandPermissions', 'GET', apiRoutes.guildCommandPermissions, jsonResponse<Discord.RESTGetAPIApplicationCommandPermissionsResult>, noBody, noHeaders, noQuery),
    editGuildCommandPermissions: buildEndpoint('editGuildCommandPermissions', 'PUT', apiRoutes.guildCommandPermissions, jsonResponse<Discord.RESTPutAPIApplicationCommandPermissionsResult>, jsonBody<{ permissions: Discord.RESTPutAPIApplicationCommandPermissionsJSONBody }>({ permissions: true }), noHeaders, noQuery),
    createInteractionResponse: buildEndpoint('createInteractionResponse', 'POST', apiRoutes.interactionCallback, noContent, jsonPayloadFormDataBody<Discord.RESTPostAPIInteractionCallbackFormDataBody>({ data: true, type: true, }), noHeaders, noQuery),
    getOriginalInteractionResponse: buildEndpoint('getOriginalInteractionResponse', 'GET', apiRoutes.interactionOriginalMessage, jsonResponse<Discord.RESTGetAPIInteractionOriginalResponseResult>, noBody, noHeaders, noQuery),
    editOriginalInteractionResponse: buildEndpoint('editOriginalInteractionResponse', 'PATCH', apiRoutes.interactionOriginalMessage, jsonResponse<Discord.RESTPatchAPIInteractionOriginalResponseResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIInteractionOriginalResponseFormDataBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, }), noHeaders, noQuery),
    deleteOriginalInteractionResponse: buildEndpoint('deleteOriginalInteractionResponse', 'DELETE', apiRoutes.interactionOriginalMessage, noContent, noBody, noHeaders, noQuery),
    createFollowUpMessage: buildEndpoint('createFollowUpMessage', 'POST', apiRoutes.interactionFollowup, jsonResponse<Discord.RESTPostAPIInteractionFollowupResult>, jsonPayloadFormDataBody<Discord.RESTPostAPIInteractionFollowupFormDataBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, flags: true, thread_name: true, tts: true, }), noHeaders, noQuery),
    getFollowUpMessage: buildEndpoint('getFollowUpMessage', 'GET', apiRoutes.interactionFollowup, jsonResponse<Discord.RESTGetAPIInteractionFollowupResult>, noBody, noHeaders, noQuery),
    editFollowUpMessage: buildEndpoint('editFollowUpMessage', 'PATCH', apiRoutes.interactionFollowup, jsonResponse<Discord.RESTPatchAPIInteractionFollowupResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIInteractionFollowupFormDataBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, }), noHeaders, noQuery),
    deleteFollowUpMessage: buildEndpoint('deleteFollowUpMessage', 'DELETE', apiRoutes.interactionFollowup, noContent, noBody, noHeaders, noQuery),
    getApplicationRoleConnectionMetadata: buildEndpoint('getApplicationRoleConnectionMetadata', 'GET', apiRoutes.applicationRoleConnectionMetadata, jsonResponse<Discord.RESTGetAPIApplicationRoleConnectionMetadataResult>, noBody, noHeaders, noQuery),
    updateApplicationRoleConnectionMetadata: buildEndpoint('updateApplicationRoleConnectionMetadata', 'PUT', apiRoutes.applicationRoleConnectionMetadata, jsonResponse<Discord.RESTPutAPIApplicationRoleConnectionMetadataJSONBody>, jsonBody<{ connections: Discord.RESTPutAPIApplicationRoleConnectionMetadataResult }>({ connections: true }), noHeaders, noQuery),
    getGuildAuditLog: buildEndpoint('getGuildAuditLog', 'GET', apiRoutes.auditLogs, jsonResponse<Discord.RESTGetAPIAuditLogResult>, noBody, noHeaders, query<Discord.RESTGetAPIAuditLogQuery>({ action_type: true, after: true, before: true, limit: true, user_id: true })),
    listAutoModerationRules: buildEndpoint('listAutoModerationRules', 'GET', apiRoutes.autoModerationRules, jsonResponse<Discord.RESTGetAPIAutoModerationRulesResult>, noBody, noHeaders, noQuery),
    createAutoModerationRule: buildEndpoint('createAutoModerationRule', 'POST', apiRoutes.autoModerationRules, jsonResponse<Discord.RESTPostAPIAutoModerationRuleResult>, jsonBody<Discord.RESTPostAPIAutoModerationRuleJSONBody>({ actions: true, enabled: true, event_type: true, exempt_channels: true, exempt_roles: true, name: true, trigger_metadata: true, trigger_type: true }), auditLogReason, noQuery),
    getAutoModerationRule: buildEndpoint('getAutoModerationRule', 'GET', apiRoutes.autoModerationRule, jsonResponse<Discord.RESTGetAPIAutoModerationRuleResult>, noBody, noHeaders, noQuery),
    editAutoModerationRule: buildEndpoint('editAutoModerationRule', 'PATCH', apiRoutes.autoModerationRule, jsonResponse<Discord.RESTPatchAPIAutoModerationRuleResult>, jsonBody<Discord.RESTPatchAPIAutoModerationRuleJSONBody>({ actions: true, enabled: true, event_type: true, exempt_channels: true, exempt_roles: true, name: true, trigger_metadata: true }), auditLogReason, noQuery),
    deleteAutoModerationRule: buildEndpoint('deleteAutoModerationRule', 'DELETE', apiRoutes.autoModerationRule, noContent, noBody, auditLogReason, noQuery),
    getChannel: buildEndpoint('getChannel', 'GET', apiRoutes.channel, jsonResponse<Discord.RESTGetAPIChannelResult>, noBody, noHeaders, noQuery),
    modifyChannel: buildEndpoint('modifyChannel', 'PATCH', apiRoutes.channel, jsonResponse<Discord.RESTPatchAPIChannelResult>, jsonBody<Discord.RESTPatchAPIChannelJSONBody>({ archived: true, auto_archive_duration: true, available_tags: true, bitrate: true, default_auto_archive_duration: true, default_forum_layout: true, default_reaction_emoji: true, default_sort_order: true, default_thread_rate_limit_per_user: true, invitable: true, locked: true, name: true, nsfw: true, parent_id: true, permission_overwrites: true, position: true, rate_limit_per_user: true, rtc_region: true, topic: true, type: true, user_limit: true, video_quality_mode: true }), auditLogReason, noQuery),
    deleteChannel: buildEndpoint('deleteChannel', 'DELETE', apiRoutes.channel, jsonResponse<Discord.RESTDeleteAPIChannelResult>, noBody, auditLogReason, noQuery),
    getChannelMessages: buildEndpoint('getChannelMessages', 'GET', apiRoutes.messages, jsonResponse<Discord.RESTGetAPIChannelMessagesResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelMessagesQuery>({ after: true, around: true, before: true, limit: true, })),
    getChannelMessage: buildEndpoint('getChannelMessage', 'GET', apiRoutes.message, jsonResponse<Discord.RESTGetAPIChannelMessageResult>, noBody, noHeaders, noQuery),
    createMessage: buildEndpoint('createMessage', 'POST', apiRoutes.messages, jsonResponse<Discord.RESTPostAPIChannelMessageResult>, jsonPayloadFormDataBody<Discord.RESTPostAPIChannelMessageFormDataBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, flags: true, message_reference: true, nonce: true, sticker_ids: true, tts: true }), noHeaders, noQuery),
    crosspostMessage: buildEndpoint('crosspostMessage', 'POST', apiRoutes.messageCrosspost, jsonResponse<Discord.RESTPostAPIChannelMessageCrosspostResult>, noBody, noHeaders, noQuery),
    createReaction: buildEndpoint('createReaction', 'PUT', apiRoutes.messageReactionSelf, noContent, noBody, auditLogReason, noQuery),
    deleteOwnReaction: buildEndpoint('deleteOwnReaction', 'DELETE', apiRoutes.messageReactionSelf, noContent, noBody, auditLogReason, noQuery),
    deleteUserReaction: buildEndpoint('deleteUserReaction', 'DELETE', apiRoutes.messageReactionUser, noContent, noBody, auditLogReason, noQuery),
    getReactions: buildEndpoint('getReactions', 'GET', apiRoutes.messageReactionUsers, jsonResponse<Discord.RESTGetAPIChannelMessageReactionUsersResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelMessageReactionUsersQuery>({ after: true, limit: true })),
    deleteAllReactions: buildEndpoint('deleteAllReactions', 'DELETE', apiRoutes.messageReactions, noContent, noBody, auditLogReason, noQuery),
    deleteAllReactionsforEmoji: buildEndpoint('deleteAllReactionsforEmoji', 'DELETE', apiRoutes.messageReactionUsers, noContent, noBody, auditLogReason, noQuery),
    editMessage: buildEndpoint('editMessage', 'PATCH', apiRoutes.message, jsonResponse<Discord.RESTPatchAPIChannelMessageResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIChannelMessageFormDataBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, flags: true, }), auditLogReason, noQuery),
    deleteMessage: buildEndpoint('deleteMessage', 'DELETE', apiRoutes.message, noContent, noBody, auditLogReason, noQuery),
    bulkDeleteMessages: buildEndpoint('bulkDeleteMessages', 'POST', apiRoutes.bulkDeleteMessages, noContent, jsonBody<Discord.RESTPostAPIChannelMessagesBulkDeleteJSONBody>({ messages: true }), auditLogReason, noQuery),
    editChannelPermissions: buildEndpoint('editChannelPermissions', 'PUT', apiRoutes.channelPermission, noContent, jsonBody<Discord.RESTPutAPIChannelPermissionJSONBody>({ allow: true, deny: true, type: true, }), auditLogReason, noQuery),
    getChannelInvites: buildEndpoint('getChannelInvites', 'GET', apiRoutes.channelInvites, jsonResponse<Discord.RESTGetAPIChannelInvitesResult>, noBody, noHeaders, noQuery),
    createChannelInvite: buildEndpoint('createChannelInvite', 'POST', apiRoutes.channelInvites, jsonResponse<Discord.RESTPostAPIChannelInviteResult>, jsonBody<Discord.RESTPostAPIChannelInviteJSONBody>({ max_age: true, max_uses: true, target_application_id: true, target_type: true, target_user_id: true, temporary: true, unique: true }), auditLogReason, noQuery),
    deleteChannelPermission: buildEndpoint('deleteChannelPermission', 'DELETE', apiRoutes.channelPermission, noContent, noBody, auditLogReason, noQuery),
    followAnnouncementChannel: buildEndpoint('followAnnouncementChannel', 'POST', apiRoutes.channelFollowers, jsonResponse<Discord.RESTPostAPIChannelFollowersResult>, jsonBody<Discord.RESTPostAPIChannelFollowersJSONBody>({ webhook_channel_id: true }), noHeaders, noQuery),
    triggerTypingIndicator: buildEndpoint('triggerTypingIndicator', 'POST', apiRoutes.channelTyping, noContent, noBody, auditLogReason, noQuery),
    getPinnedMessages: buildEndpoint('getPinnedMessages', 'GET', apiRoutes.channelPins, jsonResponse<Discord.RESTGetAPIChannelPinsResult>, noBody, noHeaders, noQuery),
    pinMessage: buildEndpoint('pinMessage', 'PUT', apiRoutes.channelPin, noContent, noBody, auditLogReason, noQuery),
    unpinMessage: buildEndpoint('unpinMessage', 'DELETE', apiRoutes.channelPin, noContent, noBody, auditLogReason, noQuery),
    groupDMAddRecipient: buildEndpoint('groupDMAddRecipient', 'PUT', apiRoutes.channelRecipient, jsonResponse<Discord.RESTPutAPIChannelRecipientResult>, jsonBody<Discord.RESTPutAPIChannelRecipientJSONBody>({ access_token: true, nick: true }), noHeaders, noQuery),
    groupDMRemoveRecipient: buildEndpoint('groupDMRemoveRecipient', 'DELETE', apiRoutes.channelRecipient, jsonResponse<Discord.RESTDeleteAPIChannelRecipientResult>, noBody, noHeaders, noQuery),
    startThreadfromMessage: buildEndpoint('startThreadfromMessage', 'POST', apiRoutes.messageThreads, jsonResponse<Discord.RESTPostAPIChannelMessagesThreadsResult>, jsonBody<Discord.RESTPostAPIChannelMessagesThreadsJSONBody>({ auto_archive_duration: true, name: true, rate_limit_per_user: true }), auditLogReason, noQuery),
    startThreadwithoutMessage: buildEndpoint('startThreadwithoutMessage', 'POST', apiRoutes.channelThreads, jsonResponse<Discord.RESTPostAPIChannelThreadsResult>, jsonBody<Discord.RESTPostAPIChannelThreadsJSONBody>({ auto_archive_duration: true, invitable: true, name: true, rate_limit_per_user: true, type: true, }), auditLogReason, noQuery),
    startThreadinForumChannel: buildEndpoint('startThreadinForumChannel', 'POST', apiRoutes.channelThreads, jsonResponse<Discord.RESTPostAPIChannelThreadsResult>, jsonBody<Discord.RESTPostAPIGuildForumThreadsJSONBody>({ applied_tags: true, auto_archive_duration: true, message: true, name: true, rate_limit_per_user: true, }), auditLogReason, noQuery),
    joinThread: buildEndpoint('joinThread', 'PUT', apiRoutes.threadMemberSelf, noContent, noBody, noHeaders, noQuery),
    addThreadMember: buildEndpoint('addThreadMember', 'PUT', apiRoutes.threadMember, noContent, noBody, noHeaders, noQuery),
    leaveThread: buildEndpoint('leaveThread', 'DELETE', apiRoutes.threadMemberSelf, noContent, noBody, noHeaders, noQuery),
    removeThreadMember: buildEndpoint('removeThreadMember', 'DELETE', apiRoutes.threadMember, noContent, noBody, noHeaders, noQuery),
    getThreadMember: buildEndpoint('getThreadMember', 'GET', apiRoutes.threadMember, jsonResponse<Discord.RESTGetAPIChannelThreadMemberResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelThreadMemberQuery>({ with_member: true, })),
    listThreadMembers: buildEndpoint('listThreadMembers', 'GET', apiRoutes.threadMembers, jsonResponse<Discord.RESTGetAPIChannelThreadMembersResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelThreadMembersQuery>({ after: true, limit: true, with_member: true, })),
    listPublicArchivedThreads: buildEndpoint('listPublicArchivedThreads', 'GET', apiRoutes.channelArchivedPublicThreads, jsonResponse<Discord.RESTGetAPIChannelThreadsArchivedPublicResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelThreadsArchivedQuery>({ before: true, limit: true, })),
    listPrivateArchivedThreads: buildEndpoint('listPrivateArchivedThreads', 'GET', apiRoutes.channelArchivedPrivateThreads, jsonResponse<Discord.RESTGetAPIChannelThreadsArchivedPrivateResult>, noBody, noHeaders, query<Discord.RESTGetAPIChannelThreadsArchivedQuery>({ before: true, limit: true, })),
    listJoinedPrivateArchivedThreads: buildEndpoint('listJoinedPrivateArchivedThreads', 'GET', apiRoutes.channelSelfArchivedPrivateThreads, jsonResponse<Discord.RESTGetAPIChannelUsersThreadsArchivedResult>, noBody, noHeaders, noQuery),
    listGuildEmojis: buildEndpoint('listGuildEmojis', 'GET', apiRoutes.guildEmojis, jsonResponse<Discord.RESTGetAPIGuildEmojisResult>, noBody, noHeaders, noQuery),
    getGuildEmoji: buildEndpoint('getGuildEmoji', 'GET', apiRoutes.guildEmoji, jsonResponse<Discord.RESTGetAPIGuildEmojiResult>, noBody, noHeaders, noQuery),
    createGuildEmoji: buildEndpoint('createGuildEmoji', 'POST', apiRoutes.guildEmojis, jsonResponse<Discord.RESTPostAPIGuildEmojiResult>, jsonBody<Discord.RESTPostAPIGuildEmojiJSONBody>({ image: true, name: true, roles: true, }), auditLogReason, noQuery),
    modifyGuildEmoji: buildEndpoint('modifyGuildEmoji', 'PATCH', apiRoutes.guildEmoji, jsonResponse<Discord.RESTPatchAPIGuildEmojiResult>, jsonBody<Discord.RESTPatchAPIGuildEmojiJSONBody>({ name: true, roles: true, }), auditLogReason, noQuery),
    deleteGuildEmoji: buildEndpoint('deleteGuildEmoji', 'DELETE', apiRoutes.guildEmoji, noContent, noBody, auditLogReason, noQuery),
    listScheduledEventsforGuild: buildEndpoint('listScheduledEventsforGuild', 'GET', apiRoutes.guildEvents, jsonResponse<Discord.RESTGetAPIGuildScheduledEventsResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildScheduledEventsQuery>({ with_user_count: true, })),
    createGuildScheduledEvent: buildEndpoint('createGuildScheduledEvent', 'POST', apiRoutes.guildEvents, jsonResponse<Discord.RESTPostAPIGuildScheduledEventResult>, jsonBody<Discord.RESTPostAPIGuildScheduledEventJSONBody>({ channel_id: true, description: true, entity_metadata: true, entity_type: true, image: true, name: true, privacy_level: true, scheduled_end_time: true, scheduled_start_time: true }), auditLogReason, noQuery),
    getGuildScheduledEvent: buildEndpoint('getGuildScheduledEvent', 'GET', apiRoutes.guildEvent, jsonResponse<Discord.RESTGetAPIGuildScheduledEventResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildScheduledEventQuery>({ with_user_count: true, })),
    modifyGuildScheduledEvent: buildEndpoint('modifyGuildScheduledEvent', 'PATCH', apiRoutes.guildEvent, jsonResponse<Discord.RESTPatchAPIGuildScheduledEventResult>, jsonBody<Discord.RESTPatchAPIGuildScheduledEventJSONBody>({ channel_id: true, description: true, entity_metadata: true, entity_type: true, image: true, name: true, privacy_level: true, scheduled_end_time: true, scheduled_start_time: true, status: true, }), auditLogReason, noQuery),
    deleteGuildScheduledEvent: buildEndpoint('deleteGuildScheduledEvent', 'DELETE', apiRoutes.guildEvent, noContent, noBody, noHeaders, noQuery),
    getGuildScheduledEventUsers: buildEndpoint('getGuildScheduledEventUsers', 'GET', apiRoutes.guildEvent, jsonResponse<Discord.RESTGetAPIGuildScheduledEventUsersResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildScheduledEventUsersQuery>({ after: true, before: true, limit: true, with_member: true, })),
    getGuildTemplate: buildEndpoint('getGuildTemplate', 'GET', apiRoutes.globalGuildTemplate, jsonResponse<Discord.RESTGetAPITemplateResult>, noBody, noHeaders, noQuery),
    createGuildfromGuildTemplate: buildEndpoint('createGuildfromGuildTemplate', 'POST', apiRoutes.globalGuildTemplate, jsonResponse<Discord.RESTPostAPITemplateCreateGuildResult>, jsonBody<Discord.RESTPostAPITemplateCreateGuildJSONBody>({ icon: true, name: true, }), noHeaders, noQuery),
    getGuildTemplates: buildEndpoint('getGuildTemplates', 'GET', apiRoutes.guildTemplates, jsonResponse<Discord.RESTGetAPIGuildTemplatesResult>, noBody, noHeaders, noQuery),
    createGuildTemplate: buildEndpoint('createGuildTemplate', 'POST', apiRoutes.guildTemplates, jsonResponse<Discord.RESTPostAPIGuildTemplatesResult>, jsonBody<Discord.RESTPostAPIGuildTemplatesJSONBody>({ description: true, name: true, }), noHeaders, noQuery),
    syncGuildTemplate: buildEndpoint('syncGuildTemplate', 'PUT', apiRoutes.guildTemplate, jsonResponse<Discord.RESTPutAPIGuildTemplateSyncResult>, noBody, noHeaders, noQuery),
    modifyGuildTemplate: buildEndpoint('modifyGuildTemplate', 'PATCH', apiRoutes.guildTemplate, jsonResponse<Discord.RESTPatchAPIGuildTemplateResult>, jsonBody<Discord.RESTPatchAPIGuildTemplateJSONBody>({ description: true, name: true, }), noHeaders, noQuery),
    deleteGuildTemplate: buildEndpoint('deleteGuildTemplate', 'DELETE', apiRoutes.guildTemplate, jsonResponse<Discord.RESTDeleteAPIGuildTemplateResult>, noBody, noHeaders, noQuery),
    createGuild: buildEndpoint('createGuild', 'POST', apiRoutes.guilds, jsonResponse<Discord.RESTPostAPIGuildsResult>, jsonBody<Discord.RESTPostAPIGuildsJSONBody>({ afk_channel_id: true, afk_timeout: true, channels: true, default_message_notifications: true, explicit_content_filter: true, icon: true, name: true, premium_progress_bar_enabled: true, region: true, roles: true, system_channel_flags: true, system_channel_id: true, verification_level: true, }), noHeaders, noQuery),
    getGuild: buildEndpoint('getGuild', 'GET', apiRoutes.guild, jsonResponse<Discord.RESTGetAPIGuildResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildQuery>({ with_counts: true, })),
    getGuildPreview: buildEndpoint('getGuildPreview', 'GET', apiRoutes.guildPreview, jsonResponse<Discord.RESTGetAPIGuildPreviewResult>, noBody, noHeaders, noQuery),
    modifyGuild: buildEndpoint('modifyGuild', 'PATCH', apiRoutes.guild, jsonResponse<Discord.RESTPatchAPIGuildResult>, jsonBody<Discord.RESTPatchAPIGuildJSONBody>({ afk_channel_id: true, afk_timeout: true, banner: true, default_message_notifications: true, description: true, discovery_splash: true, explicit_content_filter: true, features: true, icon: true, name: true, owner_id: true, preferred_locale: true, premium_progress_bar_enabled: true, public_updates_channel_id: true, region: true, rules_channel_id: true, splash: true, system_channel_flags: true, system_channel_id: true, verification_level: true, }), auditLogReason, noQuery),
    deleteGuild: buildEndpoint('deleteGuild', 'DELETE', apiRoutes.guild, noContent, noBody, noHeaders, noQuery),
    getGuildChannels: buildEndpoint('getGuildChannels', 'GET', apiRoutes.guildChannels, jsonResponse<Discord.RESTGetAPIGuildChannelsResult>, noBody, noHeaders, noQuery),
    createGuildChannel: buildEndpoint('createGuildChannel', 'POST', apiRoutes.guildChannels, jsonResponse<Discord.RESTPostAPIGuildChannelResult>, jsonBody<Discord.RESTPostAPIGuildChannelJSONBody>({ available_tags: true, bitrate: true, default_auto_archive_duration: true, default_forum_layout: true, default_reaction_emoji: true, default_sort_order: true, default_thread_rate_limit_per_user: true, flags: true, name: true, nsfw: true, parent_id: true, permission_overwrites: true, position: true, rate_limit_per_user: true, rtc_region: true, topic: true, type: true, user_limit: true, video_quality_mode: true }), auditLogReason, noQuery),
    modifyGuildChannelPositions: buildEndpoint('modifyGuildChannelPositions', 'PATCH', apiRoutes.guildChannels, noContent, jsonBody<{ positions: Discord.RESTPatchAPIGuildChannelPositionsJSONBody }>({ positions: true, }), noHeaders, noQuery),
    listActiveGuildThreads: buildEndpoint('listActiveGuildThreads', 'GET', apiRoutes.guildActiveThreads, jsonResponse<Discord.RESTGetAPIGuildThreadsResult>, noBody, noHeaders, noQuery),
    getGuildMember: buildEndpoint('getGuildMember', 'GET', apiRoutes.guildMember, jsonResponse<Discord.RESTGetAPIGuildMemberResult>, noBody, noHeaders, noQuery),
    listGuildMembers: buildEndpoint('listGuildMembers', 'GET', apiRoutes.guildMembers, jsonResponse<Discord.RESTGetAPIGuildMembersResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildMembersQuery>({ after: true, limit: true, })),
    searchGuildMembers: buildEndpoint('searchGuildMembers', 'GET', apiRoutes.guildMemberSearch, jsonResponse<Discord.RESTGetAPIGuildMembersSearchResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildMembersSearchQuery>({ limit: true, query: true, })),
    addGuildMember: buildEndpoint('addGuildMember', 'PUT', apiRoutes.guildMember, jsonResponse<Discord.RESTPutAPIGuildMemberResult>, jsonBody<Discord.RESTPutAPIGuildMemberJSONBody>({ access_token: true, deaf: true, mute: true, nick: true, roles: true, }), noHeaders, noQuery),
    modifyGuildMember: buildEndpoint('modifyGuildMember', 'PATCH', apiRoutes.guildMember, jsonResponse<Discord.RESTPatchAPIGuildMemberResult>, jsonBody<Discord.RESTPatchAPIGuildMemberJSONBody>({ channel_id: true, communication_disabled_until: true, deaf: true, mute: true, nick: true, roles: true, }), auditLogReason, noQuery),
    modifyCurrentMember: buildEndpoint('modifyCurrentMember', 'PATCH', apiRoutes.guildMemberSelf, jsonResponse<Discord.RESTPatchAPIGuildMemberResult>, jsonBody<Discord.RESTPatchAPIGuildMemberJSONBody>({ channel_id: true, communication_disabled_until: true, deaf: true, mute: true, nick: true, roles: true, }), auditLogReason, noQuery),
    addGuildMemberRole: buildEndpoint('addGuildMemberRole', 'PUT', apiRoutes.guildMemberRole, noContent, noBody, auditLogReason, noQuery),
    removeGuildMemberRole: buildEndpoint('removeGuildMemberRole', 'DELETE', apiRoutes.guildMemberRole, noContent, noBody, auditLogReason, noQuery),
    removeGuildMember: buildEndpoint('removeGuildMember', 'DELETE', apiRoutes.guildMember, noContent, noBody, auditLogReason, noQuery),
    getGuildBans: buildEndpoint('getGuildBans', 'GET', apiRoutes.guildBans, jsonResponse<Discord.RESTGetAPIGuildBansResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildBansQuery>({ after: true, before: true, limit: true, })),
    getGuildBan: buildEndpoint('getGuildBan', 'GET', apiRoutes.guildBan, jsonResponse<Discord.RESTGetAPIGuildBanResult>, noBody, noHeaders, noQuery),
    createGuildBan: buildEndpoint('createGuildBan', 'PUT', apiRoutes.guildBan, noContent, jsonBody<Discord.RESTPutAPIGuildBanJSONBody>({ delete_message_days: true, delete_message_seconds: true, }), auditLogReason, noQuery),
    removeGuildBan: buildEndpoint('removeGuildBan', 'DELETE', apiRoutes.guildBan, noContent, noBody, auditLogReason, noQuery),
    getGuildRoles: buildEndpoint('getGuildRoles', 'GET', apiRoutes.guildRole, jsonResponse<Discord.RESTGetAPIGuildRolesResult>, noBody, noHeaders, noQuery),
    createGuildRole: buildEndpoint('createGuildRole', 'POST', apiRoutes.guildRoles, jsonResponse<Discord.RESTPostAPIGuildRoleResult>, jsonBody<Discord.RESTPostAPIGuildRoleJSONBody>({ color: true, hoist: true, icon: true, mentionable: true, name: true, permissions: true, unicode_emoji: true, }), auditLogReason, noQuery),
    modifyGuildRolePositions: buildEndpoint('modifyGuildRolePositions', 'PATCH', apiRoutes.guildRoles, jsonResponse<Discord.RESTPatchAPIGuildRolePositionsResult>, jsonBody<{ positions: Discord.RESTPatchAPIGuildRolePositionsJSONBody }>({ positions: true, }), auditLogReason, noQuery),
    modifyGuildRole: buildEndpoint('modifyGuildRole', 'PATCH', apiRoutes.guildRole, jsonResponse<Discord.RESTPatchAPIGuildRoleResult>, jsonBody<Discord.RESTPatchAPIGuildRoleJSONBody>({ color: true, hoist: true, icon: true, mentionable: true, name: true, permissions: true, unicode_emoji: true }), auditLogReason, noQuery),
    modifyGuildMFALevel: buildEndpoint('modifyGuildMFALevel', 'POST', apiRoutes.guildMfaLevel, jsonResponse<Discord.RESTPostAPIGuildsMFAResult>, jsonBody<Discord.RESTPostAPIGuildsMFAJSONBody>({ level: true, }), auditLogReason, noQuery),
    deleteGuildRole: buildEndpoint('deleteGuildRole', 'DELETE', apiRoutes.guildRole, noContent, noBody, auditLogReason, noQuery),
    getGuildPruneCount: buildEndpoint('getGuildPruneCount', 'GET', apiRoutes.guildPrune, jsonResponse<Discord.RESTGetAPIGuildPruneCountResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildPruneCountQuery>({ days: true, include_roles: true, })),
    beginGuildPrune: buildEndpoint('beginGuildPrune', 'POST', apiRoutes.guildPrune, jsonResponse<Discord.RESTPostAPIGuildPruneResult>, jsonBody<Discord.RESTPostAPIGuildPruneJSONBody>({ compute_prune_count: true, days: true, include_roles: true, }), auditLogReason, noQuery),
    getGuildVoiceRegions: buildEndpoint('getGuildVoiceRegions', 'GET', apiRoutes.guildRegions, jsonResponse<Discord.RESTGetAPIVoiceRegionsResult>, noBody, noHeaders, noQuery),
    getGuildInvites: buildEndpoint('getGuildInvites', 'GET', apiRoutes.guildInvites, jsonResponse<Discord.RESTGetAPIGuildInvitesResult>, noBody, noHeaders, noQuery),
    getGuildIntegrations: buildEndpoint('getGuildIntegrations', 'GET', apiRoutes.guildIntegrations, jsonResponse<Discord.RESTGetAPIGuildIntegrationsResult>, noBody, noHeaders, noQuery),
    deleteGuildIntegration: buildEndpoint('deleteGuildIntegration', 'DELETE', apiRoutes.guildIntegration, noContent, noBody, auditLogReason, noQuery),
    getGuildWidgetSettings: buildEndpoint('getGuildWidgetSettings', 'GET', apiRoutes.guildWidget, jsonResponse<Discord.RESTGetAPIGuildWidgetSettingsResult>, noBody, noHeaders, noQuery),
    modifyGuildWidget: buildEndpoint('modifyGuildWidget', 'PATCH', apiRoutes.guildWidget, jsonResponse<Discord.RESTPatchAPIGuildWidgetSettingsResult>, jsonBody<Discord.RESTPatchAPIGuildWidgetSettingsJSONBody>({ channel_id: true, enabled: true, }), auditLogReason, noQuery),
    getGuildWidget: buildEndpoint('getGuildWidget', 'GET', apiRoutes.guildWidgetJson, jsonResponse<Discord.RESTGetAPIGuildWidgetJSONResult>, noBody, noHeaders, noQuery),
    getGuildVanityURL: buildEndpoint('getGuildVanityURL', 'GET', apiRoutes.guildVanityUrl, jsonResponse<Discord.RESTGetAPIGuildVanityUrlResult>, noBody, noHeaders, noQuery),
    getGuildWidgetImage: buildEndpoint('getGuildWidgetImage', 'GET', apiRoutes.guildWidgetImage, jsonResponse<Discord.RESTGetAPIGuildWidgetImageResult>, noBody, noHeaders, query<Discord.RESTGetAPIGuildWidgetImageQuery>({ style: true, })),
    getGuildWelcomeScreen: buildEndpoint('getGuildWelcomeScreen', 'GET', apiRoutes.guildWelcomeScreen, jsonResponse<Discord.RESTGetAPIGuildWelcomeScreenResult>, noBody, noHeaders, noQuery),
    modifyGuildWelcomeScreen: buildEndpoint('modifyGuildWelcomeScreen', 'PATCH', apiRoutes.guildWelcomeScreen, jsonResponse<Discord.RESTPatchAPIGuildWelcomeScreenResult>, jsonBody<Discord.RESTPatchAPIGuildWelcomeScreenJSONBody>({ description: true, enabled: true, welcome_channels: true, }), auditLogReason, noQuery),
    modifyCurrentUserVoiceState: buildEndpoint('modifyCurrentUserVoiceState', 'PATCH', apiRoutes.voiceStateSelf, noContent, jsonBody<Discord.RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody>({ channel_id: true, request_to_speak_timestamp: true, suppress: true, }), noHeaders, noQuery),
    modifyUserVoiceState: buildEndpoint('modifyUserVoiceState', 'PATCH', apiRoutes.voiceState, noContent, jsonBody<Discord.RESTPatchAPIGuildVoiceStateUserJSONBody>({ channel_id: true, suppress: true, }), noHeaders, noQuery),
    getInvite: buildEndpoint('getInvite', 'GET', apiRoutes.invite, jsonResponse<Discord.RESTGetAPIInviteResult>, noBody, noHeaders, query<Discord.RESTGetAPIInviteQuery>({ guild_scheduled_event_id: true, with_counts: true, with_expiration: true, })),
    deleteInvite: buildEndpoint('deleteInvite', 'DELETE', apiRoutes.invite, jsonResponse<Discord.RESTDeleteAPIInviteResult>, noBody, auditLogReason, noQuery),
    createStageInstance: buildEndpoint('createStageInstance', 'POST', apiRoutes.stageInstances, jsonResponse<Discord.RESTPostAPIStageInstanceResult>, jsonBody<Discord.RESTPostAPIStageInstanceJSONBody>({ channel_id: true, privacy_level: true, send_start_notification: true, topic: true, }), auditLogReason, noQuery),
    getStageInstance: buildEndpoint('getStageInstance', 'GET', apiRoutes.stageInstance, jsonResponse<Discord.RESTGetAPIStageInstanceResult>, noBody, noHeaders, noQuery),
    modifyStageInstance: buildEndpoint('modifyStageInstance', 'PATCH', apiRoutes.stageInstance, jsonResponse<Discord.RESTPatchAPIStageInstanceResult>, jsonBody<Discord.RESTPatchAPIStageInstanceJSONBody>({ privacy_level: true, topic: true, }), auditLogReason, noQuery),
    deleteStageInstance: buildEndpoint('deleteStageInstance', 'DELETE', apiRoutes.stageInstance, noContent, noBody, auditLogReason, noQuery),
    getSticker: buildEndpoint('getSticker', 'GET', apiRoutes.sticker, jsonResponse<Discord.RESTGetAPIStickerResult>, noBody, noHeaders, noQuery),
    listNitroStickerPacks: buildEndpoint('listNitroStickerPacks', 'GET', apiRoutes.stickerPacks, jsonResponse<Discord.RESTGetNitroStickerPacksResult>, noBody, noHeaders, noQuery),
    listGuildStickers: buildEndpoint('listGuildStickers', 'GET', apiRoutes.guildStickers, jsonResponse<Discord.RESTGetAPIGuildStickersResult>, noBody, noHeaders, noQuery),
    getGuildSticker: buildEndpoint('getGuildSticker', 'GET', apiRoutes.guildSticker, jsonResponse<Discord.RESTGetAPIGuildStickerResult>, noBody, auditLogReason, noQuery),
    createGuildSticker: buildEndpoint('createGuildSticker', 'POST', apiRoutes.guildStickers, jsonResponse<Discord.RESTPostAPIGuildStickerResult>, formDataBody<Discord.RESTPostAPIGuildStickerFormDataBody & { file: DiscordFile }>({ description: true, file: true, name: true, tags: true, }), auditLogReason, noQuery),
    modifyGuildSticker: buildEndpoint('modifyGuildSticker', 'PATCH', apiRoutes.guildSticker, jsonResponse<Discord.RESTPatchAPIGuildStickerResult>, jsonBody<Discord.RESTPatchAPIGuildStickerJSONBody>({ description: true, name: true, tags: true, }), auditLogReason, noQuery),
    deleteGuildSticker: buildEndpoint('deleteGuildSticker', 'DELETE', apiRoutes.guildSticker, noContent, noBody, auditLogReason, noQuery),
    getCurrentUser: buildEndpoint('getCurrentUser', 'GET', apiRoutes.self, jsonResponse<Discord.RESTGetAPICurrentUserResult>, noBody, noHeaders, noQuery),
    getUser: buildEndpoint('getUser', 'GET', apiRoutes.user, jsonResponse<Discord.RESTGetAPIUserResult>, noBody, noHeaders, noQuery),
    modifyCurrentUser: buildEndpoint('modifyCurrentUser', 'PATCH', apiRoutes.self, jsonResponse<Discord.RESTPatchAPICurrentUserResult>, jsonBody<Discord.RESTPatchAPICurrentUserJSONBody>({ avatar: true, username: true, }), noHeaders, noQuery),
    getCurrentUserGuilds: buildEndpoint('getCurrentUserGuilds', 'GET', apiRoutes.selfGuilds, jsonResponse<Discord.RESTGetAPICurrentUserGuildsResult>, noBody, noHeaders, query<Discord.RESTGetAPICurrentUserGuildsQuery>({ after: true, before: true, limit: true, with_counts: true, })),
    getCurrentUserGuildMember: buildEndpoint('getCurrentUserGuildMember', 'GET', apiRoutes.selfGuildMember, jsonResponse<Discord.RESTGetAPIGuildMemberResult>, noBody, noHeaders, noQuery),
    leaveGuild: buildEndpoint('leaveGuild', 'DELETE', apiRoutes.selfGuild, noContent, noBody, noHeaders, noQuery),
    createDM: buildEndpoint('createDM', 'POST', apiRoutes.dmChannels, jsonResponse<Discord.RESTPostAPICurrentUserCreateDMChannelResult>, jsonBody<Discord.RESTPostAPICurrentUserCreateDMChannelJSONBody>({ recipient_id: true, }), noHeaders, noQuery),
    createGroupDM: buildEndpoint('createGroupDM', 'POST', apiRoutes.dmChannels, jsonResponse<Discord.RESTPostAPICurrentUserCreateDMChannelResult>, jsonBody<Discord.RESTPostAPICurrentUserCreateDMChannelJSONBody>({ recipient_id: true, }), noHeaders, noQuery),
    getUserConnections: buildEndpoint('getUserConnections', 'GET', apiRoutes.connections, jsonResponse<Discord.RESTGetAPICurrentUserConnectionsResult>, noBody, noHeaders, noQuery),
    getUserApplicationRoleConnection: buildEndpoint('getUserApplicationRoleConnection', 'GET', apiRoutes.selfRoleConnections, jsonResponse<Discord.RESTGetAPICurrentUserApplicationRoleConnectionResult>, noBody, noHeaders, noQuery),
    updateUserApplicationRoleConnection: buildEndpoint('updateUserApplicationRoleConnection', 'PUT', apiRoutes.selfRoleConnections, jsonResponse<Discord.RESTPutAPICurrentUserApplicationRoleConnectionResult>, jsonBody<Discord.RESTPutAPICurrentUserApplicationRoleConnectionJSONBody>({ metadata: true, platform_name: true, platform_username: true, }), noHeaders, noQuery),
    listVoiceRegions: buildEndpoint('listVoiceRegions', 'GET', apiRoutes.voiceRegions, jsonResponse<Discord.RESTGetAPIVoiceRegionsResult>, noBody, noHeaders, noQuery),
    createWebhook: buildEndpoint('createWebhook', 'POST', apiRoutes.channelWebhooks, jsonResponse<Discord.RESTPostAPIChannelWebhookResult>, jsonBody<Discord.RESTPostAPIChannelWebhookJSONBody>({ avatar: true, name: true, }), auditLogReason, noQuery),
    getChannelWebhooks: buildEndpoint('getChannelWebhooks', 'GET', apiRoutes.channelWebhooks, jsonResponse<Discord.RESTGetAPIChannelWebhooksResult>, noBody, noHeaders, noQuery),
    getGuildWebhooks: buildEndpoint('getGuildWebhooks', 'GET', apiRoutes.channelWebhooks, jsonResponse<Discord.RESTGetAPIChannelWebhooksResult>, noBody, noHeaders, noQuery),
    getWebhook: buildEndpoint('getWebhook', 'GET', apiRoutes.webhook, jsonResponse<Discord.RESTGetAPIWebhookResult>, noBody, noHeaders, noQuery),
    getWebhookwithToken: buildEndpoint('getWebhookwithToken', 'GET', apiRoutes.webhookToken, jsonResponse<Discord.RESTGetAPIWebhookWithTokenResult>, noBody, noHeaders, noQuery),
    modifyWebhook: buildEndpoint('modifyWebhook', 'PATCH', apiRoutes.webhook, jsonResponse<Discord.RESTPatchAPIWebhookResult>, jsonBody<Discord.RESTPatchAPIWebhookJSONBody>({ avatar: true, channel_id: true, name: true, }), auditLogReason, noQuery),
    modifyWebhookwithToken: buildEndpoint('modifyWebhookwithToken', 'PATCH', apiRoutes.webhookToken, jsonResponse<Discord.RESTPatchAPIWebhookWithTokenResult>, jsonBody<Discord.RESTPatchAPIWebhookWithTokenJSONBody>({ avatar: true, name: true, }), noHeaders, noQuery),
    deleteWebhook: buildEndpoint('deleteWebhook', 'DELETE', apiRoutes.webhook, noContent, noBody, auditLogReason, noQuery),
    deleteWebhookwithToken: buildEndpoint('deleteWebhookwithToken', 'DELETE', apiRoutes.webhookToken, noContent, noBody, noHeaders, noQuery),
    executeWebhook: buildEndpoint('executeWebhook', 'POST', apiRoutes.webhookToken, jsonResponse<Discord.RESTPostAPIWebhookWithTokenResult>, jsonBody<Discord.RESTPostAPIWebhookWithTokenJSONBody>({ allowed_mentions: true, attachments: true, avatar_url: true, components: true, content: true, embeds: true, flags: true, thread_name: true, tts: true, username: true, }), noHeaders, query<Discord.RESTPostAPIWebhookWithTokenQuery>({ thread_id: true, wait: true, })),
    executeSlackCompatibleWebhook: buildEndpoint('executeSlackCompatibleWebhook', 'POST', apiRoutes.slackWebhook, noContent, (body: IHttpContent) => body, noHeaders, noQuery),
    waitSlackCompatibleWebhook: buildEndpoint('waitSlackCompatibleWebhook', 'POST', apiRoutes.slackWebhook, jsonResponse<Discord.RESTPostAPIWebhookWithTokenSlackWaitResult>, (body: IHttpContent) => body, noHeaders, query<Discord.RESTPostAPIWebhookWithTokenSlackQuery>({ thread_id: true, wait: true, })),
    executeGitHubCompatibleWebhook: buildEndpoint('executeGitHubCompatibleWebhook', 'POST', apiRoutes.githubWebhook, noContent, (body: IHttpContent) => body, noHeaders, noQuery),
    waitGitHubCompatibleWebhook: buildEndpoint('waitGitHubCompatibleWebhook', 'POST', apiRoutes.githubWebhook, jsonResponse<Discord.RESTPostAPIWebhookWithTokenGitHubWaitResult>, (body: IHttpContent) => body, noHeaders, query<Discord.RESTPostAPIWebhookWithTokenGitHubQuery>({ thread_id: true, wait: true, })),
    getWebhookMessage: buildEndpoint('getWebhookMessage', 'GET', apiRoutes.webhookMessage, jsonResponse<Discord.RESTGetAPIWebhookWithTokenMessageResult>, noBody, noHeaders, query<Discord.RESTGetAPIWebhookWithTokenMessageQuery>({ thread_id: true, })),
    editWebhookMessage: buildEndpoint('editWebhookMessage', 'PATCH', apiRoutes.webhookMessage, jsonResponse<Discord.RESTPatchAPIWebhookWithTokenMessageResult>, jsonBody<Discord.RESTPatchAPIWebhookWithTokenMessageJSONBody>({ allowed_mentions: true, attachments: true, components: true, content: true, embeds: true, }), noHeaders, noQuery),
    deleteWebhookMessage: buildEndpoint('deleteWebhookMessage', 'DELETE', apiRoutes.webhookMessage, noContent, noBody, noHeaders, noQuery),
    getGateway: buildEndpoint('getGateway', 'GET', apiRoutes.gateway, jsonResponse<Discord.RESTGetAPIGatewayResult>, noBody, noHeaders, noQuery),
    getGatewayBot: buildEndpoint('getGatewayBot', 'GET', apiRoutes.gatewayBot, jsonResponse<Discord.RESTGetAPIGatewayBotResult>, noBody, noHeaders, noQuery),
    getCurrentBotApplicationInformation: buildEndpoint('getCurrentBotApplicationInformation', 'GET', apiRoutes.oauthApplication, jsonResponse<Discord.RESTGetAPIOAuth2CurrentApplicationResult>, noBody, noHeaders, noQuery),
    getCurrentAuthorizationInformation: buildEndpoint('getCurrentAuthorizationInformation', 'GET', apiRoutes.oauthSelf, jsonResponse<Discord.RESTGetAPIOAuth2CurrentAuthorizationResult>, noBody, noHeaders, noQuery),
}

type AnyKeyOf<T> = T extends any ? keyof T : never;

function noContent(response: IHttpResponse) {
    if (response.status !== 204)
        throw new Error(`Expected an empty response (204), but got ${response.status}`);
    return Promise.resolve()
}
function noBody(_: {}) {
    return undefined;
}
function noHeaders(_: {}) {
    return new HttpHeaders();
}
function* noQuery(_: {}) {
}

function buildEndpoint<TUrl extends object, TBody extends object, THeaders extends object, TQuery extends object, TResult>(
    name: string,
    method: HttpMethod,
    route: IRoute<TUrl>,
    reader: (response: IHttpResponse) => PromiseLike<TResult>,
    body: (arg: TBody) => IHttpContent | undefined,
    headers: (arg: THeaders) => HttpHeaders,
    query: (arg: TQuery) => Iterable<readonly [string, string]>
): IEndpoint<TUrl & TBody & THeaders & TQuery, TResult> {
    return {
        name,
        method,
        route,
        readResponse: reader,
        createRequest(model) {
            const url = route.getUrl(model);
            for (const [key, value] of query(model))
                url.searchParams.append(key, value);
            return {
                headers: headers(model),
                body: body(model),
                method,
                url
            }
        },
    }
}

function auditLogReason(options: { auditLogReason?: string }) {
    const headers = new HttpHeaders();
    if (options.auditLogReason !== undefined)
        headers.set('x-audit-log-reason', options.auditLogReason);
    return headers;
}

function query<T extends object>(template: { [P in AnyKeyOf<T>]-?: true }) {
    const keys = Object.keys(template) as Array<keyof T>;
    return function* (model: T) {
        for (const key of keys)
            yield [key, String(model[key])] as const;
    }
}

async function contentResponse(response: IHttpResponse) {
    return response.body;
}

async function jsonResponse<T>(response: IHttpResponse): Promise<T extends never ? void : T>
async function jsonResponse(response: IHttpResponse): Promise<unknown> {
    const body = response.body;
    const contentType = body.headers?.get('content-type') ?? '';
    if (!contentType.startsWith('application/json') && !contentType.startsWith('text/json'))
        throw new Error(`Expected response to be json but got ${contentType}`);

    const result = await readAsJson(body);
    if (response.status >= 200 && response.status < 400)
        return result;

    if ('retry_after' in result)
        throw new DiscordRateLimitError(result as Discord.RESTRateLimit);

    throw new DiscordRestError(result as Discord.RESTError)
}

const decoder = new TextDecoder();
async function readAsJson(content: IHttpContent) {
    const chunks = [];
    for await (const chunk of content.stream())
        chunks.push(decoder.decode(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)));
    return JSON.parse(chunks.join(''));
}

const encoder = new TextEncoder();
function jsonBody<T>(template: { [P in AnyKeyOf<T>]-?: true }) {
    const keys = Object.keys(template) as Array<keyof T>;
    return (model: T) => jsonContent(Object.fromEntries(keys.map(k => [k, model[k]] as const)))
}
function jsonContent(value: unknown): IHttpContent {
    return {
        headers: new HttpHeaders({
            'content-type': `application/json; charset=${encoder.encoding}`
        }),
        async * stream() {
            yield encoder.encode(JSON.stringify(value));
        }
    }
}

function formDataBody<T>(template: { [P in AnyKeyOf<T>]-?: true }) {
    const keys = Object.keys(template) as Array<string & keyof T>;
    return (model: T): IHttpContent => createFormData(getFields(model));
    function* getFields(model: T) {
        for (const key of keys) {
            const value = model[key];
            switch (typeof value) {
                case 'object': {
                    if (value instanceof DiscordFile)
                        yield fileToFormField(key, value);
                    else if (value instanceof Blob)
                        yield blobToFormField(key, value);
                    else if (isArrayBufferView(value))
                        yield bufferViewToFormField(key, value);
                    else if (isArrayBufferLike(value))
                        yield bufferViewToFormField(key, new Uint8Array(value));
                    else
                        yield httpContentToFormField(key, jsonContent(value))
                    break;
                }
                case 'bigint':
                case 'boolean':
                case 'number':
                case 'string':
                    yield bufferViewToFormField(key, encoder.encode(String(value)));
                    break;
            }
        }
    }
}
function isArrayBufferView(value: object | null): value is ArrayBufferView {
    return value !== null
        && 'buffer' in value
        && isArrayBufferLike(value.buffer)
        && 'byteLength' in value
        && typeof value.byteLength === 'number'
        && 'byteOffset' in value
        && typeof value.byteOffset === 'number';
}

function isArrayBufferLike(value: unknown): value is ArrayBufferLike {
    return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
}

type Files = `files[${bigint}]`;
type NoFilesOrPayloadJson<T> = Omit<T, 'payload_json' | Files | 'files'>;
type FileMap = { files?: Record<`${bigint}`, DiscordFile> }
function jsonPayloadFormDataBody<T extends Record<Files, unknown>>(template: { [P in AnyKeyOf<NoFilesOrPayloadJson<T>>]-?: true }) {
    const keys = Object.keys(template) as Array<string & AnyKeyOf<NoFilesOrPayloadJson<T>>>;
    return (model: NoFilesOrPayloadJson<T> & FileMap) => createFormData(getFields(model))
    function* getFields(model: NoFilesOrPayloadJson<T> & FileMap) {
        const jsonPayload: Record<string, unknown> = {};
        for (const key of keys) {
            jsonPayload[key] = model[key];
        }
        for (const id of Object.keys(model.files ?? {}) as `${bigint}`[])
            yield fileToFormField(`files[${id}]`, model.files![id]!);

        yield httpContentToFormField('payload_json', jsonContent(jsonPayload));
    }
}

interface IFormField extends IHttpContent {
    readonly name: string;
    readonly fileName?: string;
}

const newline = encoder.encode('\n');
function createFormData(fields: Iterable<IFormField>): IHttpContent {
    const boundary = createFormDataBoundary();
    return {
        headers: new HttpHeaders({
            'content-type': `multipart/form-data; boundary=${boundary}; charset=${encoder.encoding}`
        }),
        async * stream() {
            for (const field of fields) {
                yield encoder.encode(field.fileName === undefined
                    ? `--${boundary}\nContent-Disposition: form-data; name=${encodeURIComponent(field.name)}\n`
                    : `--${boundary}\nContent-Disposition: form-data; name=${encodeURIComponent(field.name)}; filename=${encodeURIComponent(__filename)}\n`);
                for (const [header, value] of field.headers ?? []) {
                    if (header.toLowerCase() === 'content-disposition') {

                    } else {
                        yield encoder.encode(`${header}: ${value}\n`);
                    }
                }
                yield newline;
                yield* field.stream();
                yield newline;
            }
        },
    }
}

const randomHex = () => Math.floor(Math.random() * 1000000000000000).toString(16);
function createFormDataBoundary() {
    return `boundary-${randomHex() + randomHex() + randomHex() + randomHex()}`;
}

function fileToFormField(name: string, file: DiscordFile): IFormField {
    return {
        name,
        stream: () => file.content.stream(),
        fileName: file.name,
        headers: file.content.headers
    }
}

function blobToFormField(name: string, content: Blob): IFormField {
    return {
        name,
        stream: () => content.stream(),
        headers: new HttpHeaders({
            'content-type': content.type
        })
    }
}

function bufferViewToFormField(name: string, content: ArrayBufferView, contentType = ''): IFormField {
    return {
        name,
        async * stream() {
            yield content;
        },
        headers: new HttpHeaders({
            'content-type': contentType
        })
    }
}

function httpContentToFormField(name: string, content: IHttpContent): IFormField {
    return {
        name,
        stream: () => content.stream(),
        headers: content.headers
    }
}