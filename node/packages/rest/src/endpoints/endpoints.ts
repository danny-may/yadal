import { DiscordRateLimitError, DiscordRestError } from "../errors";
import { HttpHeaders, HttpMethod, IHttpResponse } from "../http";
import { IEndpoint } from "./IEndpoint";
import * as Discord from 'discord-api-types/v10'
import { paths } from "../paths";
import { DiscordFile } from "./DiscordFile";
import { Blob, URL } from "@yadal/dep";

export const getGlobalCommands = buildEndpoint('getGlobalCommands', 'GET', paths.commands, jsonResponse<Discord.RESTGetAPIApplicationCommandsResult>, undefined, undefined, query<Discord.RESTGetAPIApplicationCommandsQuery>);
export const editGlobalCommands = buildEndpoint('editGlobalCommands', 'PUT', paths.commands, jsonResponse<Discord.RESTPutAPIApplicationCommandsResult>, jsonBody<Discord.RESTPutAPIApplicationCommandsJSONBody>);
export const createGlobalCommand = buildEndpoint('getGlobalCommand', 'POST', paths.commands, jsonResponse<Discord.RESTPostAPIApplicationCommandsResult>, jsonBody<Discord.RESTPostAPIApplicationCommandsJSONBody>);
export const getGlobalCommand = buildEndpoint('getGlobalCommand', 'GET', paths.command, jsonResponse<Discord.RESTGetAPIApplicationCommandResult>);
export const editGlobalCommand = buildEndpoint('editGlobalCommand', 'PATCH', paths.command, jsonResponse<Discord.RESTPatchAPIApplicationCommandResult>, jsonBody<Discord.RESTPatchAPIApplicationCommandJSONBody>);
export const deleteGlobalCommand = buildEndpoint('deleteGlobalCommand', 'DELETE', paths.command, jsonResponse<void>);
export const getGuildCommands = buildEndpoint('getGuildCommands', 'GET', paths.guildCommands, jsonResponse<Discord.RESTGetAPIApplicationGuildCommandsResult>, undefined, undefined, query<Discord.RESTGetAPIApplicationGuildCommandsQuery>);
export const editGuildCommands = buildEndpoint('editGuildCommands', 'PUT', paths.guildCommands, jsonResponse<Discord.RESTPutAPIApplicationGuildCommandsResult>, jsonBody<Discord.RESTPutAPIApplicationGuildCommandsJSONBody>);
export const createGuildCommand = buildEndpoint('createGuildCommand', 'POST', paths.guildCommands, jsonResponse<Discord.RESTPostAPIApplicationGuildCommandsResult>, jsonBody<Discord.RESTPostAPIApplicationGuildCommandsJSONBody>);
export const getGuildCommand = buildEndpoint('getGuildCommand', 'GET', paths.guildCommand, jsonResponse<Discord.RESTGetAPIApplicationGuildCommandResult>);
export const editGuildCommand = buildEndpoint('editGuildCommand', 'PATCH', paths.guildCommand, jsonResponse<Discord.RESTPatchAPIApplicationGuildCommandResult>, jsonBody<Discord.RESTPatchAPIApplicationGuildCommandJSONBody>);
export const deleteGuildCommand = buildEndpoint('deleteGuildCommand', 'DELETE', paths.guildCommand, jsonResponse<void>);
export const getGuildCommandsPermissions = buildEndpoint('getGuildCommandsPermissions', 'GET', paths.guildCommandsPermissions, jsonResponse<Discord.RESTGetAPIGuildApplicationCommandsPermissionsResult>);
export const editGuildCommandsPermissions = buildEndpoint('editGuildCommandsPermissions', 'PUT', paths.guildCommandsPermissions, jsonResponse<Discord.RESTPutAPIGuildApplicationCommandsPermissionsResult>, jsonBody<Discord.RESTPutAPIGuildApplicationCommandsPermissionsJSONBody>);
export const getGuildCommandPermissions = buildEndpoint('getGuildCommandPermissions', 'GET', paths.guildCommandPermissions, jsonResponse<Discord.RESTGetAPIApplicationCommandPermissionsResult>);
export const editGuildCommandPermissions = buildEndpoint('editGuildCommandPermissions', 'PUT', paths.guildCommandPermissions, jsonResponse<Discord.RESTPutAPIApplicationCommandPermissionsResult>, jsonBody<Discord.RESTPutAPIApplicationCommandPermissionsJSONBody>);
export const createInteractionResponse = buildEndpoint('createInteractionResponse', 'POST', paths.interactionCallback, jsonResponse<void>, jsonPayloadFormDataBody<Discord.RESTPostAPIInteractionCallbackFormDataBody>, undefined, undefined, false);
export const getOriginalInteractionResponse = buildEndpoint('getOriginalInteractionResponse', 'GET', paths.webhookOriginalMessage, jsonResponse<Discord.RESTGetAPIInteractionOriginalResponseResult>, undefined, undefined, undefined, false);
export const editOriginalInteractionResponse = buildEndpoint('editOriginalInteractionResponse', 'PATCH', paths.webhookOriginalMessage, jsonResponse<Discord.RESTPatchAPIInteractionOriginalResponseResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIInteractionOriginalResponseFormDataBody>, undefined, undefined, false);
export const deleteOriginalInteractionResponse = buildEndpoint('deleteOriginalInteractionResponse', 'DELETE', paths.webhookOriginalMessage, jsonResponse<void>, undefined, undefined, undefined, false);
export const createFollowUpMessage = buildEndpoint('createFollowUpMessage', 'POST', paths.webhookToken, jsonResponse<Discord.RESTPostAPIInteractionFollowupResult>, jsonPayloadFormDataBody<Discord.RESTPostAPIInteractionFollowupFormDataBody>, undefined, undefined, false);
export const getFollowUpMessage = buildEndpoint('getFollowUpMessage', 'GET', paths.webhookMessage, jsonResponse<Discord.RESTGetAPIInteractionFollowupResult>, undefined, undefined, undefined, false);
export const editFollowUpMessage = buildEndpoint('editFollowUpMessage', 'PATCH', paths.webhookMessage, jsonResponse<Discord.RESTPatchAPIInteractionFollowupResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIInteractionFollowupFormDataBody>, undefined, undefined, false);
export const deleteFollowUpMessage = buildEndpoint('deleteFollowUpMessage', 'DELETE', paths.webhookMessage, jsonResponse<void>, undefined, undefined, undefined, false);
export const getApplicationRoleConnectionMetadata = buildEndpoint('getApplicationRoleConnectionMetadata', 'GET', paths.applicationRoleConnectionMetadata, jsonResponse<Discord.RESTGetAPIApplicationRoleConnectionMetadataResult>);
export const updateApplicationRoleConnectionMetadata = buildEndpoint('updateApplicationRoleConnectionMetadata', 'PUT', paths.applicationRoleConnectionMetadata, jsonResponse<Discord.RESTPutAPIApplicationRoleConnectionMetadataJSONBody>, jsonBody<Discord.RESTPutAPIApplicationRoleConnectionMetadataResult>);
export const getGuildAuditLog = buildEndpoint('getGuildAuditLog', 'GET', paths.auditLogs, jsonResponse<Discord.RESTGetAPIAuditLogResult>, undefined, undefined, query<Discord.RESTGetAPIAuditLogQuery>);
export const listAutoModerationRules = buildEndpoint('listAutoModerationRules', 'GET', paths.autoModerationRules, jsonResponse<Discord.RESTGetAPIAutoModerationRulesResult>);
export const createAutoModerationRule = buildEndpoint('createAutoModerationRule', 'POST', paths.autoModerationRules, jsonResponse<Discord.RESTPostAPIAutoModerationRuleResult>, jsonBody<Discord.RESTPostAPIAutoModerationRuleJSONBody>, auditLogReason);
export const getAutoModerationRule = buildEndpoint('getAutoModerationRule', 'GET', paths.autoModerationRule, jsonResponse<Discord.RESTGetAPIAutoModerationRuleResult>);
export const editAutoModerationRule = buildEndpoint('editAutoModerationRule', 'PATCH', paths.autoModerationRule, jsonResponse<Discord.RESTPatchAPIAutoModerationRuleResult>, jsonBody<Discord.RESTPatchAPIAutoModerationRuleJSONBody>, auditLogReason);
export const deleteAutoModerationRule = buildEndpoint('deleteAutoModerationRule', 'DELETE', paths.autoModerationRule, jsonResponse<void>, undefined, auditLogReason);
export const getChannel = buildEndpoint('getChannel', 'GET', paths.channel, jsonResponse<Discord.RESTGetAPIChannelResult>);
export const modifyChannel = buildEndpoint('modifyChannel', 'PATCH', paths.channel, jsonResponse<Discord.RESTPatchAPIChannelResult>, jsonBody<Discord.RESTPatchAPIChannelJSONBody>, auditLogReason);
export const deleteChannel = buildEndpoint('deleteChannel', 'DELETE', paths.channel, jsonResponse<Discord.RESTDeleteAPIChannelResult>, undefined, auditLogReason);
export const getChannelMessages = buildEndpoint('getChannelMessages', 'GET', paths.messages, jsonResponse<Discord.RESTGetAPIChannelMessagesResult>, undefined, undefined, query<Discord.RESTGetAPIChannelMessagesQuery>);
export const getChannelMessage = buildEndpoint('getChannelMessage', 'GET', paths.message, jsonResponse<Discord.RESTGetAPIChannelMessageResult>);
export const createMessage = buildEndpoint('createMessage', 'POST', paths.messages, jsonResponse<Discord.RESTPostAPIChannelMessageResult>, jsonPayloadFormDataBody<Discord.RESTPostAPIChannelMessageFormDataBody>);
export const crosspostMessage = buildEndpoint('crosspostMessage', 'POST', paths.messageCrosspost, jsonResponse<Discord.RESTPostAPIChannelMessageCrosspostResult>);
export const createReaction = buildEndpoint('createReaction', 'PUT', paths.messageReactionSelf, jsonResponse<void>);
export const deleteOwnReaction = buildEndpoint('deleteOwnReaction', 'DELETE', paths.messageReactionSelf, jsonResponse<void>);
export const deleteUserReaction = buildEndpoint('deleteUserReaction', 'DELETE', paths.messageReactionUser, jsonResponse<void>);
export const getReactions = buildEndpoint('getReactions', 'GET', paths.messageReactionUsers, jsonResponse<Discord.RESTGetAPIChannelMessageReactionUsersResult>, undefined, undefined, query<Discord.RESTGetAPIChannelMessageReactionUsersQuery>);
export const deleteAllReactions = buildEndpoint('deleteAllReactions', 'DELETE', paths.messageReactions, jsonResponse<void>);
export const deleteAllReactionsforEmoji = buildEndpoint('deleteAllReactionsforEmoji', 'DELETE', paths.messageReactionUsers, jsonResponse<void>);
export const editMessage = buildEndpoint('editMessage', 'PATCH', paths.message, jsonResponse<Discord.RESTPatchAPIChannelMessageResult>, jsonPayloadFormDataBody<Discord.RESTPatchAPIChannelMessageFormDataBody>);
export const deleteMessage = buildEndpoint('deleteMessage', 'DELETE', paths.message, jsonResponse<void>, undefined, auditLogReason);
export const bulkDeleteMessages = buildEndpoint('bulkDeleteMessages', 'POST', paths.bulkDeleteMessages, jsonResponse<void>, jsonBody<Discord.RESTPostAPIChannelMessagesBulkDeleteJSONBody>, auditLogReason);
export const editChannelPermissions = buildEndpoint('editChannelPermissions', 'PUT', paths.channelPermission, jsonResponse<void>, jsonBody<Discord.RESTPutAPIChannelPermissionJSONBody>, auditLogReason);
export const getChannelInvites = buildEndpoint('getChannelInvites', 'GET', paths.channelInvites, jsonResponse<Discord.RESTGetAPIChannelInvitesResult>);
export const createChannelInvite = buildEndpoint('createChannelInvite', 'POST', paths.channelInvites, jsonResponse<Discord.RESTPostAPIChannelInviteResult>, jsonBody<Discord.RESTPostAPIChannelInviteJSONBody>, auditLogReason);
export const deleteChannelPermission = buildEndpoint('deleteChannelPermission', 'DELETE', paths.channelPermission, jsonResponse<void>, undefined, auditLogReason);
export const followAnnouncementChannel = buildEndpoint('followAnnouncementChannel', 'POST', paths.channelFollowers, jsonResponse<Discord.RESTPostAPIChannelFollowersResult>, jsonBody<Discord.RESTPostAPIChannelFollowersJSONBody>);
export const triggerTypingIndicator = buildEndpoint('triggerTypingIndicator', 'POST', paths.channelTyping, jsonResponse<void>);
export const getPinnedMessages = buildEndpoint('getPinnedMessages', 'GET', paths.channelPins, jsonResponse<Discord.RESTGetAPIChannelPinsResult>);
export const pinMessage = buildEndpoint('pinMessage', 'PUT', paths.channelPin, jsonResponse<void>, undefined, auditLogReason);
export const unpinMessage = buildEndpoint('unpinMessage', 'DELETE', paths.channelPin, jsonResponse<void>, undefined, auditLogReason);
export const groupDMAddRecipient = buildEndpoint('groupDMAddRecipient', 'PUT', paths.channelRecipient, jsonResponse<Discord.RESTPutAPIChannelRecipientResult>, jsonBody<Discord.RESTPutAPIChannelRecipientJSONBody>);
export const groupDMRemoveRecipient = buildEndpoint('groupDMRemoveRecipient', 'DELETE', paths.channelRecipient, jsonResponse<Discord.RESTDeleteAPIChannelRecipientResult>);
export const startThreadfromMessage = buildEndpoint('startThreadfromMessage', 'POST', paths.messageThreads, jsonResponse<Discord.RESTPostAPIChannelMessagesThreadsResult>, jsonBody<Discord.RESTPostAPIChannelMessagesThreadsJSONBody>, auditLogReason);
export const startThreadwithoutMessage = buildEndpoint('startThreadwithoutMessage', 'POST', paths.channelThreads, jsonResponse<Discord.RESTPostAPIChannelThreadsResult>, jsonBody<Discord.RESTPostAPIChannelThreadsJSONBody>, auditLogReason);
export const startThreadinForumChannel = buildEndpoint('startThreadinForumChannel', 'POST', paths.channelThreads, jsonResponse<Discord.RESTPostAPIChannelThreadsResult>, jsonBody<Discord.RESTPostAPIGuildForumThreadsJSONBody>, auditLogReason);
export const joinThread = buildEndpoint('joinThread', 'PUT', paths.threadMemberSelf, jsonResponse<void>);
export const addThreadMember = buildEndpoint('addThreadMember', 'PUT', paths.threadMember, jsonResponse<void>);
export const leaveThread = buildEndpoint('leaveThread', 'DELETE', paths.threadMemberSelf, jsonResponse<void>);
export const removeThreadMember = buildEndpoint('removeThreadMember', 'DELETE', paths.threadMember, jsonResponse<void>);
export const getThreadMember = buildEndpoint('getThreadMember', 'GET', paths.threadMember, jsonResponse<Discord.RESTGetAPIChannelThreadMemberResult>, undefined, undefined, query<Discord.RESTGetAPIChannelThreadMemberQuery>);
export const listThreadMembers = buildEndpoint('listThreadMembers', 'GET', paths.threadMembers, jsonResponse<Discord.RESTGetAPIChannelThreadMembersResult>, undefined, undefined, query<Discord.RESTGetAPIChannelThreadMembersQuery>);
export const listPublicArchivedThreads = buildEndpoint('listPublicArchivedThreads', 'GET', paths.channelArchivedPublicThreads, jsonResponse<Discord.RESTGetAPIChannelThreadsArchivedPublicResult>, undefined, undefined, query<Discord.RESTGetAPIChannelThreadsArchivedQuery>);
export const listPrivateArchivedThreads = buildEndpoint('listPrivateArchivedThreads', 'GET', paths.channelArchivedPrivateThreads, jsonResponse<Discord.RESTGetAPIChannelThreadsArchivedPrivateResult>, undefined, undefined, query<Discord.RESTGetAPIChannelThreadsArchivedQuery>);
export const listJoinedPrivateArchivedThreads = buildEndpoint('listJoinedPrivateArchivedThreads', 'GET', paths.channelSelfArchivedPrivateThreads, jsonResponse<Discord.RESTGetAPIChannelUsersThreadsArchivedResult>);
export const listGuildEmojis = buildEndpoint('listGuildEmojis', 'GET', paths.guildEmojis, jsonResponse<Discord.RESTGetAPIGuildEmojisResult>);
export const getGuildEmoji = buildEndpoint('getGuildEmoji', 'GET', paths.guildEmoji, jsonResponse<Discord.RESTGetAPIGuildEmojiResult>);
export const createGuildEmoji = buildEndpoint('createGuildEmoji', 'POST', paths.guildEmojis, jsonResponse<Discord.RESTPostAPIGuildEmojiResult>, jsonBody<Discord.RESTPostAPIGuildEmojiJSONBody>, auditLogReason);
export const modifyGuildEmoji = buildEndpoint('modifyGuildEmoji', 'PATCH', paths.guildEmoji, jsonResponse<Discord.RESTPatchAPIGuildEmojiResult>, jsonBody<Discord.RESTPatchAPIGuildEmojiJSONBody>, auditLogReason);
export const deleteGuildEmoji = buildEndpoint('deleteGuildEmoji', 'DELETE', paths.guildEmoji, jsonResponse<void>, undefined, auditLogReason);
export const listScheduledEventsforGuild = buildEndpoint('listScheduledEventsforGuild', 'GET', paths.guildEvents, jsonResponse<Discord.RESTGetAPIGuildScheduledEventsResult>, undefined, undefined, query<Discord.RESTGetAPIGuildScheduledEventsQuery>);
export const createGuildScheduledEvent = buildEndpoint('createGuildScheduledEvent', 'POST', paths.guildEvents, jsonResponse<Discord.RESTPostAPIGuildScheduledEventResult>, jsonBody<Discord.RESTPostAPIGuildScheduledEventJSONBody>, auditLogReason);
export const getGuildScheduledEvent = buildEndpoint('getGuildScheduledEvent', 'GET', paths.guildEvent, jsonResponse<Discord.RESTGetAPIGuildScheduledEventResult>, undefined, undefined, query<Discord.RESTGetAPIGuildScheduledEventQuery>);
export const modifyGuildScheduledEvent = buildEndpoint('modifyGuildScheduledEvent', 'PATCH', paths.guildEvent, jsonResponse<Discord.RESTPatchAPIGuildScheduledEventResult>, jsonBody<Discord.RESTPatchAPIGuildScheduledEventJSONBody>, auditLogReason);
export const deleteGuildScheduledEvent = buildEndpoint('deleteGuildScheduledEvent', 'DELETE', paths.guildEvent, jsonResponse<void>);
export const getGuildScheduledEventUsers = buildEndpoint('getGuildScheduledEventUsers', 'GET', paths.guildEvent, jsonResponse<Discord.RESTGetAPIGuildScheduledEventUsersResult>, undefined, undefined, query<Discord.RESTGetAPIGuildScheduledEventUsersQuery>);
export const getGuildTemplate = buildEndpoint('getGuildTemplate', 'GET', paths.globalGuildTemplate, jsonResponse<Discord.RESTGetAPITemplateResult>);
export const createGuildfromGuildTemplate = buildEndpoint('createGuildfromGuildTemplate', 'POST', paths.globalGuildTemplate, jsonResponse<Discord.RESTPostAPITemplateCreateGuildResult>, jsonBody<Discord.RESTPostAPITemplateCreateGuildJSONBody>);
export const getGuildTemplates = buildEndpoint('getGuildTemplates', 'GET', paths.guildTemplates, jsonResponse<Discord.RESTGetAPIGuildTemplatesResult>);
export const createGuildTemplate = buildEndpoint('createGuildTemplate', 'POST', paths.guildTemplates, jsonResponse<Discord.RESTPostAPIGuildTemplatesResult>, jsonBody<Discord.RESTPostAPIGuildTemplatesJSONBody>);
export const syncGuildTemplate = buildEndpoint('syncGuildTemplate', 'PUT', paths.guildTemplate, jsonResponse<Discord.RESTPutAPIGuildTemplateSyncResult>);
export const modifyGuildTemplate = buildEndpoint('modifyGuildTemplate', 'PATCH', paths.guildTemplate, jsonResponse<Discord.RESTPatchAPIGuildTemplateResult>, jsonBody<Discord.RESTPatchAPIGuildTemplateJSONBody>);
export const deleteGuildTemplate = buildEndpoint('deleteGuildTemplate', 'DELETE', paths.guildTemplate, jsonResponse<Discord.RESTDeleteAPIGuildTemplateResult>);
export const createGuild = buildEndpoint('createGuild', 'POST', paths.guilds, jsonResponse<Discord.RESTPostAPIGuildsResult>, jsonBody<Discord.RESTPostAPIGuildsJSONBody>);
export const getGuild = buildEndpoint('getGuild', 'GET', paths.guild, jsonResponse<Discord.RESTGetAPIGuildResult>, undefined, undefined, query<Discord.RESTGetAPIGuildQuery>);
export const getGuildPreview = buildEndpoint('getGuildPreview', 'GET', paths.guildPreview, jsonResponse<Discord.RESTGetAPIGuildPreviewResult>);
export const modifyGuild = buildEndpoint('modifyGuild', 'PATCH', paths.guild, jsonResponse<Discord.RESTPatchAPIGuildResult>, jsonBody<Discord.RESTPatchAPIGuildJSONBody>, auditLogReason);
export const deleteGuild = buildEndpoint('deleteGuild', 'DELETE', paths.guild, jsonResponse<void>);
export const getGuildChannels = buildEndpoint('getGuildChannels', 'GET', paths.guildChannels, jsonResponse<Discord.RESTGetAPIGuildChannelsResult>);
export const createGuildChannel = buildEndpoint('createGuildChannel', 'POST', paths.guildChannels, jsonResponse<Discord.RESTPostAPIGuildChannelResult>, jsonBody<Discord.RESTPostAPIGuildChannelJSONBody>, auditLogReason);
export const modifyGuildChannelPositions = buildEndpoint('modifyGuildChannelPositions', 'PATCH', paths.guildChannels, jsonResponse<void>, jsonBody<Discord.RESTPatchAPIGuildChannelPositionsJSONBody>);
export const listActiveGuildThreads = buildEndpoint('listActiveGuildThreads', 'GET', paths.guildActiveThreads, jsonResponse<Discord.RESTGetAPIGuildThreadsResult>);
export const getGuildMember = buildEndpoint('getGuildMember', 'GET', paths.guildMember, jsonResponse<Discord.RESTGetAPIGuildMemberResult>);
export const listGuildMembers = buildEndpoint('listGuildMembers', 'GET', paths.guildMembers, jsonResponse<Discord.RESTGetAPIGuildMembersResult>, undefined, undefined, query<Discord.RESTGetAPIGuildMembersQuery>);
export const searchGuildMembers = buildEndpoint('searchGuildMembers', 'GET', paths.guildMemberSearch, jsonResponse<Discord.RESTGetAPIGuildMembersSearchResult>, undefined, undefined, query<Discord.RESTGetAPIGuildMembersSearchQuery>);
export const addGuildMember = buildEndpoint('addGuildMember', 'PUT', paths.guildMember, jsonResponse<Discord.RESTPutAPIGuildMemberResult>, jsonBody<Discord.RESTPutAPIGuildMemberJSONBody>);
export const modifyGuildMember = buildEndpoint('modifyGuildMember', 'PATCH', paths.guildMember, jsonResponse<Discord.RESTPatchAPIGuildMemberResult>, jsonBody<Discord.RESTPatchAPIGuildMemberJSONBody>, auditLogReason);
export const modifyCurrentMember = buildEndpoint('modifyCurrentMember', 'PATCH', paths.guildMemberSelf, jsonResponse<Discord.RESTPatchAPIGuildMemberResult>, jsonBody<Discord.RESTPatchAPIGuildMemberJSONBody>, auditLogReason);
export const addGuildMemberRole = buildEndpoint('addGuildMemberRole', 'PUT', paths.guildMemberRole, jsonResponse<void>, undefined, auditLogReason);
export const removeGuildMemberRole = buildEndpoint('removeGuildMemberRole', 'DELETE', paths.guildMemberRole, jsonResponse<void>, undefined, auditLogReason);
export const removeGuildMember = buildEndpoint('removeGuildMember', 'DELETE', paths.guildMember, jsonResponse<void>, undefined, auditLogReason);
export const getGuildBans = buildEndpoint('getGuildBans', 'GET', paths.guildBans, jsonResponse<Discord.RESTGetAPIGuildBansResult>, undefined, undefined, query<Discord.RESTGetAPIGuildBansQuery>);
export const getGuildBan = buildEndpoint('getGuildBan', 'GET', paths.guildBan, jsonResponse<Discord.RESTGetAPIGuildBanResult>);
export const createGuildBan = buildEndpoint('createGuildBan', 'PUT', paths.guildBan, jsonResponse<void>, jsonBody<Discord.RESTPutAPIGuildBanJSONBody>, auditLogReason);
export const removeGuildBan = buildEndpoint('removeGuildBan', 'DELETE', paths.guildBan, jsonResponse<void>, undefined, auditLogReason);
export const getGuildRoles = buildEndpoint('getGuildRoles', 'GET', paths.guildRoles, jsonResponse<Discord.RESTGetAPIGuildRolesResult>);
export const createGuildRole = buildEndpoint('createGuildRole', 'POST', paths.guildRoles, jsonResponse<Discord.RESTPostAPIGuildRoleResult>, jsonBody<Discord.RESTPostAPIGuildRoleJSONBody>, auditLogReason);
export const modifyGuildRolePositions = buildEndpoint('modifyGuildRolePositions', 'PATCH', paths.guildRoles, jsonResponse<Discord.RESTPatchAPIGuildRolePositionsResult>, jsonBody<Discord.RESTPatchAPIGuildRolePositionsJSONBody>, auditLogReason);
export const modifyGuildRole = buildEndpoint('modifyGuildRole', 'PATCH', paths.guildRole, jsonResponse<Discord.RESTPatchAPIGuildRoleResult>, jsonBody<Discord.RESTPatchAPIGuildRoleJSONBody>, auditLogReason);
export const modifyGuildMFALevel = buildEndpoint('modifyGuildMFALevel', 'POST', paths.guildMfaLevel, jsonResponse<Discord.RESTPostAPIGuildsMFAResult>, jsonBody<Discord.RESTPostAPIGuildsMFAJSONBody>, auditLogReason);
export const deleteGuildRole = buildEndpoint('deleteGuildRole', 'DELETE', paths.guildRole, jsonResponse<void>, undefined, auditLogReason);
export const getGuildPruneCount = buildEndpoint('getGuildPruneCount', 'GET', paths.guildPrune, jsonResponse<Discord.RESTGetAPIGuildPruneCountResult>, undefined, undefined, query<Discord.RESTGetAPIGuildPruneCountQuery>);
export const beginGuildPrune = buildEndpoint('beginGuildPrune', 'POST', paths.guildPrune, jsonResponse<Discord.RESTPostAPIGuildPruneResult>, jsonBody<Discord.RESTPostAPIGuildPruneJSONBody>, auditLogReason);
export const getGuildVoiceRegions = buildEndpoint('getGuildVoiceRegions', 'GET', paths.guildRegions, jsonResponse<Discord.RESTGetAPIVoiceRegionsResult>);
export const getGuildInvites = buildEndpoint('getGuildInvites', 'GET', paths.guildInvites, jsonResponse<Discord.RESTGetAPIGuildInvitesResult>);
export const getGuildIntegrations = buildEndpoint('getGuildIntegrations', 'GET', paths.guildIntegrations, jsonResponse<Discord.RESTGetAPIGuildIntegrationsResult>);
export const deleteGuildIntegration = buildEndpoint('deleteGuildIntegration', 'DELETE', paths.guildIntegration, jsonResponse<void>, undefined, auditLogReason);
export const getGuildWidgetSettings = buildEndpoint('getGuildWidgetSettings', 'GET', paths.guildWidget, jsonResponse<Discord.RESTGetAPIGuildWidgetSettingsResult>);
export const modifyGuildWidget = buildEndpoint('modifyGuildWidget', 'PATCH', paths.guildWidget, jsonResponse<Discord.RESTPatchAPIGuildWidgetSettingsResult>, jsonBody<Discord.RESTPatchAPIGuildWidgetSettingsJSONBody>, auditLogReason);
export const getGuildWidget = buildEndpoint('getGuildWidget', 'GET', paths.guildWidgetJson, jsonResponse<Discord.RESTGetAPIGuildWidgetJSONResult>);
export const getGuildVanityURL = buildEndpoint('getGuildVanityURL', 'GET', paths.guildVanityUrl, jsonResponse<Discord.RESTGetAPIGuildVanityUrlResult>);
export const getGuildWidgetImage = buildEndpoint('getGuildWidgetImage', 'GET', paths.guildWidgetImage, jsonResponse<Discord.RESTGetAPIGuildWidgetImageResult>, undefined, undefined, query<Discord.RESTGetAPIGuildWidgetImageQuery>);
export const getGuildWelcomeScreen = buildEndpoint('getGuildWelcomeScreen', 'GET', paths.guildWelcomeScreen, jsonResponse<Discord.RESTGetAPIGuildWelcomeScreenResult>);
export const modifyGuildWelcomeScreen = buildEndpoint('modifyGuildWelcomeScreen', 'PATCH', paths.guildWelcomeScreen, jsonResponse<Discord.RESTPatchAPIGuildWelcomeScreenResult>, jsonBody<Discord.RESTPatchAPIGuildWelcomeScreenJSONBody>, auditLogReason);
export const modifyCurrentUserVoiceState = buildEndpoint('modifyCurrentUserVoiceState', 'PATCH', paths.voiceStateSelf, jsonResponse<void>, jsonBody<Discord.RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody>);
export const modifyUserVoiceState = buildEndpoint('modifyUserVoiceState', 'PATCH', paths.voiceState, jsonResponse<void>, jsonBody<Discord.RESTPatchAPIGuildVoiceStateUserJSONBody>);
export const getInvite = buildEndpoint('getInvite', 'GET', paths.invite, jsonResponse<Discord.RESTGetAPIInviteResult>, undefined, undefined, query<Discord.RESTGetAPIInviteQuery>);
export const deleteInvite = buildEndpoint('deleteInvite', 'DELETE', paths.invite, jsonResponse<Discord.RESTDeleteAPIInviteResult>, undefined, auditLogReason);
export const createStageInstance = buildEndpoint('createStageInstance', 'POST', paths.stageInstances, jsonResponse<Discord.RESTPostAPIStageInstanceResult>, jsonBody<Discord.RESTPostAPIStageInstanceJSONBody>, auditLogReason);
export const getStageInstance = buildEndpoint('getStageInstance', 'GET', paths.stageInstance, jsonResponse<Discord.RESTGetAPIStageInstanceResult>);
export const modifyStageInstance = buildEndpoint('modifyStageInstance', 'PATCH', paths.stageInstance, jsonResponse<Discord.RESTPatchAPIStageInstanceResult>, jsonBody<Discord.RESTPatchAPIStageInstanceJSONBody>, auditLogReason);
export const deleteStageInstance = buildEndpoint('deleteStageInstance', 'DELETE', paths.stageInstance, jsonResponse<void>, undefined, auditLogReason);
export const getSticker = buildEndpoint('getSticker', 'GET', paths.sticker, jsonResponse<Discord.RESTGetAPIStickerResult>);
export const listNitroStickerPacks = buildEndpoint('listNitroStickerPacks', 'GET', paths.stickerPacks, jsonResponse<Discord.RESTGetNitroStickerPacksResult>);
export const listGuildStickers = buildEndpoint('listGuildStickers', 'GET', paths.guildStickers, jsonResponse<Discord.RESTGetAPIGuildStickersResult>);
export const getGuildSticker = buildEndpoint('getGuildSticker', 'GET', paths.guildSticker, jsonResponse<Discord.RESTGetAPIGuildStickerResult>, undefined, auditLogReason);
export const createGuildSticker = buildEndpoint('createGuildSticker', 'POST', paths.guildStickers, jsonResponse<Discord.RESTPostAPIGuildStickerResult>, formDataBody<Discord.RESTPostAPIGuildStickerFormDataBody & { file: DiscordFile }>, auditLogReason);
export const modifyGuildSticker = buildEndpoint('modifyGuildSticker', 'PATCH', paths.guildSticker, jsonResponse<Discord.RESTPatchAPIGuildStickerResult>, jsonBody<Discord.RESTPatchAPIGuildStickerJSONBody>, auditLogReason);
export const deleteGuildSticker = buildEndpoint('deleteGuildSticker', 'DELETE', paths.guildSticker, jsonResponse<void>, undefined, auditLogReason);
export const getCurrentUser = buildEndpoint('getCurrentUser', 'GET', paths.self, jsonResponse<Discord.RESTGetAPICurrentUserResult>);
export const getUser = buildEndpoint('getUser', 'GET', paths.user, jsonResponse<Discord.RESTGetAPIUserResult>);
export const modifyCurrentUser = buildEndpoint('modifyCurrentUser', 'PATCH', paths.self, jsonResponse<Discord.RESTPatchAPICurrentUserResult>, jsonBody<Discord.RESTPatchAPICurrentUserJSONBody>);
export const getCurrentUserGuilds = buildEndpoint('getCurrentUserGuilds', 'GET', paths.selfGuilds, jsonResponse<Discord.RESTGetAPICurrentUserGuildsResult>, undefined, undefined, query<Discord.RESTGetAPICurrentUserGuildsQuery>);
export const getCurrentUserGuildMember = buildEndpoint('getCurrentUserGuildMember', 'GET', paths.selfGuildMember, jsonResponse<Discord.RESTGetAPIGuildMemberResult>);
export const leaveGuild = buildEndpoint('leaveGuild', 'DELETE', paths.selfGuild, jsonResponse<void>);
export const createDM = buildEndpoint('createDM', 'POST', paths.dmChannels, jsonResponse<Discord.RESTPostAPICurrentUserCreateDMChannelResult>, jsonBody<Discord.RESTPostAPICurrentUserCreateDMChannelJSONBody>);
export const createGroupDM = buildEndpoint('createGroupDM', 'POST', paths.dmChannels, jsonResponse<Discord.RESTPostAPICurrentUserCreateDMChannelResult>, jsonBody<Discord.RESTPostAPICurrentUserCreateDMChannelJSONBody>);
export const getUserConnections = buildEndpoint('getUserConnections', 'GET', paths.connections, jsonResponse<Discord.RESTGetAPICurrentUserConnectionsResult>);
export const getUserApplicationRoleConnection = buildEndpoint('getUserApplicationRoleConnection', 'GET', paths.selfRoleConnections, jsonResponse<Discord.RESTGetAPICurrentUserApplicationRoleConnectionResult>);
export const updateUserApplicationRoleConnection = buildEndpoint('updateUserApplicationRoleConnection', 'PUT', paths.selfRoleConnections, jsonResponse<Discord.RESTPutAPICurrentUserApplicationRoleConnectionResult>, jsonBody<Discord.RESTPutAPICurrentUserApplicationRoleConnectionJSONBody>);
export const listVoiceRegions = buildEndpoint('listVoiceRegions', 'GET', paths.voiceRegions, jsonResponse<Discord.RESTGetAPIVoiceRegionsResult>);
export const createWebhook = buildEndpoint('createWebhook', 'POST', paths.channelWebhooks, jsonResponse<Discord.RESTPostAPIChannelWebhookResult>, jsonBody<Discord.RESTPostAPIChannelWebhookJSONBody>, auditLogReason);
export const getChannelWebhooks = buildEndpoint('getChannelWebhooks', 'GET', paths.channelWebhooks, jsonResponse<Discord.RESTGetAPIChannelWebhooksResult>);
export const getGuildWebhooks = buildEndpoint('getGuildWebhooks', 'GET', paths.channelWebhooks, jsonResponse<Discord.RESTGetAPIChannelWebhooksResult>);
export const getWebhook = buildEndpoint('getWebhook', 'GET', paths.webhook, jsonResponse<Discord.RESTGetAPIWebhookResult>);
export const getWebhookwithToken = buildEndpoint('getWebhookwithToken', 'GET', paths.webhookToken, jsonResponse<Discord.RESTGetAPIWebhookWithTokenResult>);
export const modifyWebhook = buildEndpoint('modifyWebhook', 'PATCH', paths.webhook, jsonResponse<Discord.RESTPatchAPIWebhookResult>, jsonBody<Discord.RESTPatchAPIWebhookJSONBody>, auditLogReason);
export const modifyWebhookwithToken = buildEndpoint('modifyWebhookwithToken', 'PATCH', paths.webhookToken, jsonResponse<Discord.RESTPatchAPIWebhookWithTokenResult>, jsonBody<Discord.RESTPatchAPIWebhookWithTokenJSONBody>);
export const deleteWebhook = buildEndpoint('deleteWebhook', 'DELETE', paths.webhook, jsonResponse<void>, undefined, auditLogReason);
export const deleteWebhookwithToken = buildEndpoint('deleteWebhookwithToken', 'DELETE', paths.webhookToken, jsonResponse<void>);
export const executeWebhook = buildEndpoint('executeWebhook', 'POST', paths.webhookToken, jsonResponse<Discord.RESTPostAPIWebhookWithTokenResult>, jsonBody<Discord.RESTPostAPIWebhookWithTokenJSONBody>, undefined, query<Discord.RESTPostAPIWebhookWithTokenQuery>);
export const executeSlackCompatibleWebhook = buildEndpoint('executeSlackCompatibleWebhook', 'POST', paths.slackWebhook, jsonResponse<void>, (body: Blob) => body);
export const waitSlackCompatibleWebhook = buildEndpoint('waitSlackCompatibleWebhook', 'POST', paths.slackWebhook, jsonResponse<Discord.RESTPostAPIWebhookWithTokenSlackWaitResult>, (body: Blob) => body, undefined, query<Discord.RESTPostAPIWebhookWithTokenSlackQuery>);
export const executeGitHubCompatibleWebhook = buildEndpoint('executeGitHubCompatibleWebhook', 'POST', paths.githubWebhook, jsonResponse<void>, (body: Blob) => body);
export const waitGitHubCompatibleWebhook = buildEndpoint('waitGitHubCompatibleWebhook', 'POST', paths.githubWebhook, jsonResponse<Discord.RESTPostAPIWebhookWithTokenGitHubWaitResult>, (body: Blob) => body, undefined, query<Discord.RESTPostAPIWebhookWithTokenGitHubQuery>);
export const getWebhookMessage = buildEndpoint('getWebhookMessage', 'GET', paths.webhookMessage, jsonResponse<Discord.RESTGetAPIWebhookWithTokenMessageResult>, undefined, undefined, query<Discord.RESTGetAPIWebhookWithTokenMessageQuery>);
export const editWebhookMessage = buildEndpoint('editWebhookMessage', 'PATCH', paths.webhookMessage, jsonResponse<Discord.RESTPatchAPIWebhookWithTokenMessageResult>, jsonBody<Discord.RESTPatchAPIWebhookWithTokenMessageJSONBody>);
export const deleteWebhookMessage = buildEndpoint('deleteWebhookMessage', 'DELETE', paths.webhookMessage, jsonResponse<void>);
export const getGateway = buildEndpoint('getGateway', 'GET', paths.gateway, jsonResponse<Discord.RESTGetAPIGatewayResult>);
export const getGatewayBot = buildEndpoint('getGatewayBot', 'GET', paths.gatewayBot, jsonResponse<Discord.RESTGetAPIGatewayBotResult>);
export const getCurrentBotApplicationInformation = buildEndpoint('getCurrentBotApplicationInformation', 'GET', paths.oauthApplication, jsonResponse<Discord.RESTGetAPIOAuth2CurrentApplicationResult>);
export const getCurrentAuthorizationInformation = buildEndpoint('getCurrentAuthorizationInformation', 'GET', paths.oauthSelf, jsonResponse<Discord.RESTGetAPIOAuth2CurrentAuthorizationResult>);

type ToEndpointModel<TUrl, TBody, THeaders, TQuery> =
    [void] extends [TUrl & TBody & THeaders & TQuery] ? void :
    & ([void] extends [TUrl] ? unknown : TUrl)
    & ([void] extends [TBody] ? unknown : { data: TBody })
    & ([void] extends [THeaders] ? unknown : THeaders)
    & ([void] extends [TQuery] ? unknown : { query: TQuery })

const endpointNames = new Set();
function buildEndpoint<TUrl = void, TResult = never, TBody = void, THeaders = void, TQuery = void>(
    name: string,
    method: HttpMethod,
    path: string | { route: (arg: TUrl) => string, rateLimit: (arg: TUrl) => string },
    reader: (response: IHttpResponse) => PromiseLike<TResult>,
    body?: (arg: TBody) => PromiseLike<Blob> | Blob,
    headers?: (arg: THeaders) => Iterable<readonly [string, string | undefined]>,
    query?: (arg?: TQuery) => Iterable<readonly [string, string]>,
    globalRateLimit?: boolean
): IEndpoint<ToEndpointModel<TUrl, TBody, THeaders, TQuery>, TResult>
function buildEndpoint<TUrl = void, TResult = never, TBody = void, THeaders = void, TQuery = void>(
    name: string,
    method: HttpMethod,
    path: string | { route: (arg: TUrl) => string, rateLimit: (arg: TUrl) => string },
    reader: (response: IHttpResponse) => PromiseLike<TResult>,
    body?: (arg: TBody) => PromiseLike<Blob> | Blob,
    headers?: (arg: THeaders) => Iterable<readonly [string, string | undefined]>,
    query?: (arg?: TQuery) => Iterable<readonly [string, string]>,
    globalRateLimit = true
): IEndpoint<THeaders & TUrl & { data: TBody; query?: TQuery }, TResult> {
    const headersFn = headers ?? (() => []);
    const pathFns = typeof path === 'string' ? { route: () => path, rateLimit: () => path } : path;
    const urlFn = query === undefined
        ? (x: TUrl) => new URL(pathFns.route(x))
        : (x: TUrl & { query?: TQuery }) => {
            const url = new URL(pathFns.route(x));
            for (const [key, value] of query(x.query))
                url.searchParams.append(key, value);
            return url;
        }
    return {
        method,
        globalRateLimit,
        createRequest(model) {
            const headers = new HttpHeaders();
            for (const [key, value] of headersFn(model))
                if (value !== undefined)
                    headers.add(key, value);
            let state: { value: PromiseLike<Blob> | Blob } | undefined;
            return {
                url: urlFn(model),
                rateLimitKey: `[${this.method}]${pathFns.rateLimit(model)}`,
                endpoint: this,
                headers,
                model,
                body: body === undefined ? undefined : async (recompute = false) => await (recompute
                    ? state = { value: body(model.data) }
                    : state ??= { value: body(model.data) }
                ).value
            }
        },
        readResponse: reader
    }
}

type RemovePayloadJsonAndSetFiles<T> = Exclude<T, { payload_json?: unknown }> & Record<`files[${bigint}]`, DiscordFile>;

function auditLogReason(options: { auditLogReason?: string }) {
    return [['x-audit-log-reason', options.auditLogReason]] as const;
}

function* query<T>(values?: T) {
    for (const [key, value] of Object.entries(values ?? {}))
        yield [key, String(value)] as const;
}

async function jsonResponse<T>(response: IHttpResponse): Promise<T extends never ? void : T>
async function jsonResponse(response: IHttpResponse): Promise<unknown> {
    if (response.status === 204)
        return undefined;

    const body = await response.body();
    if (!body.type.startsWith('application/json') && !body.type.startsWith('text/json'))
        throw new Error(`Expected response to be json but got ${body.type}`);

    const result = JSON.parse(await body.text());
    if (response.status >= 200 && response.status < 400)
        return result;

    if ('retry_after' in result)
        throw new DiscordRateLimitError(result as Discord.RESTRateLimit);

    throw new DiscordRestError(result as Discord.RESTError)
}

function jsonBody<T>(model: T) {
    return new Blob([JSON.stringify(model)], { type: 'application/json' });
}

function formDataBody<T>(model: T) {
    return createFormData(formDataBodyIter(model));
}

function* formDataBodyIter<T>(model: T): Iterable<[string, DiscordFile]> {
    for (const [key, value] of Object.entries(model ?? {})) {
        switch (typeof value) {
            case 'object': {
                if (value instanceof DiscordFile)
                    yield [key, value];
                else if (value instanceof Blob)
                    yield [key, new DiscordFile(value)];
                else if (value instanceof ArrayBuffer || value instanceof SharedArrayBuffer)
                    yield [key, new DiscordFile(new Blob([value]))];
                else
                    yield [key, new DiscordFile(new Blob([JSON.stringify(value)], { type: 'application/json' }))]
                break;
            }
            case 'bigint':
            case 'boolean':
            case 'number':
            case 'string':
                yield [key, new DiscordFile(new Blob([String(value)]))];
                break;
        }
    }
}

function jsonPayloadFormDataBody<T extends Record<`files[${bigint}]`, unknown>>(model: RemovePayloadJsonAndSetFiles<T>) {
    return createFormData(jsonPayloadFormDataBodyIter(model));
}

function* jsonPayloadFormDataBodyIter<T extends Record<`files[${bigint}]`, unknown>>(model: RemovePayloadJsonAndSetFiles<T>): Iterable<[string, DiscordFile]> {
    const jsonPayload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(model ?? {})) {
        if (/^files\[\d+\]$/.test(key)) {
            if (value instanceof DiscordFile)
                yield [key, value];
        } else {
            jsonPayload[key] = value;
        }
    }

    yield ['payload_json', new DiscordFile(new Blob([JSON.stringify(jsonPayload)], { type: 'application/json' }))];
}

function createFormData(values: Iterable<[string, DiscordFile]>) {
    const boundary = createFormDataBoundary();
    const result = new Blob([...createFormDataIter(boundary, values)], {
        type: `multipart/form-data; boundary=${boundary}`
    });
    return result;
}

function* createFormDataIter(boundary: string, values: Iterable<[string, DiscordFile]>) {
    for (const [key, { content, name }] of values) {
        yield `--${boundary}\n`;
        yield name === undefined
            ? `Content-Disposition: form-data; name=${JSON.stringify(key)}\n`
            : `Content-Disposition: form-data; name=${JSON.stringify(key)}; filename=${JSON.stringify(name)}\n`;
        if (content.type.length > 0)
            yield `Content-Type: ${content.type}\n`;
        yield '\n';
        yield content;
        yield '\n'
    }
    yield `--${boundary}--`;
}

const randomHex = () => Math.floor(Math.random() * 1000000000000000).toString(16);
function createFormDataBoundary() {

    return `boundary-${randomHex() + randomHex() + randomHex() + randomHex()}`;
}


