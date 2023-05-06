import { buildPaths, pathSegment as s } from './pathBuilder.js';

const arg = <Name extends PropertyKey>(name: Name) => <T extends string | number | bigint | boolean>(transform: (value: T) => string = String) => ({
    route: (x: { [P in Name]: T }) => `/${transform(x[name])}` as const,
    rateLimit: () => `/:${String(name)}` as Name extends string | number ? `/:${Name}` : `/:${string}`
});

const messageId = arg('messageId')<string | bigint>();
const guildId = arg('guildId')<string | bigint>();
const userId = arg('userId')<string | bigint>();
const emojiId = arg('emojiId')<string>();
const channelId = arg('channelId')<string | bigint>();
const integrationId = arg('integrationId')<string>();
const ruleId = arg('ruleId')<string>();
const permissionId = arg('permissionId')<string | bigint>();
const roleId = arg('roleId')<string | bigint>();
const eventId = arg('eventId')<string>();
const commandId = arg('commandId')<string>();
const applicationId = arg('applicationId')<string>();
const stickerId = arg('stickerId')<string>();
const webhookId = arg('webhookId')<string>();
const webhookToken = arg('webhookToken')<string>();
const interactionId = arg('interactionId')<string>();
const interactionToken = arg('interactionToken')<string>();
const templateCode = arg('templateCode')<string>();
const inviteCode = arg('inviteCode')<string>();
const icon = arg('icon')<string>();
const urlEncodedEmoji = arg('emoji')<string>(encodeURIComponent);

export const paths = buildPaths([
    s('cdn:', [
        s('/banners', [
            s(guildId, [
                s(icon, 'guildBanner')
            ])
        ]),
        s('/icons', [
            s(guildId, [
                s(icon, 'guildIcon')
            ])
        ]),
        s('/splashes', [
            s(guildId, [
                s(icon, 'guildSplash')
            ])
        ]),
        s('/avatars', [
            s(userId, [
                s(icon, 'userAvatar')
            ])
        ]),
        s('/embed', [
            s('/avatars', [
                s(icon, [
                    s('.png', 'defaultAvatar')
                ])
            ])
        ])
    ]),
    s('api:', [
        s('/gateway', 'gateway', [
            s('/bot', 'gatewayBot')
        ]),
        s('/guilds', 'guilds', [
            s('/templates', 'globalGuildTemplates', [
                s(templateCode, 'globalGuildTemplate')
            ]),
            s(guildId.route, 'guild', [
                s('/channels', 'guildChannels', [
                    s(channelId, 'guildChannel')
                ]),
                s('/auto-moderation', [
                    s('/rules', 'autoModerationRules', [
                        s(ruleId, 'autoModerationRule')
                    ])
                ]),
                s('/threads', [
                    s('/active', 'guildActiveThreads')
                ]),
                s('/audit-logs', 'auditLogs'),
                s('/bans', 'guildBans', [
                    s(userId, 'guildBan')
                ]),
                s('/widget', 'guildWidget', [
                    s('.json', 'guildWidgetJson'),
                    s('.png', 'guildWidgetImage')
                ]),
                s('/emojis', 'guildEmojis', [
                    s(emojiId, 'guildEmoji')
                ]),
                s('/integrations', 'guildIntegrations', [
                    s(integrationId, 'guildIntegration')
                ]),
                s('/invites', 'guildInvites'),
                s('/members', 'guildMembers', [
                    s('/@me', 'guildMemberSelf'),
                    s(userId, 'guildMember', [
                        s('/roles', 'guildMemberRoles', [
                            s(roleId, 'guildMemberRole')
                        ])
                    ]),
                    s('/search', 'guildMemberSearch')
                ]),
                s('/prune', 'guildPrune'),
                s('/onboarding', 'guildOnboarding'),
                s('/regions', 'guildRegions'),
                s('/webhooks', 'guildWebhooks'),
                s('/vanity-url', 'guildVanityUrl'),
                s('/preview', 'guildPreview'),
                s('/mfa', 'guildMfaLevel'),
                s('/welcome-screen', 'guildWelcomeScreen'),
                s('/scheduled-events', 'guildEvents', [
                    s(eventId, 'guildEvent', [
                        s('/users', 'guildEventMembers')
                    ])
                ]),
                s('/templates', 'guildTemplates', [
                    s(templateCode, 'guildTemplate')
                ]),
                s('/roles', 'guildRoles', [
                    s(roleId, 'guildRole')
                ]),
                s('/voice-states', [
                    s('/@me', 'voiceStateSelf'),
                    s(userId, 'voiceState')
                ]),
                s('/discovery-metadata', 'guildDiscoveryMetadata'),
                s('/discovery-categories', 'guildDiscoveryCategories'),
                s('/stickers', 'guildStickers', [
                    s(stickerId, 'guildSticker')
                ])
            ])
        ]),
        s('/channels', [
            s(channelId.route, 'channel', [
                s('/messages', 'messages', [
                    s('/bulk-delete', 'bulkDeleteMessages'),
                    s(messageId, 'message', [
                        s('/crosspost', 'messageCrosspost'),
                        s('/threads', 'messageThreads'),
                        s('/reactions', 'messageReactions', [
                            s(urlEncodedEmoji, 'messageReactionUsers', [
                                s('/@me', 'messageReactionSelf'),
                                s(userId, 'messageReactionUser')
                            ])
                        ])
                    ])
                ]),
                s('/pins', 'channelPins', [
                    s(messageId, 'channelPin')
                ]),
                s('/permissions', [
                    s(permissionId, 'channelPermission')
                ]),
                s('/threads', 'channelThreads', [
                    s('/archived', 'channelArchivedThreads', [
                        s('/public', 'channelArchivedPublicThreads'),
                        s('/private', 'channelArchivedPrivateThreads')
                    ])
                ]),
                s('/users/@me/threads/archived/private', 'channelSelfArchivedPrivateThreads'),
                s('/thread-members', 'threadMembers', [
                    s('/@me', 'threadMemberSelf'),
                    s(userId, 'threadMember')
                ]),
                s('/invites', 'channelInvites'),
                s('/typing', 'channelTyping'),
                s('/webhooks', 'channelWebhooks'),
                s('/followers', 'channelFollowers'),
                s('/recipients', [
                    s(userId, 'channelRecipient')
                ])
            ])
        ]),
        s('/users', [
            s('/@me', 'self', [
                s('/guilds', 'selfGuilds', [
                    s(guildId, 'selfGuild', [
                        s('/member', 'selfGuildMember')
                    ])
                ]),
                s('/channels', 'dmChannels'),
                s('/connections', 'connections'),
                s('/applications', [
                    s(applicationId, [
                        s('/role-connections', 'selfRoleConnections')
                    ])
                ])
            ]),
            s(userId, 'user')
        ]),
        s('/voice', [
            s('/regions', 'voiceRegions')
        ]),
        s('/invites', [
            s(inviteCode, 'invite')
        ]),
        s('/webhooks', [
            s(webhookId.route, 'webhook', [
                s(webhookToken.route, 'webhookToken', [
                    s('/slack', 'slackWebhook'),
                    s('/github', 'githubWebhook'),
                    s('/messages', [
                        s(messageId, 'webhookMessage'),
                        s('/@original', 'webhookOriginalMessage')
                    ])
                ])
            ])
        ]),
        s('/applications', [
            s(applicationId, [
                s('/commands', 'commands', [
                    s(commandId, 'command')
                ]),
                s('/guilds', [
                    s(guildId, [
                        s('/commands', 'guildCommands', [
                            s('/permissions', 'guildCommandsPermissions'),
                            s(commandId, 'guildCommand', [
                                s('/permissions', 'guildCommandPermissions')
                            ])
                        ])
                    ])
                ]),
                s('/role-connections', [
                    s('/metadata', 'applicationRoleConnectionMetadata')
                ])
            ])
        ]),
        s('/interactions', [
            s(interactionId, [
                s(interactionToken, [
                    s('/callback', 'interactionCallback'),
                    s('/messages', [
                        s('/@original', 'interactionOriginalMessage'),
                        s(messageId, 'interactionMessage')
                    ])
                ])
            ])
        ]),
        s('/discovery', [
            s('/categories', 'discoveryCategories'),
            s('/valid-term', 'discoveryTerms')
        ]),
        s('/oauth2', [
            s('/applications', [
                s('/@me', 'oauthApplication')
            ]),
            s('/@me', 'oauthSelf')
        ]),
        s('/stage-instances', 'stageInstances', [
            s(channelId, 'stageInstance')
        ]),
        s('/sticker-packs', 'stickerPacks'),
        s('/stickers', [
            s(stickerId, 'sticker')
        ])
    ])
]);
