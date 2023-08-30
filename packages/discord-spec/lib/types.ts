/*
 * Auto generated file, do not edit
 */
export interface AccountResponse {
    id: string;
    name?: (string | null);
}
export interface ActionRow {
    type: typeof MessageComponentType["ACTION_ROW"];
    /**
     * @maxItems 5
     * @minItems 1
     */
    components: Array<(Button | ChannelSelect | InputText | MentionableSelect | RoleSelect | StringSelect | UserSelect)>;
}
export type AfkTimeout = typeof AfkTimeout[keyof typeof AfkTimeout];
export const AfkTimeout = {
    ONE_MINUTE: 60,
    FIVE_MINUTES: 300,
    FIFTEEN_MINUTES: 900,
    THIRTY_MINUTES: 1800,
    ONE_HOUR: 3600
} as const;
Object.freeze(AfkTimeout);
export type AllowedMentionType = typeof AllowedMentionType[keyof typeof AllowedMentionType];
export const AllowedMentionType = {
    /**
     * Controls role mentions
     */
    USERS: "users",
    /**
     * Controls user mentions
     */
    ROLES: "roles",
    /**
     * Controls \@everyone and \@here mentions
     */
    EVERYONE: "everyone"
} as const;
Object.freeze(AllowedMentionType);
export interface ApplicationCommandAttachmentOption {
    type: typeof ApplicationCommandOptionType["ATTACHMENT"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandAttachmentOptionResponse {
    type: typeof ApplicationCommandOptionType["ATTACHMENT"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandAutocompleteCallbackRequest {
    type: typeof InteractionCallbackType["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"];
    data: (InteractionApplicationCommandAutocompleteCallbackIntegerData | InteractionApplicationCommandAutocompleteCallbackNumberData | InteractionApplicationCommandAutocompleteCallbackStringData);
}
export interface ApplicationCommandBooleanOption {
    type: typeof ApplicationCommandOptionType["BOOLEAN"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandBooleanOptionResponse {
    type: typeof ApplicationCommandOptionType["BOOLEAN"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandChannelOption {
    type: typeof ApplicationCommandOptionType["CHANNEL"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    /**
     * @distinct 
     */
    channel_types?: (Array<ChannelType> | null);
}
export interface ApplicationCommandChannelOptionResponse {
    type: typeof ApplicationCommandOptionType["CHANNEL"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    /**
     * @distinct 
     */
    channel_types?: (Array<ChannelType> | null);
}
export interface ApplicationCommandIntegerOption {
    type: typeof ApplicationCommandOptionType["INTEGER"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    /**
     * @maxItems 25
     */
    choices?: (Array<ApplicationCommandOptionIntegerChoice> | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    min_value?: (number | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    max_value?: (number | null);
}
export interface ApplicationCommandIntegerOptionResponse {
    type: typeof ApplicationCommandOptionType["INTEGER"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    choices?: (Array<ApplicationCommandOptionIntegerChoiceResponse> | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    min_value?: (number | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    max_value?: (number | null);
}
export interface ApplicationCommandMentionableOption {
    type: typeof ApplicationCommandOptionType["MENTIONABLE"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandMentionableOptionResponse {
    type: typeof ApplicationCommandOptionType["MENTIONABLE"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandNumberOption {
    type: typeof ApplicationCommandOptionType["NUMBER"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    /**
     * @maxItems 25
     */
    choices?: (Array<ApplicationCommandOptionNumberChoice> | null);
    min_value?: (number | null);
    max_value?: (number | null);
}
export interface ApplicationCommandNumberOptionResponse {
    type: typeof ApplicationCommandOptionType["NUMBER"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    choices?: (Array<ApplicationCommandOptionNumberChoiceResponse> | null);
    min_value?: (number | null);
    max_value?: (number | null);
}
export interface ApplicationCommandOptionIntegerChoice {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    value: number;
}
export interface ApplicationCommandOptionIntegerChoiceResponse {
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    value: number;
}
export interface ApplicationCommandOptionNumberChoice {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    value: number;
}
export interface ApplicationCommandOptionNumberChoiceResponse {
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    value: number;
}
export interface ApplicationCommandOptionStringChoice {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 6000
     */
    value: string;
}
export interface ApplicationCommandOptionStringChoiceResponse {
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    value: string;
}
export type ApplicationCommandOptionType = typeof ApplicationCommandOptionType[keyof typeof ApplicationCommandOptionType];
export const ApplicationCommandOptionType = {
    /**
     * A sub-action within a command or group
     */
    SUB_COMMAND: 1,
    /**
     * A group of subcommands
     */
    SUB_COMMAND_GROUP: 2,
    /**
     * A string option
     */
    STRING: 3,
    /**
     * An integer option. Any integer between -2^53 and 2^53 is a valid value
     */
    INTEGER: 4,
    /**
     * A boolean option
     */
    BOOLEAN: 5,
    /**
     * A snowflake option that represents a User
     */
    USER: 6,
    /**
     * A snowflake option that represents a Channel. Includes all channel types and categories
     */
    CHANNEL: 7,
    /**
     * A snowflake option that represents a Role
     */
    ROLE: 8,
    /**
     * A snowflake option that represents anything you can mention
     */
    MENTIONABLE: 9,
    /**
     * A number option. Any double between -2^53 and 2^53 is a valid value
     */
    NUMBER: 10,
    /**
     * An attachment option
     */
    ATTACHMENT: 11
} as const;
Object.freeze(ApplicationCommandOptionType);
export interface ApplicationCommandPermission {
    id: Snowflake;
    type: ApplicationCommandPermissionType;
    permission: boolean;
}
export type ApplicationCommandPermissionType = typeof ApplicationCommandPermissionType[keyof typeof ApplicationCommandPermissionType];
export const ApplicationCommandPermissionType = {
    ROLE: 1,
    USER: 2,
    CHANNEL: 3
} as const;
Object.freeze(ApplicationCommandPermissionType);
export interface ApplicationCommandResponse {
    id: Snowflake;
    application_id: Snowflake;
    version: Snowflake;
    default_member_permissions?: (string | null);
    type: ApplicationCommandType;
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    guild_id?: (Snowflake | null);
    dm_permission?: (boolean | null);
    options?: (Array<(ApplicationCommandAttachmentOptionResponse | ApplicationCommandBooleanOptionResponse | ApplicationCommandChannelOptionResponse | ApplicationCommandIntegerOptionResponse | ApplicationCommandMentionableOptionResponse | ApplicationCommandNumberOptionResponse | ApplicationCommandRoleOptionResponse | ApplicationCommandStringOptionResponse | ApplicationCommandSubcommandGroupOptionResponse | ApplicationCommandSubcommandOptionResponse | ApplicationCommandUserOptionResponse)> | null);
    nsfw?: (boolean | null);
}
export interface ApplicationCommandRoleOption {
    type: typeof ApplicationCommandOptionType["ROLE"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandRoleOptionResponse {
    type: typeof ApplicationCommandOptionType["ROLE"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandStringOption {
    type: typeof ApplicationCommandOptionType["STRING"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    /**
     * @maximum 6000
     * @minimum 0
     */
    min_length?: (number | null);
    /**
     * @maximum 6000
     * @minimum 1
     */
    max_length?: (number | null);
    /**
     * @maxItems 25
     */
    choices?: (Array<ApplicationCommandOptionStringChoice> | null);
}
export interface ApplicationCommandStringOptionResponse {
    type: typeof ApplicationCommandOptionType["STRING"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    autocomplete?: (boolean | null);
    choices?: (Array<ApplicationCommandOptionStringChoiceResponse> | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_length?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_length?: (Int32 | null);
}
export interface ApplicationCommandSubcommandGroupOption {
    type: typeof ApplicationCommandOptionType["SUB_COMMAND_GROUP"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    /**
     * @maxItems 25
     */
    options?: (Array<ApplicationCommandSubcommandOption> | null);
}
export interface ApplicationCommandSubcommandGroupOptionResponse {
    type: typeof ApplicationCommandOptionType["SUB_COMMAND_GROUP"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    options?: (Array<ApplicationCommandSubcommandOptionResponse> | null);
}
export interface ApplicationCommandSubcommandOption {
    type: typeof ApplicationCommandOptionType["SUB_COMMAND"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandUserOption)> | null);
}
export interface ApplicationCommandSubcommandOptionResponse {
    type: typeof ApplicationCommandOptionType["SUB_COMMAND"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
    options?: (Array<(ApplicationCommandAttachmentOptionResponse | ApplicationCommandBooleanOptionResponse | ApplicationCommandChannelOptionResponse | ApplicationCommandIntegerOptionResponse | ApplicationCommandMentionableOptionResponse | ApplicationCommandNumberOptionResponse | ApplicationCommandRoleOptionResponse | ApplicationCommandStringOptionResponse | ApplicationCommandUserOptionResponse)> | null);
}
export type ApplicationCommandType = typeof ApplicationCommandType[keyof typeof ApplicationCommandType];
export const ApplicationCommandType = {
    /**
     * Slash commands; a text-based command that shows up when a user types /
     */
    CHAT: 1,
    /**
     * A UI-based command that shows up when you right click or tap on a user
     */
    USER: 2,
    /**
     * A UI-based command that shows up when you right click or tap on a message
     */
    MESSAGE: 3
} as const;
Object.freeze(ApplicationCommandType);
export interface ApplicationCommandUserOption {
    type: typeof ApplicationCommandOptionType["USER"];
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationCommandUserOptionResponse {
    type: typeof ApplicationCommandOptionType["USER"];
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localized?: (string | null);
    description_localizations?: ({
        [key: string]: string;
    } | null);
    required?: (boolean | null);
}
export interface ApplicationFormPartial {
    description?: ({
        /**
         * @maxLength 2048
         */
        default: string;
        localizations?: ({
            /**
             * @maxLength 2048
             */
            [key: string]: string;
        } | null);
    } | null);
    icon?: (Base64String | null);
    cover_image?: (Base64String | null);
    team_id?: (Snowflake | null);
    flags?: (number | null);
    /**
     * @maxLength 2048
     */
    interactions_endpoint_url?: (URIString | null);
    /**
     * @minimum -1
     */
    max_participants?: (number | null);
    type?: (null | ApplicationType);
    /**
     * @maxItems 5
     * @distinct 
     */
    tags?: (Array<string> | null);
    /**
     * @maxLength 2048
     */
    custom_install_url?: (URIString | null);
    install_params?: (null | ApplicationOAuth2Params);
    /**
     * @maxLength 2048
     */
    role_connections_verification_url?: (URIString | null);
}
export interface ApplicationIncomingWebhookResponse {
    application_id?: (Snowflake | null);
    avatar?: (string | null);
    channel_id?: (Snowflake | null);
    guild_id?: (Snowflake | null);
    id: Snowflake;
    name: string;
    type: typeof WebhookType["APPLICATION_INCOMING"];
    user?: (null | UserResponse);
}
export interface ApplicationOAuth2Params {
    /**
     * @minItems 1
     * @distinct 
     */
    scopes?: (Array<(typeof OAuth2Scope["APPLICATIONS_COMMANDS"] | typeof OAuth2Scope["BOT"])> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    permissions?: (number | null);
}
export interface ApplicationOAuth2ParamsResponse {
    /**
     * @distinct 
     */
    scopes: Array<(typeof OAuth2Scope["APPLICATIONS_COMMANDS"] | typeof OAuth2Scope["BOT"])>;
    permissions: string;
}
export interface ApplicationResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description: string;
    type?: (null | ApplicationType);
    cover_image?: (string | null);
    primary_sku_id?: (Snowflake | null);
    bot?: (null | UserResponse);
    slug?: (string | null);
    guild_id?: (Snowflake | null);
    rpc_origins?: (Array<(string | null)> | null);
    bot_public?: (boolean | null);
    bot_require_code_grant?: (boolean | null);
    terms_of_service_url?: (URIString | null);
    privacy_policy_url?: (URIString | null);
    custom_install_url?: (URIString | null);
    install_params?: (null | ApplicationOAuth2ParamsResponse);
    verify_key: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_participants?: (Int32 | null);
    /**
     * @distinct 
     */
    tags?: (Array<string> | null);
}
export interface ApplicationRoleConnectionsMetadataItemRequest {
    type: MetadataItemType;
    /**
     * @maxLength 50
     * @minLength 1
     */
    key: string;
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 1521
     */
    name_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: (string | null);
    } | null);
    /**
     * @maxLength 200
     * @minLength 1
     */
    description: string;
    /**
     * @maxProperties 1521
     */
    description_localizations?: ({
        /**
         * @maxLength 200
         * @minLength 1
         */
        [key: string]: (string | null);
    } | null);
}
export interface ApplicationRoleConnectionsMetadataItemResponse {
    type: MetadataItemType;
    key: string;
    name: string;
    name_localizations?: ({
        [key: string]: string;
    } | null);
    description: string;
    description_localizations?: ({
        [key: string]: string;
    } | null);
}
export type ApplicationType = typeof ApplicationType[keyof typeof ApplicationType];
export const ApplicationType = {
    GUILD_ROLE_SUBSCRIPTIONS: 4
} as const;
Object.freeze(ApplicationType);
export interface ApplicationUserRoleConnectionResponse {
    platform_name?: (string | null);
    platform_username?: (string | null);
    metadata?: ({
        [key: string]: string;
    } | null);
}
export type AuditLogActionType = typeof AuditLogActionType[keyof typeof AuditLogActionType];
export const AuditLogActionType = {
    GUILD_UPDATE: 1,
    CHANNEL_CREATE: 10,
    CHANNEL_UPDATE: 11,
    CHANNEL_DELETE: 12,
    CHANNEL_OVERWRITE_CREATE: 13,
    CHANNEL_OVERWRITE_UPDATE: 14,
    CHANNEL_OVERWRITE_DELETE: 15,
    MEMBER_KICK: 20,
    MEMBER_PRUNE: 21,
    MEMBER_BAN_ADD: 22,
    MEMBER_BAN_REMOVE: 23,
    MEMBER_UPDATE: 24,
    MEMBER_ROLE_UPDATE: 25,
    MEMBER_MOVE: 26,
    MEMBER_DISCONNECT: 27,
    BOT_ADD: 28,
    ROLE_CREATE: 30,
    ROLE_UPDATE: 31,
    ROLE_DELETE: 32,
    INVITE_CREATE: 40,
    INVITE_UPDATE: 41,
    INVITE_DELETE: 42,
    WEBHOOK_CREATE: 50,
    WEBHOOK_UPDATE: 51,
    WEBHOOK_DELETE: 52,
    EMOJI_CREATE: 60,
    EMOJI_UPDATE: 61,
    EMOJI_DELETE: 62,
    MESSAGE_DELETE: 72,
    MESSAGE_BULK_DELETE: 73,
    MESSAGE_PIN: 74,
    MESSAGE_UNPIN: 75,
    INTEGRATION_CREATE: 80,
    INTEGRATION_UPDATE: 81,
    INTEGRATION_DELETE: 82,
    STAGE_INSTANCE_CREATE: 83,
    STAGE_INSTANCE_UPDATE: 84,
    STAGE_INSTANCE_DELETE: 85,
    STICKER_CREATE: 90,
    STICKER_UPDATE: 91,
    STICKER_DELETE: 92,
    GUILD_SCHEDULED_EVENT_CREATE: 100,
    GUILD_SCHEDULED_EVENT_UPDATE: 101,
    GUILD_SCHEDULED_EVENT_DELETE: 102,
    THREAD_CREATE: 110,
    THREAD_UPDATE: 111,
    THREAD_DELETE: 112,
    APPLICATION_COMMAND_PERMISSION_UPDATE: 121,
    SOUNDBOARD_SOUND_CREATE: 130,
    SOUNDBOARD_SOUND_UPDATE: 131,
    SOUNDBOARD_SOUND_DELETE: 132,
    AUTO_MODERATION_RULE_CREATE: 140,
    AUTO_MODERATION_RULE_UPDATE: 141,
    AUTO_MODERATION_RULE_DELETE: 142,
    AUTO_MODERATION_BLOCK_MESSAGE: 143,
    AUTO_MODERATION_FLAG_TO_CHANNEL: 144,
    AUTO_MODERATION_USER_COMM_DISABLED: 145,
    AUTO_MODERATION_QUARANTINE_USER: 146,
    CREATOR_MONETIZATION_REQUEST_CREATED: 150,
    CREATOR_MONETIZATION_TERMS_ACCEPTED: 151,
    ONBOARDING_PROMPT_CREATE: 163,
    ONBOARDING_PROMPT_UPDATE: 164,
    ONBOARDING_PROMPT_DELETE: 165,
    ONBOARDING_CREATE: 166,
    ONBOARDING_UPDATE: 167,
    GUILD_HOME_FEATURE_ITEM: 171,
    GUILD_HOME_REMOVE_ITEM: 172,
    HARMFUL_LINKS_BLOCKED_MESSAGE: 180,
    HOME_SETTINGS_CREATE: 190,
    HOME_SETTINGS_UPDATE: 191,
    VOICE_CHANNEL_STATUS_CREATE: 192,
    VOICE_CHANNEL_STATUS_DELETE: 193
} as const;
Object.freeze(AuditLogActionType);
export interface AuditLogEntryResponse {
    id: Snowflake;
    action_type: AuditLogActionType;
    user_id?: (Snowflake | null);
    target_id?: (Snowflake | null);
    changes?: (Array<AuditLogObjectChangeResponse> | null);
    options?: ({
        [key: string]: string;
    } | null);
    reason?: (string | null);
}
export interface AuditLogObjectChangeResponse {
    key?: (string | null);
    new_value?: unknown;
    old_value?: unknown;
}
export type AutomodActionType = typeof AutomodActionType[keyof typeof AutomodActionType];
export const AutomodActionType = {
    /**
     * Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked
     */
    BLOCK_MESSAGE: 1,
    /**
     * Send a system message to a channel in order to log the user message that triggered the rule
     */
    FLAG_TO_CHANNEL: 2,
    /**
     * Temporarily disable a user's ability to communicate in the server (timeout)
     */
    USER_COMMUNICATION_DISABLED: 3,
    /**
     * Prevent a user from interacting in the server
     */
    QUARANTINE_USER: 4
} as const;
Object.freeze(AutomodActionType);
export type AutomodEventType = typeof AutomodEventType[keyof typeof AutomodEventType];
export const AutomodEventType = {
    /**
     * A user submitted a message to a channel
     */
    MESSAGE_SEND: 1,
    /**
     * A user is attempting to join the server or a member's properties were updated.
     */
    GUILD_MEMBER_JOIN_OR_UPDATE: 2
} as const;
Object.freeze(AutomodEventType);
export type AutomodKeywordPresetType = typeof AutomodKeywordPresetType[keyof typeof AutomodKeywordPresetType];
export const AutomodKeywordPresetType = {
    /**
     * Words and phrases that may be considered profanity
     */
    PROFANITY: 1,
    /**
     * Words and phrases that may be considered as sexual content
     */
    SEXUAL_CONTENT: 2,
    /**
     * Words and phrases that may be considered slurs and hate speech
     */
    SLURS: 3
} as const;
Object.freeze(AutomodKeywordPresetType);
export type AutomodTriggerType = typeof AutomodTriggerType[keyof typeof AutomodTriggerType];
export const AutomodTriggerType = {
    /**
     * Check if content contains words from a list of keywords or matches regex
     */
    KEYWORD: 1,
    /**
     * DEPRECATED
     */
    SPAM_LINK: 2,
    /**
     * Check if content represents generic spam
     */
    ML_SPAM: 3,
    /**
     * Check if content contains words from internal pre-defined wordsets
     */
    DEFAULT_KEYWORD_LIST: 4,
    /**
     * Check if content contains more unique mentions than allowed
     */
    MENTION_SPAM: 5
} as const;
Object.freeze(AutomodTriggerType);
export type AvailableLocale = typeof AvailableLocale[keyof typeof AvailableLocale];
export const AvailableLocale = {
    /**
     * The ar locale
     */
    AR: "ar",
    /**
     * The bg locale
     */
    BG: "bg",
    /**
     * The cs locale
     */
    CS: "cs",
    /**
     * The da locale
     */
    DA: "da",
    /**
     * The de locale
     */
    DE: "de",
    /**
     * The el locale
     */
    EL: "el",
    /**
     * The en-GB locale
     */
    "EN-GB": "en-GB",
    /**
     * The en-US locale
     */
    "EN-US": "en-US",
    /**
     * The es-ES locale
     */
    "ES-ES": "es-ES",
    /**
     * The fi locale
     */
    FI: "fi",
    /**
     * The fr locale
     */
    FR: "fr",
    /**
     * The he locale
     */
    HE: "he",
    /**
     * The hi locale
     */
    HI: "hi",
    /**
     * The hr locale
     */
    HR: "hr",
    /**
     * The hu locale
     */
    HU: "hu",
    /**
     * The id locale
     */
    ID: "id",
    /**
     * The it locale
     */
    IT: "it",
    /**
     * The ja locale
     */
    JA: "ja",
    /**
     * The ko locale
     */
    KO: "ko",
    /**
     * The lt locale
     */
    LT: "lt",
    /**
     * The nl locale
     */
    NL: "nl",
    /**
     * The no locale
     */
    NO: "no",
    /**
     * The pl locale
     */
    PL: "pl",
    /**
     * The pt-BR locale
     */
    "PT-BR": "pt-BR",
    /**
     * The ro locale
     */
    RO: "ro",
    /**
     * The ru locale
     */
    RU: "ru",
    /**
     * The sv-SE locale
     */
    "SV-SE": "sv-SE",
    /**
     * The th locale
     */
    TH: "th",
    /**
     * The tr locale
     */
    TR: "tr",
    /**
     * The uk locale
     */
    UK: "uk",
    /**
     * The vi locale
     */
    VI: "vi",
    /**
     * The zh-CN locale
     */
    "ZH-CN": "zh-CN",
    /**
     * The zh-TW locale
     */
    "ZH-TW": "zh-TW"
} as const;
Object.freeze(AvailableLocale);
export interface BaseCreateMessageCreateRequest {
    /**
     * @maxLength 4000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 3
     */
    sticker_ids?: (Array<Snowflake> | null);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    flags?: (number | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
}
export interface BasicApplicationResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description: string;
    type?: (null | ApplicationType);
    cover_image?: (string | null);
    primary_sku_id?: (Snowflake | null);
    bot?: (null | UserResponse);
}
export interface BasicMessageResponse {
    id: Snowflake;
    type: MessageType;
    content: string;
    channel_id: Snowflake;
    author: UserResponse;
    attachments: Array<MessageAttachmentResponse>;
    embeds: Array<MessageEmbedResponse>;
    mentions: Array<UserResponse>;
    /**
     * @distinct 
     */
    mention_roles: Array<Snowflake>;
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    timestamp: ISO8601DateTime;
    edited_timestamp?: (ISO8601DateTime | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    components: Array<(MessageComponentActionRowResponse | MessageComponentButtonResponse | MessageComponentChannelSelectResponse | MessageComponentInputTextResponse | MessageComponentMentionableSelectResponse | MessageComponentRoleSelectResponse | MessageComponentStringSelectResponse | MessageComponentUserSelectResponse)>;
    activity?: (null | MessageActivityResponse);
    application?: (null | BasicApplicationResponse);
    application_id?: (Snowflake | null);
    interaction?: (null | MessageInteractionResponse);
    nonce?: (Int64 | string | null);
    webhook_id?: (Snowflake | null);
    message_reference?: (null | MessageReferenceResponse);
    thread?: (null | ThreadResponse);
    mention_channels?: (Array<(null | MessageMentionChannelResponse)> | null);
    stickers?: (Array<(GuildStickerResponse | StandardStickerResponse)> | null);
    sticker_items?: (Array<MessageStickerItemResponse> | null);
    role_subscription_data?: (null | MessageRoleSubscriptionDataResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position?: (Int32 | null);
}
export interface BlockMessageAction {
    type: typeof AutomodActionType["BLOCK_MESSAGE"];
    metadata?: (null | BlockMessageActionMetadata);
}
export interface BlockMessageActionMetadata {
    /**
     * @maxLength 150
     */
    custom_message?: (string | null);
}
export interface BlockMessageActionMetadataResponse {
    custom_message?: (string | null);
}
export interface BlockMessageActionResponse {
    type: typeof AutomodActionType["BLOCK_MESSAGE"];
    metadata: BlockMessageActionMetadataResponse;
}
export interface BotAccountPatchRequestPartial {
    /**
     * @maxLength 32
     * @minLength 2
     */
    username?: string;
    avatar?: (Base64String | null);
}
export interface Button {
    type: typeof MessageComponentType["BUTTON"];
    /**
     * @maxLength 100
     */
    custom_id?: (string | null);
    style: ButtonStyleType;
    /**
     * @maxLength 80
     */
    label?: (string | null);
    disabled?: (boolean | null);
    emoji?: (null | Emoji);
    /**
     * @maxLength 512
     */
    url?: (URIString | null);
}
export type ButtonStyleType = typeof ButtonStyleType[keyof typeof ButtonStyleType];
export const ButtonStyleType = {
    PRIMARY: 1,
    SECONDARY: 2,
    SUCCESS: 3,
    DANGER: 4,
    LINK: 5
} as const;
Object.freeze(ButtonStyleType);
export interface ChannelFollowerResponse {
    channel_id: Snowflake;
    webhook_id: Snowflake;
}
export interface ChannelFollowerWebhookResponse {
    application_id?: (Snowflake | null);
    avatar?: (string | null);
    channel_id?: (Snowflake | null);
    guild_id?: (Snowflake | null);
    id: Snowflake;
    name: string;
    type: typeof WebhookType["CHANNEL_FOLLOWER"];
    user?: (null | UserResponse);
    source_guild?: (null | WebhookSourceGuildResponse);
    source_channel?: (null | WebhookSourceChannelResponse);
}
export interface ChannelPermissionOverwriteRequest {
    id: Snowflake;
    type?: (null | ChannelPermissionOverwrite);
    allow?: (number | null);
    deny?: (number | null);
}
export interface ChannelPermissionOverwriteResponse {
    id: Snowflake;
    type: ChannelPermissionOverwrite;
    allow: string;
    deny: string;
}
export type ChannelPermissionOverwrite = typeof ChannelPermissionOverwrite[keyof typeof ChannelPermissionOverwrite];
export const ChannelPermissionOverwrite = {
    ROLE: 0,
    MEMBER: 1
} as const;
Object.freeze(ChannelPermissionOverwrite);
export interface ChannelSelect {
    type: typeof MessageComponentType["CHANNEL_SELECT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 150
     */
    placeholder?: (string | null);
    /**
     * @maximum 25
     * @minimum 0
     */
    min_values?: (number | null);
    /**
     * @maximum 25
     * @minimum 1
     */
    max_values?: (number | null);
    disabled?: (boolean | null);
    /**
     * @distinct 
     */
    channel_types?: (Array<ChannelType> | null);
}
export type ChannelType = typeof ChannelType[keyof typeof ChannelType];
export const ChannelType = {
    /**
     * A direct message between users
     */
    DM: 1,
    /**
     * A direct message between multiple users
     */
    GROUP_DM: 3,
    /**
     * A text channel within a server
     */
    GUILD_TEXT: 0,
    /**
     * A voice channel within a server
     */
    GUILD_VOICE: 2,
    /**
     * An organizational category that contains up to 50 channels
     */
    GUILD_CATEGORY: 4,
    /**
     * A channel that users can follow and crosspost into their own server (formerly news channels)
     */
    GUILD_ANNOUNCEMENT: 5,
    /**
     * A temporary sub-channel within a GUILD_ANNOUNCEMENT channel
     */
    ANNOUNCEMENT_THREAD: 10,
    /**
     * A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set
     */
    PUBLIC_THREAD: 11,
    /**
     * A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
     */
    PRIVATE_THREAD: 12,
    /**
     * A voice channel for hosting events with an audience
     */
    GUILD_STAGE_VOICE: 13,
    /**
     * The channel in a hub containing the listed servers
     */
    GUILD_DIRECTORY: 14,
    /**
     * Channel that can only contain threads
     */
    GUILD_FORUM: 15
} as const;
Object.freeze(ChannelType);
export interface CommandPermissionResponse {
    id: Snowflake;
    type: ApplicationCommandPermissionType;
    permission: boolean;
}
export interface CommandPermissionsResponse {
    id: Snowflake;
    application_id: Snowflake;
    guild_id: Snowflake;
    permissions: Array<CommandPermissionResponse>;
}
export interface ConnectedAccountGuildResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
}
export interface ConnectedAccountIntegrationResponse {
    id: string;
    type: IntegrationType;
    account: AccountResponse;
    guild: ConnectedAccountGuildResponse;
}
export type ConnectedAccountProvider = typeof ConnectedAccountProvider[keyof typeof ConnectedAccountProvider];
export const ConnectedAccountProvider = {
    BATTLENET: "battlenet",
    EBAY: "ebay",
    EPIC_GAMES: "epicgames",
    FACEBOOK: "facebook",
    GITHUB: "github",
    INSTAGRAM: "instagram",
    LEAGUE_OF_LEGENDS: "leagueoflegends",
    PAYPAL: "paypal",
    PLAYSTATION: "playstation",
    REDDIT: "reddit",
    RIOT_GAMES: "riotgames",
    SKYPE: "skype",
    SPOTIFY: "spotify",
    STEAM: "steam",
    TIKTOK: "tiktok",
    TWITCH: "twitch",
    TWITTER: "twitter",
    XBOX: "xbox",
    YOUTUBE: "youtube"
} as const;
Object.freeze(ConnectedAccountProvider);
export interface ConnectedAccountResponse {
    id: string;
    name?: (string | null);
    type: ConnectedAccountProvider;
    friend_sync: boolean;
    integrations?: (Array<ConnectedAccountIntegrationResponse> | null);
    show_activity: boolean;
    two_way_link: boolean;
    verified: boolean;
    visibility: ConnectedAccountVisibility;
    revoked?: (boolean | null);
}
export type ConnectedAccountVisibility = typeof ConnectedAccountVisibility[keyof typeof ConnectedAccountVisibility];
export const ConnectedAccountVisibility = {
    NONE: 0,
    EVERYONE: 1
} as const;
Object.freeze(ConnectedAccountVisibility);
export interface CreateForumThreadRequest {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    /**
     * @maxItems 5
     */
    applied_tags?: (Array<Snowflake> | null);
    message: BaseCreateMessageCreateRequest;
}
export interface CreateGroupDMInviteRequest {
    /**
     * @maximum 604800
     * @minimum 1
     */
    max_age?: (number | null);
}
export interface CreateGuildChannelRequest {
    type?: (null | (typeof ChannelType["GUILD_TEXT"] | typeof ChannelType["GUILD_VOICE"] | typeof ChannelType["GUILD_CATEGORY"] | typeof ChannelType["GUILD_ANNOUNCEMENT"] | typeof ChannelType["GUILD_STAGE_VOICE"] | typeof ChannelType["GUILD_DIRECTORY"] | typeof ChannelType["GUILD_FORUM"]));
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maximum 2147483647
     * @minimum 0
     */
    position?: (Int32 | null);
    /**
     * @maxLength 4096
     * @minLength 0
     */
    topic?: (string | null);
    /**
     * @minimum 8000
     */
    bitrate?: (number | null);
    /**
     * @minimum 0
     */
    user_limit?: (number | null);
    nsfw?: (boolean | null);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    parent_id?: (Snowflake | null);
    /**
     * @maxItems 100
     */
    permission_overwrites?: (Array<ChannelPermissionOverwriteRequest> | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    default_auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    default_reaction_emoji?: (null | UpdateDefaultReactionEmojiRequest);
    default_sort_order?: (null | ThreadSortOrder);
    default_forum_layout?: (null | ForumLayout);
    /**
     * @maxItems 20
     */
    available_tags?: (Array<(null | CreateOrUpdateThreadTagRequest)> | null);
}
export interface CreateGuildInviteRequest {
    /**
     * @maximum 2592000
     * @minimum 0
     */
    max_age?: (number | null);
    temporary?: (boolean | null);
    /**
     * @maximum 100
     * @minimum 0
     */
    max_uses?: (number | null);
    unique?: (boolean | null);
    target_user_id?: (Snowflake | null);
    target_application_id?: (Snowflake | null);
    target_type?: (null | (typeof InviteTargetType["STREAM"] | typeof InviteTargetType["EMBEDDED_APPLICATION"]));
}
export interface CreateGuildRequestChannelItem {
    type?: (null | (typeof ChannelType["GUILD_TEXT"] | typeof ChannelType["GUILD_VOICE"] | typeof ChannelType["GUILD_CATEGORY"]));
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maximum 2147483647
     * @minimum 0
     */
    position?: (Int32 | null);
    /**
     * @maxLength 4096
     * @minLength 0
     */
    topic?: (string | null);
    /**
     * @minimum 8000
     */
    bitrate?: (number | null);
    /**
     * @minimum 0
     */
    user_limit?: (number | null);
    nsfw?: (boolean | null);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    parent_id?: (Snowflake | null);
    /**
     * @maxItems 100
     */
    permission_overwrites?: (Array<ChannelPermissionOverwriteRequest> | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    default_auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    default_reaction_emoji?: (null | UpdateDefaultReactionEmojiRequest);
    /**
     * @maximum 21600
     * @minimum 0
     */
    default_thread_rate_limit_per_user?: (number | null);
    default_sort_order?: (null | ThreadSortOrder);
    default_forum_layout?: (null | ForumLayout);
    id?: (Snowflake | null);
    /**
     * @maxItems 20
     */
    available_tags?: (Array<CreateOrUpdateThreadTagRequest> | null);
}
export interface CreateGuildRequestRoleItem {
    id: number;
    /**
     * @maxLength 100
     */
    name?: (string | null);
    permissions?: (number | null);
    /**
     * @maximum 16777215
     * @minimum 0
     */
    color?: (number | null);
    hoist?: (boolean | null);
    mentionable?: (boolean | null);
    /**
     * @maxLength 100
     */
    unicode_emoji?: (string | null);
}
export interface CreateMessageInteractionCallbackRequest {
    type: (typeof InteractionCallbackType["CHANNEL_MESSAGE_WITH_SOURCE"] | typeof InteractionCallbackType["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"]);
    data?: (null | IncomingWebhookInteractionRequest);
}
export interface CreateOrUpdateThreadTagRequest {
    /**
     * @maxLength 20
     * @minLength 0
     */
    name: string;
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 100
     */
    emoji_name?: (string | null);
    moderated?: (boolean | null);
}
export interface CreatePrivateChannelRequest {
    recipient_id?: (Snowflake | null);
    /**
     * @maxItems 1521
     * @distinct 
     */
    access_tokens?: (Array<string> | null);
    /**
     * @maxProperties 1521
     */
    nicks?: ({
        /**
         * @maxLength 152133
         */
        [key: string]: (string | null);
    } | null);
}
export interface CreateTextThreadWithMessageRequest {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
}
export interface CreateTextThreadWithoutMessageRequest {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    type?: (null | (typeof ChannelType["ANNOUNCEMENT_THREAD"] | typeof ChannelType["PUBLIC_THREAD"] | typeof ChannelType["PRIVATE_THREAD"]));
    invitable?: (boolean | null);
}
export interface CreatedThreadResponse {
    id: Snowflake;
    type: (typeof ChannelType["ANNOUNCEMENT_THREAD"] | typeof ChannelType["PUBLIC_THREAD"] | typeof ChannelType["PRIVATE_THREAD"]);
    last_message_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    last_pin_timestamp?: (ISO8601DateTime | null);
    guild_id: Snowflake;
    name: string;
    parent_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    rate_limit_per_user?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    bitrate?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_limit?: (Int32 | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    permissions?: (string | null);
    owner_id: Snowflake;
    thread_metadata?: (null | ThreadMetadataResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    message_count: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    member_count: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    total_message_sent: Int32;
    applied_tags?: (Array<Snowflake> | null);
    member?: (null | ThreadMemberResponse);
}
export interface DefaultKeywordListTriggerMetadata {
    /**
     * @maxItems 1000
     */
    allow_list?: (Array<string> | null);
    /**
     * @distinct 
     */
    presets?: (Array<AutomodKeywordPresetType> | null);
}
export interface DefaultKeywordListTriggerMetadataResponse {
    allow_list: Array<string>;
    /**
     * @distinct 
     */
    presets: Array<AutomodKeywordPresetType>;
}
export interface DefaultKeywordListUpsertRequest {
    /**
     * @maxLength 100
     */
    name: string;
    event_type: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type: typeof AutomodTriggerType["DEFAULT_KEYWORD_LIST"];
    trigger_metadata: DefaultKeywordListTriggerMetadata;
}
export interface DefaultKeywordListUpsertRequestPartial {
    /**
     * @maxLength 100
     */
    name?: string;
    event_type?: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type?: typeof AutomodTriggerType["DEFAULT_KEYWORD_LIST"];
    trigger_metadata?: DefaultKeywordListTriggerMetadata;
}
export interface DefaultKeywordRuleResponse {
    id: Snowflake;
    guild_id: Snowflake;
    creator_id: Snowflake;
    name: string;
    event_type: AutomodEventType;
    actions: Array<(BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)>;
    trigger_type: typeof AutomodTriggerType["DEFAULT_KEYWORD_LIST"];
    enabled?: (boolean | null);
    /**
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_metadata: DefaultKeywordListTriggerMetadataResponse;
}
export interface DefaultReactionEmojiResponse {
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export interface DiscordIntegrationResponse {
    type: typeof IntegrationType["DISCORD"];
    name?: (string | null);
    account?: (null | AccountResponse);
    enabled?: (boolean | null);
    id: Snowflake;
    application: IntegrationApplicationResponse;
    /**
     * @distinct 
     */
    scopes: Array<(typeof OAuth2Scope["APPLICATIONS_COMMANDS"] | typeof OAuth2Scope["BOT"] | typeof OAuth2Scope["WEBHOOK_INCOMING"])>;
    user?: (null | UserResponse);
}
export interface Emoji {
    id?: (Snowflake | null);
    /**
     * @maxLength 32
     */
    name: string;
    animated?: (boolean | null);
}
export interface EmojiResponse {
    id: Snowflake;
    name: string;
    user?: (null | UserResponse);
    roles: Array<Snowflake>;
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
}
export interface EntityMetadataExternal {
    /**
     * @maxLength 100
     */
    location: string;
}
export interface EntityMetadataExternalResponse {
    location: string;
}
export interface EntityMetadataStageInstance {

}
export interface EntityMetadataStageInstanceResponse {

}
export interface EntityMetadataVoice {

}
export interface EntityMetadataVoiceResponse {

}
export interface ExternalConnectionIntegrationResponse {
    type: (typeof IntegrationType["TWITCH"] | typeof IntegrationType["YOUTUBE"]);
    name?: (string | null);
    account?: (null | AccountResponse);
    enabled?: (boolean | null);
    id: string;
    user: UserResponse;
    revoked?: (boolean | null);
    expire_behavior?: (null | IntegrationExpireBehaviorType);
    expire_grace_period?: (null | IntegrationExpireGracePeriodType);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    subscriber_count?: (Int32 | null);
    synced_at?: (ISO8601DateTime | null);
    role_id?: (Snowflake | null);
    syncing?: (boolean | null);
    enable_emoticons?: (boolean | null);
}
export interface ExternalScheduledEventCreateRequest {
    /**
     * @maxLength 100
     */
    name: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    entity_type: typeof GuildScheduledEventEntityType["EXTERNAL"];
    channel_id?: (Snowflake | null);
    entity_metadata: EntityMetadataExternal;
}
export interface ExternalScheduledEventPatchRequestPartial {
    status?: (null | GuildScheduledEventStatus);
    /**
     * @maxLength 100
     */
    name?: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time?: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    entity_type?: (null | typeof GuildScheduledEventEntityType["EXTERNAL"]);
    privacy_level?: GuildScheduledEventPrivacyLevel;
    channel_id?: (Snowflake | null);
    entity_metadata?: EntityMetadataExternal;
}
export interface ExternalScheduledEventResponse {
    id: Snowflake;
    guild_id: Snowflake;
    name: string;
    description?: (string | null);
    channel_id?: (Snowflake | null);
    creator_id?: (Snowflake | null);
    creator?: (null | UserResponse);
    image?: (string | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    status: GuildScheduledEventStatus;
    entity_type: typeof GuildScheduledEventEntityType["EXTERNAL"];
    entity_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_count?: (Int32 | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    user_rsvp?: (null | ScheduledEventUserResponse);
    entity_metadata: EntityMetadataExternalResponse;
}
export interface FlagToChannelAction {
    type: typeof AutomodActionType["FLAG_TO_CHANNEL"];
    metadata: FlagToChannelActionMetadata;
}
export interface FlagToChannelActionMetadata {
    channel_id: Snowflake;
}
export interface FlagToChannelActionMetadataResponse {
    channel_id: Snowflake;
}
export interface FlagToChannelActionResponse {
    type: typeof AutomodActionType["FLAG_TO_CHANNEL"];
    metadata: FlagToChannelActionMetadataResponse;
}
export type ForumLayout = typeof ForumLayout[keyof typeof ForumLayout];
export const ForumLayout = {
    /**
     * No default has been set for forum channel
     */
    DEFAULT: 0,
    /**
     * Display posts as a list
     */
    LIST: 1,
    /**
     * Display posts as a collection of tiles
     */
    GRID: 2
} as const;
Object.freeze(ForumLayout);
export interface ForumTagResponse {
    id: Snowflake;
    name: string;
    moderated: boolean;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export interface FriendInviteResponse {
    type?: (null | typeof InviteType["FRIEND"]);
    code: string;
    inviter?: (null | UserResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_age?: (Int32 | null);
    created_at?: (ISO8601DateTime | null);
    expires_at?: (ISO8601DateTime | null);
    channel?: (null | InviteChannelResponse);
    is_contact?: (boolean | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    friends_count?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    uses?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_uses?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags?: (Int32 | null);
}
export interface GatewayBotResponse {
    url: URIString;
    session_start_limit: GatewayBotSessionStartLimitResponse;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    shards: Int32;
}
export interface GatewayBotSessionStartLimitResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_concurrency: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    remaining: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    reset_after: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    total: Int32;
}
export interface GatewayResponse {
    url: URIString;
}
export interface GithubAuthor {
    /**
     * @maxLength 152133
     */
    username?: (string | null);
    /**
     * @maxLength 152133
     */
    name: string;
}
export interface GithubCheckApp {
    /**
     * @maxLength 152133
     */
    name: string;
}
export interface GithubCheckPullRequest {
    number: number;
}
export interface GithubCheckRun {
    /**
     * @maxLength 152133
     */
    conclusion?: (string | null);
    /**
     * @maxLength 152133
     */
    name: string;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    check_suite: GithubCheckSuite;
    /**
     * @maxLength 2048
     */
    details_url?: (URIString | null);
    output?: (null | GithubCheckRunOutput);
    /**
     * @maxItems 1521
     */
    pull_requests?: (Array<GithubCheckPullRequest> | null);
}
export interface GithubCheckRunOutput {
    /**
     * @maxLength 152133
     */
    title?: (string | null);
    /**
     * @maxLength 152133
     */
    summary?: (string | null);
}
export interface GithubCheckSuite {
    /**
     * @maxLength 152133
     */
    conclusion?: (string | null);
    /**
     * @maxLength 152133
     */
    head_branch?: (string | null);
    /**
     * @maxLength 152133
     */
    head_sha: string;
    /**
     * @maxItems 1521
     */
    pull_requests?: (Array<GithubCheckPullRequest> | null);
    app: GithubCheckApp;
}
export interface GithubComment {
    id: number;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    user: GithubUser;
    /**
     * @maxLength 152133
     */
    commit_id?: (string | null);
    /**
     * @maxLength 152133
     */
    body: string;
}
export interface GithubCommit {
    /**
     * @maxLength 152133
     */
    id: string;
    /**
     * @maxLength 2048
     */
    url: URIString;
    /**
     * @maxLength 152133
     */
    message: string;
    author: GithubAuthor;
}
export interface GithubDiscussion {
    /**
     * @maxLength 152133
     */
    title: string;
    number: number;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    /**
     * @maxLength 2048
     */
    answer_html_url?: (URIString | null);
    /**
     * @maxLength 152133
     */
    body?: (string | null);
    user: GithubUser;
}
export interface GithubIssue {
    id: number;
    number: number;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    user: GithubUser;
    /**
     * @maxLength 152133
     */
    title: string;
    /**
     * @maxLength 152133
     */
    body?: (string | null);
    pull_request?: unknown;
}
export interface GithubRelease {
    id: number;
    /**
     * @maxLength 152133
     */
    tag_name: string;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    author: GithubUser;
}
export interface GithubRepository {
    id: number;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    /**
     * @maxLength 152133
     */
    name: string;
    /**
     * @maxLength 152133
     */
    full_name: string;
}
export interface GithubReview {
    user: GithubUser;
    /**
     * @maxLength 152133
     */
    body?: (string | null);
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    /**
     * @maxLength 152133
     */
    state: string;
}
export interface GithubUser {
    id: number;
    /**
     * @maxLength 152133
     */
    login: string;
    /**
     * @maxLength 2048
     */
    html_url: URIString;
    /**
     * @maxLength 2048
     */
    avatar_url: URIString;
}
export interface GithubWebhook {
    /**
     * @maxLength 152133
     */
    action?: (string | null);
    /**
     * @maxLength 152133
     */
    ref?: (string | null);
    /**
     * @maxLength 152133
     */
    ref_type?: (string | null);
    comment?: (null | GithubComment);
    issue?: (null | GithubIssue);
    pull_request?: (null | GithubIssue);
    repository?: (null | GithubRepository);
    forkee?: (null | GithubRepository);
    sender: GithubUser;
    member?: (null | GithubUser);
    release?: (null | GithubRelease);
    head_commit?: (null | GithubCommit);
    /**
     * @maxItems 1521
     */
    commits?: (Array<GithubCommit> | null);
    forced?: (boolean | null);
    /**
     * @maxLength 2048
     */
    compare?: (URIString | null);
    review?: (null | GithubReview);
    check_run?: (null | GithubCheckRun);
    check_suite?: (null | GithubCheckSuite);
    discussion?: (null | GithubDiscussion);
    answer?: (null | GithubComment);
}
export interface GroupDMInviteResponse {
    type?: (null | typeof InviteType["GROUP_DM"]);
    code: string;
    inviter?: (null | UserResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_age?: (Int32 | null);
    created_at?: (ISO8601DateTime | null);
    expires_at?: (ISO8601DateTime | null);
    channel?: (null | InviteChannelResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_member_count?: (Int32 | null);
}
export interface GuildAuditLogResponse {
    audit_log_entries: Array<AuditLogEntryResponse>;
    users: Array<UserResponse>;
    integrations: Array<(PartialDiscordIntegrationResponse | PartialExternalConnectionIntegrationResponse | PartialGuildSubscriptionIntegrationResponse)>;
    webhooks: Array<(ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)>;
    guild_scheduled_events: Array<(ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse)>;
    threads: Array<ThreadResponse>;
    application_commands: Array<ApplicationCommandResponse>;
    auto_moderation_rules: Array<(DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse | null)>;
}
export interface GuildBanResponse {
    user: UserResponse;
    reason?: (string | null);
}
export interface GuildChannelResponse {
    id: Snowflake;
    type: (typeof ChannelType["GUILD_TEXT"] | typeof ChannelType["GUILD_VOICE"] | typeof ChannelType["GUILD_CATEGORY"] | typeof ChannelType["GUILD_ANNOUNCEMENT"] | typeof ChannelType["GUILD_STAGE_VOICE"] | typeof ChannelType["GUILD_DIRECTORY"] | typeof ChannelType["GUILD_FORUM"]);
    last_message_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    last_pin_timestamp?: (ISO8601DateTime | null);
    guild_id: Snowflake;
    name: string;
    parent_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    rate_limit_per_user?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    bitrate?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_limit?: (Int32 | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    permissions?: (string | null);
    topic?: (string | null);
    default_auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    default_thread_rate_limit_per_user?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position: Int32;
    permission_overwrites?: (Array<ChannelPermissionOverwriteResponse> | null);
    nsfw?: (boolean | null);
    available_tags?: (Array<ForumTagResponse> | null);
    default_reaction_emoji?: (null | DefaultReactionEmojiResponse);
    default_sort_order?: (null | ThreadSortOrder);
    default_forum_layout?: (null | ForumLayout);
}
export interface GuildCreateRequest {
    /**
     * @maxLength 100
     * @minLength 2
     */
    name: string;
    /**
     * @maxLength 1024
     * @minLength 0
     */
    description?: (string | null);
    region?: (string | null);
    icon?: (Base64String | null);
    verification_level?: (null | VerificationLevel);
    default_message_notifications?: (null | UserNotificationSetting);
    explicit_content_filter?: (null | GuildExplicitContentFilterType);
    preferred_locale?: (null | AvailableLocale);
    afk_timeout?: (null | AfkTimeout);
    /**
     * @maxItems 1521
     */
    roles?: (Array<CreateGuildRequestRoleItem> | null);
    /**
     * @maxItems 1521
     */
    channels?: (Array<CreateGuildRequestChannelItem> | null);
    afk_channel_id?: (Snowflake | null);
    system_channel_id?: (Snowflake | null);
    system_channel_flags?: (number | null);
}
export type GuildExplicitContentFilterType = typeof GuildExplicitContentFilterType[keyof typeof GuildExplicitContentFilterType];
export const GuildExplicitContentFilterType = {
    /**
     * media content will not be scanned
     */
    DISABLED: 0,
    /**
     * media content sent by members without roles will be scanned
     */
    MEMBERS_WITHOUT_ROLES: 1,
    /**
     * media content sent by all members will be scanned
     */
    ALL_MEMBERS: 2
} as const;
Object.freeze(GuildExplicitContentFilterType);
export type GuildFeature = typeof GuildFeature[keyof typeof GuildFeature];
export const GuildFeature = {
    /**
     * guild has access to set an animated guild banner image
     */
    ANIMATED_BANNER: "ANIMATED_BANNER",
    /**
     * guild has access to set an animated guild icon
     */
    ANIMATED_ICON: "ANIMATED_ICON",
    /**
     * guild is using the old permissions configuration behavior
     */
    APPLICATION_COMMAND_PERMISSIONS_V2: "APPLICATION_COMMAND_PERMISSIONS_V2",
    /**
     * guild has set up auto moderation rules
     */
    AUTO_MODERATION: "AUTO_MODERATION",
    /**
     * guild has access to set a guild banner image
     */
    BANNER: "BANNER",
    /**
     * guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates
     */
    COMMUNITY: "COMMUNITY",
    /**
     * guild has enabled monetization
     */
    CREATOR_MONETIZABLE_PROVISIONAL: "CREATOR_MONETIZABLE_PROVISIONAL",
    /**
     * guild has enabled the role subscription promo page
     */
    CREATOR_STORE_PAGE: "CREATOR_STORE_PAGE",
    /**
     * guild has been set as a support server on the App Directory
     */
    DEVELOPER_SUPPORT_SERVER: "DEVELOPER_SUPPORT_SERVER",
    /**
     * guild is able to be discovered in the directory
     */
    DISCOVERABLE: "DISCOVERABLE",
    /**
     * guild is able to be featured in the directory
     */
    FEATURABLE: "FEATURABLE",
    /**
     * guild has paused invites, preventing new users from joining
     */
    INVITES_DISABLED: "INVITES_DISABLED",
    /**
     * guild has access to set an invite splash background
     */
    INVITE_SPLASH: "INVITE_SPLASH",
    /**
     * guild has enabled Membership Screening
     */
    MEMBER_VERIFICATION_GATE_ENABLED: "MEMBER_VERIFICATION_GATE_ENABLED",
    /**
     * guild has increased custom sticker slots
     */
    MORE_STICKERS: "MORE_STICKERS",
    /**
     * guild has access to create announcement channels
     */
    NEWS: "NEWS",
    /**
     * guild is partnered
     */
    PARTNERED: "PARTNERED",
    /**
     * guild can be previewed before joining via Membership Screening or the directory
     */
    PREVIEW_ENABLED: "PREVIEW_ENABLED",
    /**
     * guild has disabled activity alerts in the configured safety alerts channel
     */
    RAID_ALERTS_DISABLED: "RAID_ALERTS_DISABLED",
    /**
     * guild is able to set role icons
     */
    ROLE_ICONS: "ROLE_ICONS",
    /**
     * guild has role subscriptions that can be purchased
     */
    ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE: "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    /**
     * guild has enabled role subscriptions
     */
    ROLE_SUBSCRIPTIONS_ENABLED: "ROLE_SUBSCRIPTIONS_ENABLED",
    /**
     * guild has enabled ticketed events
     */
    TICKETED_EVENTS_ENABLED: "TICKETED_EVENTS_ENABLED",
    /**
     * guild has access to set a vanity URL
     */
    VANITY_URL: "VANITY_URL",
    /**
     * guild is verified
     */
    VERIFIED: "VERIFIED",
    /**
     * guild has access to set 384kbps bitrate in voice (previously VIP voice servers)
     */
    VIP_REGIONS: "VIP_REGIONS",
    /**
     * guild has enabled the welcome screen
     */
    WELCOME_SCREEN_ENABLED: "WELCOME_SCREEN_ENABLED"
} as const;
Object.freeze(GuildFeature);
export interface GuildHomeSettingsResponse {
    guild_id: Snowflake;
    enabled: boolean;
    welcome_message?: (null | WelcomeMessageResponse);
    new_member_actions?: (Array<(null | NewMemberActionResponse)> | null);
    resource_channels?: (Array<(null | ResourceChannelResponse)> | null);
}
export interface GuildIncomingWebhookResponse {
    application_id?: (Snowflake | null);
    avatar?: (string | null);
    channel_id?: (Snowflake | null);
    guild_id?: (Snowflake | null);
    id: Snowflake;
    name: string;
    type: typeof WebhookType["GUILD_INCOMING"];
    user?: (null | UserResponse);
    token?: (string | null);
    url?: (URIString | null);
}
export interface GuildInviteResponse {
    type?: (null | typeof InviteType["GUILD"]);
    code: string;
    inviter?: (null | UserResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_age?: (Int32 | null);
    created_at?: (ISO8601DateTime | null);
    expires_at?: (ISO8601DateTime | null);
    is_contact?: (boolean | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags?: (Int32 | null);
    guild?: (null | InviteGuildResponse);
    guild_id?: (Snowflake | null);
    channel?: (null | InviteChannelResponse);
    stage_instance?: (null | InviteStageInstanceResponse);
    target_type?: (null | InviteTargetType);
    target_user?: (null | UserResponse);
    target_application?: (null | InviteApplicationResponse);
    guild_scheduled_event?: (null | ScheduledEventResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    uses?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_uses?: (Int32 | null);
    temporary?: (boolean | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_member_count?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_presence_count?: (Int32 | null);
}
export type GuildMFALevel = typeof GuildMFALevel[keyof typeof GuildMFALevel];
export const GuildMFALevel = {
    /**
     * Guild has no MFA/2FA requirement for moderation actions
     */
    NONE: 0,
    /**
     * Guild has a 2FA requirement for moderation actions
     */
    ELEVATED: 1
} as const;
Object.freeze(GuildMFALevel);
export interface GuildMFALevelResponse {
    level: GuildMFALevel;
}
export interface GuildMemberResponse {
    avatar?: (string | null);
    communication_disabled_until?: (ISO8601DateTime | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    joined_at: ISO8601DateTime;
    nick?: (string | null);
    pending: boolean;
    premium_since?: (ISO8601DateTime | null);
    /**
     * @distinct 
     */
    roles: Array<Snowflake>;
    user: UserResponse;
    mute: boolean;
    deaf: boolean;
}
export type GuildNSFWContentLevel = typeof GuildNSFWContentLevel[keyof typeof GuildNSFWContentLevel];
export const GuildNSFWContentLevel = {
    DEFAULT: 0,
    EXPLICIT: 1,
    SAFE: 2,
    AGE_RESTRICTED: 3
} as const;
Object.freeze(GuildNSFWContentLevel);
export type GuildOnboardingMode = typeof GuildOnboardingMode[keyof typeof GuildOnboardingMode];
export const GuildOnboardingMode = {
    /**
     * Only Default Channels considered in constraints
     */
    ONBOARDING_DEFAULT: 0,
    /**
     * Default Channels and Onboarding Prompts considered in constraints
     */
    ONBOARDING_ADVANCED: 1
} as const;
Object.freeze(GuildOnboardingMode);
export interface GuildOnboardingResponse {
    guild_id: Snowflake;
    prompts: Array<OnboardingPromptResponse>;
    /**
     * @distinct 
     */
    default_channel_ids: Array<Snowflake>;
    enabled: boolean;
}
export interface GuildPatchRequestPartial {
    /**
     * @maxLength 100
     * @minLength 2
     */
    name?: string;
    /**
     * @maxLength 1024
     * @minLength 0
     */
    description?: (string | null);
    region?: (string | null);
    icon?: (Base64String | null);
    verification_level?: (null | VerificationLevel);
    default_message_notifications?: (null | UserNotificationSetting);
    explicit_content_filter?: (null | GuildExplicitContentFilterType);
    preferred_locale?: (null | AvailableLocale);
    afk_timeout?: (null | AfkTimeout);
    afk_channel_id?: (Snowflake | null);
    system_channel_id?: (Snowflake | null);
    owner_id?: Snowflake;
    splash?: (Base64String | null);
    banner?: (Base64String | null);
    system_channel_flags?: (number | null);
    /**
     * @maxItems 1521
     * @distinct 
     */
    features?: (Array<(string | null)> | null);
    discovery_splash?: (Base64String | null);
    home_header?: (Base64String | null);
    rules_channel_id?: (Snowflake | null);
    safety_alerts_channel_id?: (Snowflake | null);
    public_updates_channel_id?: (Snowflake | null);
    premium_progress_bar_enabled?: (boolean | null);
}
export interface GuildPreviewResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description?: (string | null);
    home_header?: (string | null);
    splash?: (string | null);
    discovery_splash?: (string | null);
    /**
     * @distinct 
     */
    features: Array<GuildFeature>;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_member_count: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_presence_count: Int32;
    emojis: Array<EmojiResponse>;
    stickers: Array<GuildStickerResponse>;
}
export interface GuildPruneResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    pruned?: (Int32 | null);
}
export interface GuildResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description?: (string | null);
    home_header?: (string | null);
    splash?: (string | null);
    discovery_splash?: (string | null);
    /**
     * @distinct 
     */
    features: Array<GuildFeature>;
    banner?: (string | null);
    owner_id: Snowflake;
    application_id?: (Snowflake | null);
    region: string;
    afk_channel_id?: (Snowflake | null);
    afk_timeout: AfkTimeout;
    system_channel_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    system_channel_flags: Int32;
    widget_enabled: boolean;
    widget_channel_id?: (Snowflake | null);
    verification_level: VerificationLevel;
    roles: Array<GuildRoleResponse>;
    default_message_notifications: UserNotificationSetting;
    mfa_level: GuildMFALevel;
    explicit_content_filter: GuildExplicitContentFilterType;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_presences?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_members?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_stage_video_channel_users?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_video_channel_users?: (Int32 | null);
    vanity_url_code?: (string | null);
    premium_tier: PremiumGuildTier;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    premium_subscription_count: Int32;
    preferred_locale: AvailableLocale;
    rules_channel_id?: (Snowflake | null);
    safety_alerts_channel_id?: (Snowflake | null);
    public_updates_channel_id?: (Snowflake | null);
    premium_progress_bar_enabled: boolean;
    nsfw: boolean;
    nsfw_level: GuildNSFWContentLevel;
    emojis: Array<EmojiResponse>;
    stickers: Array<GuildStickerResponse>;
}
export interface GuildRoleResponse {
    id: Snowflake;
    name: string;
    description?: (string | null);
    permissions: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    color: Int32;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon?: (string | null);
    unicode_emoji?: (string | null);
    tags?: (null | GuildRoleTagsResponse);
}
export interface GuildRoleTagsResponse {
    premium_subscriber?: null;
    bot_id?: (Snowflake | null);
    integration_id?: (Snowflake | null);
    subscription_listing_id?: (Snowflake | null);
    available_for_purchase?: null;
    guild_connections?: null;
}
export type GuildScheduledEventEntityType = typeof GuildScheduledEventEntityType[keyof typeof GuildScheduledEventEntityType];
export const GuildScheduledEventEntityType = {
    NONE: 0,
    STAGE_INSTANCE: 1,
    VOICE: 2,
    EXTERNAL: 3
} as const;
Object.freeze(GuildScheduledEventEntityType);
export type GuildScheduledEventPrivacyLevel = typeof GuildScheduledEventPrivacyLevel[keyof typeof GuildScheduledEventPrivacyLevel];
export const GuildScheduledEventPrivacyLevel = {
    /**
     * the scheduled event is only accessible to guild members
     */
    GUILD_ONLY: 2
} as const;
Object.freeze(GuildScheduledEventPrivacyLevel);
export type GuildScheduledEventStatus = typeof GuildScheduledEventStatus[keyof typeof GuildScheduledEventStatus];
export const GuildScheduledEventStatus = {
    SCHEDULED: 1,
    ACTIVE: 2,
    COMPLETED: 3,
    CANCELED: 4
} as const;
Object.freeze(GuildScheduledEventStatus);
export interface GuildStickerResponse {
    id: Snowflake;
    name: string;
    tags: string;
    type: typeof StickerType["GUILD"];
    format_type?: (null | StickerFormatType);
    description?: (string | null);
    available: boolean;
    guild_id: Snowflake;
    user?: (null | UserResponse);
}
export interface GuildSubscriptionIntegrationResponse {
    type: typeof IntegrationType["GUILD_SUBSCRIPTION"];
    name?: (string | null);
    account?: (null | AccountResponse);
    enabled?: (boolean | null);
    id: Snowflake;
}
export interface GuildTemplateChannelResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    id?: (Int32 | null);
    type: (typeof ChannelType["GUILD_TEXT"] | typeof ChannelType["GUILD_VOICE"] | typeof ChannelType["GUILD_CATEGORY"]);
    name?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position?: (Int32 | null);
    topic?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    bitrate: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_limit: Int32;
    nsfw: boolean;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    rate_limit_per_user: Int32;
    parent_id?: (Snowflake | null);
    default_auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    permission_overwrites: Array<(null | ChannelPermissionOverwriteResponse)>;
    available_tags?: (Array<GuildTemplateChannelTags> | null);
    template: string;
    default_reaction_emoji?: (null | DefaultReactionEmojiResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    default_thread_rate_limit_per_user?: (Int32 | null);
    default_sort_order?: (null | ThreadSortOrder);
    default_forum_layout?: (null | ForumLayout);
    icon_emoji?: (null | IconEmojiResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    theme_color?: (Int32 | null);
}
export interface GuildTemplateChannelTags {
    name: string;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
    moderated?: (boolean | null);
}
export interface GuildTemplateResponse {
    code: string;
    name: string;
    description?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    usage_count: Int32;
    creator_id: Snowflake;
    creator?: (null | UserResponse);
    created_at: ISO8601DateTime;
    updated_at: ISO8601DateTime;
    source_guild_id: Snowflake;
    serialized_source_guild: GuildTemplateSnapshotResponse;
    is_dirty?: (boolean | null);
}
export interface GuildTemplateRoleResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    id: Int32;
    name: string;
    permissions: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    color: Int32;
    hoist: boolean;
    mentionable: boolean;
    icon?: (string | null);
    unicode_emoji?: (string | null);
}
export interface GuildTemplateSnapshotResponse {
    name: string;
    description?: (string | null);
    region?: (string | null);
    verification_level: VerificationLevel;
    default_message_notifications: UserNotificationSetting;
    explicit_content_filter: GuildExplicitContentFilterType;
    preferred_locale: AvailableLocale;
    afk_channel_id?: (Snowflake | null);
    afk_timeout: AfkTimeout;
    system_channel_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    system_channel_flags: Int32;
    roles: Array<GuildTemplateRoleResponse>;
    channels: Array<GuildTemplateChannelResponse>;
}
export interface GuildWelcomeChannel {
    channel_id: Snowflake;
    /**
     * @maxLength 50
     * @minLength 1
     */
    description: string;
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 152133
     */
    emoji_name?: (string | null);
}
export interface GuildWelcomeScreenChannelResponse {
    channel_id: Snowflake;
    description: string;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export interface GuildWelcomeScreenResponse {
    description?: (string | null);
    welcome_channels: Array<GuildWelcomeScreenChannelResponse>;
}
export interface GuildWithCountsResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description?: (string | null);
    home_header?: (string | null);
    splash?: (string | null);
    discovery_splash?: (string | null);
    /**
     * @distinct 
     */
    features: Array<GuildFeature>;
    banner?: (string | null);
    owner_id: Snowflake;
    application_id?: (Snowflake | null);
    region: string;
    afk_channel_id?: (Snowflake | null);
    afk_timeout: AfkTimeout;
    system_channel_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    system_channel_flags: Int32;
    widget_enabled: boolean;
    widget_channel_id?: (Snowflake | null);
    verification_level: VerificationLevel;
    roles: Array<GuildRoleResponse>;
    default_message_notifications: UserNotificationSetting;
    mfa_level: GuildMFALevel;
    explicit_content_filter: GuildExplicitContentFilterType;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_presences?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_members?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_stage_video_channel_users?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_video_channel_users?: (Int32 | null);
    vanity_url_code?: (string | null);
    premium_tier: PremiumGuildTier;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    premium_subscription_count: Int32;
    preferred_locale: AvailableLocale;
    rules_channel_id?: (Snowflake | null);
    safety_alerts_channel_id?: (Snowflake | null);
    public_updates_channel_id?: (Snowflake | null);
    premium_progress_bar_enabled: boolean;
    nsfw: boolean;
    nsfw_level: GuildNSFWContentLevel;
    emojis: Array<EmojiResponse>;
    stickers: Array<GuildStickerResponse>;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_member_count?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_presence_count?: (Int32 | null);
}
export interface IconEmojiResponse {

}
export interface IncomingWebhookInteractionRequest {
    /**
     * @maxLength 2000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
    tts?: (boolean | null);
    flags?: (number | null);
}
export interface IncomingWebhookRequestPartial {
    /**
     * @maxLength 2000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
    tts?: (boolean | null);
    flags?: (number | null);
    /**
     * @maxLength 80
     * @minLength 1
     */
    username?: (string | null);
    /**
     * @maxLength 2048
     */
    avatar_url?: (URIString | null);
    /**
     * @maxLength 100
     * @minLength 0
     */
    thread_name?: (string | null);
    /**
     * @maxItems 5
     */
    applied_tags?: (Array<Snowflake> | null);
}
export interface IncomingWebhookUpdateForInteractionCallbackRequestPartial {
    /**
     * @maxLength 2000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
    flags?: (number | null);
}
export interface IncomingWebhookUpdateRequestPartial {
    /**
     * @maxLength 2000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
    flags?: (number | null);
}
export interface InputText {
    type: typeof MessageComponentType["INPUT_TEXT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    style: TextStyleType;
    /**
     * @maxLength 45
     */
    label: string;
    /**
     * @maxLength 4000
     */
    value?: (string | null);
    /**
     * @maxLength 100
     */
    placeholder?: (string | null);
    required?: (boolean | null);
    /**
     * @maximum 4000
     * @minimum 0
     */
    min_length?: (number | null);
    /**
     * @maximum 4000
     * @minimum 1
     */
    max_length?: (number | null);
}
export interface IntegrationApplicationResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description: string;
    type?: (null | ApplicationType);
    cover_image?: (string | null);
    primary_sku_id?: (Snowflake | null);
    bot?: (null | UserResponse);
}
export type IntegrationExpireBehaviorType = typeof IntegrationExpireBehaviorType[keyof typeof IntegrationExpireBehaviorType];
export const IntegrationExpireBehaviorType = {
    /**
     * Remove role
     */
    REMOVE_ROLE: 0,
    /**
     * Kick
     */
    KICK: 1
} as const;
Object.freeze(IntegrationExpireBehaviorType);
export type IntegrationExpireGracePeriodType = typeof IntegrationExpireGracePeriodType[keyof typeof IntegrationExpireGracePeriodType];
export const IntegrationExpireGracePeriodType = {
    /**
     * 1 day
     */
    ONE_DAY: 1,
    /**
     * 3 days
     */
    THREE_DAYS: 3,
    /**
     * 7 days
     */
    SEVEN_DAYS: 7,
    /**
     * 14 days
     */
    FOURTEEN_DAYS: 14,
    /**
     * 30 days
     */
    THIRTY_DAYS: 30
} as const;
Object.freeze(IntegrationExpireGracePeriodType);
export type IntegrationType = typeof IntegrationType[keyof typeof IntegrationType];
export const IntegrationType = {
    DISCORD: "discord",
    TWITCH: "twitch",
    YOUTUBE: "youtube",
    GUILD_SUBSCRIPTION: "guild_subscription"
} as const;
Object.freeze(IntegrationType);
export interface InteractionApplicationCommandAutocompleteCallbackIntegerData {
    /**
     * @maxItems 25
     */
    choices?: (Array<(null | ApplicationCommandOptionIntegerChoice)> | null);
}
export interface InteractionApplicationCommandAutocompleteCallbackNumberData {
    /**
     * @maxItems 25
     */
    choices?: (Array<(null | ApplicationCommandOptionNumberChoice)> | null);
}
export interface InteractionApplicationCommandAutocompleteCallbackStringData {
    /**
     * @maxItems 25
     */
    choices?: (Array<(null | ApplicationCommandOptionStringChoice)> | null);
}
export type InteractionCallbackType = typeof InteractionCallbackType[keyof typeof InteractionCallbackType];
export const InteractionCallbackType = {
    PONG: 1,
    CHANNEL_MESSAGE_WITH_SOURCE: 4,
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
    DEFERRED_UPDATE_MESSAGE: 6,
    UPDATE_MESSAGE: 7,
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
    MODAL: 9
} as const;
Object.freeze(InteractionCallbackType);
export type InteractionType = typeof InteractionType[keyof typeof InteractionType];
export const InteractionType = {
    /**
     * Sent by Discord to validate your application's interaction handler
     */
    PING: 1,
    /**
     * Sent when a user uses an application command
     */
    APPLICATION_COMMAND: 2,
    /**
     * Sent when a user interacts with a message component previously sent by your application
     */
    MESSAGE_COMPONENT: 3,
    /**
     * Sent when a user is filling in an autocomplete option in a chat command
     */
    APPLICATION_COMMAND_AUTOCOMPLETE: 4,
    /**
     * Sent when a user submits a modal previously sent by your application
     */
    MODAL_SUBMIT: 5
} as const;
Object.freeze(InteractionType);
export interface InviteApplicationResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description: string;
    type?: (null | ApplicationType);
    cover_image?: (string | null);
    primary_sku_id?: (Snowflake | null);
    bot?: (null | UserResponse);
    slug?: (string | null);
    guild_id?: (Snowflake | null);
    rpc_origins?: (Array<(string | null)> | null);
    bot_public?: (boolean | null);
    bot_require_code_grant?: (boolean | null);
    terms_of_service_url?: (URIString | null);
    privacy_policy_url?: (URIString | null);
    custom_install_url?: (URIString | null);
    install_params?: (null | ApplicationOAuth2ParamsResponse);
    verify_key: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_participants?: (Int32 | null);
    /**
     * @distinct 
     */
    tags?: (Array<string> | null);
}
export interface InviteChannelRecipientResponse {
    username: string;
}
export interface InviteChannelResponse {
    id: Snowflake;
    type: ChannelType;
    name?: (string | null);
    icon?: (string | null);
    recipients?: (Array<InviteChannelRecipientResponse> | null);
}
export interface InviteGuildResponse {
    id: Snowflake;
    name: string;
    splash?: (string | null);
    banner?: (string | null);
    description?: (string | null);
    icon?: (string | null);
    /**
     * @distinct 
     */
    features: Array<GuildFeature>;
    verification_level?: (null | VerificationLevel);
    vanity_url_code?: (string | null);
    nsfw_level?: (null | GuildNSFWContentLevel);
    nsfw?: (boolean | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    premium_subscription_count?: (Int32 | null);
}
export interface InviteStageInstanceResponse {
    topic: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    participant_count?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    speaker_count?: (Int32 | null);
    members?: (Array<GuildMemberResponse> | null);
}
export type InviteTargetType = typeof InviteTargetType[keyof typeof InviteTargetType];
export const InviteTargetType = {
    STREAM: 1,
    EMBEDDED_APPLICATION: 2,
    ROLE_SUBSCRIPTIONS_PURCHASE: 3
} as const;
Object.freeze(InviteTargetType);
export type InviteType = typeof InviteType[keyof typeof InviteType];
export const InviteType = {
    GUILD: 0,
    GROUP_DM: 1,
    FRIEND: 2
} as const;
Object.freeze(InviteType);
export interface KeywordRuleResponse {
    id: Snowflake;
    guild_id: Snowflake;
    creator_id: Snowflake;
    name: string;
    event_type: AutomodEventType;
    actions: Array<(BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)>;
    trigger_type: typeof AutomodTriggerType["KEYWORD"];
    enabled?: (boolean | null);
    /**
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_metadata: KeywordTriggerMetadataResponse;
}
export interface KeywordTriggerMetadata {
    /**
     * @maxItems 1000
     */
    keyword_filter?: (Array<string> | null);
    /**
     * @maxItems 10
     */
    regex_patterns?: (Array<string> | null);
    /**
     * @maxItems 100
     */
    allow_list?: (Array<string> | null);
}
export interface KeywordTriggerMetadataResponse {
    keyword_filter: Array<string>;
    regex_patterns: Array<string>;
    allow_list: Array<string>;
}
export interface KeywordUpsertRequest {
    /**
     * @maxLength 100
     */
    name: string;
    event_type: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type: typeof AutomodTriggerType["KEYWORD"];
    trigger_metadata?: (null | KeywordTriggerMetadata);
}
export interface KeywordUpsertRequestPartial {
    /**
     * @maxLength 100
     */
    name?: string;
    event_type?: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type?: typeof AutomodTriggerType["KEYWORD"];
    trigger_metadata?: (null | KeywordTriggerMetadata);
}
export interface MLSpamRuleResponse {
    id: Snowflake;
    guild_id: Snowflake;
    creator_id: Snowflake;
    name: string;
    event_type: AutomodEventType;
    actions: Array<(BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)>;
    trigger_type: typeof AutomodTriggerType["ML_SPAM"];
    enabled?: (boolean | null);
    /**
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_metadata: MLSpamTriggerMetadataResponse;
}
export interface MLSpamTriggerMetadata {

}
export interface MLSpamTriggerMetadataResponse {

}
export interface MLSpamUpsertRequest {
    /**
     * @maxLength 100
     */
    name: string;
    event_type: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type: typeof AutomodTriggerType["ML_SPAM"];
    trigger_metadata?: (null | MLSpamTriggerMetadata);
}
export interface MLSpamUpsertRequestPartial {
    /**
     * @maxLength 100
     */
    name?: string;
    event_type?: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type?: typeof AutomodTriggerType["ML_SPAM"];
    trigger_metadata?: (null | MLSpamTriggerMetadata);
}
export interface MentionSpamRuleResponse {
    id: Snowflake;
    guild_id: Snowflake;
    creator_id: Snowflake;
    name: string;
    event_type: AutomodEventType;
    actions: Array<(BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)>;
    trigger_type: typeof AutomodTriggerType["MENTION_SPAM"];
    enabled?: (boolean | null);
    /**
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_metadata: MentionSpamTriggerMetadataResponse;
}
export interface MentionSpamTriggerMetadata {
    /**
     * @maximum 50
     * @minimum 0
     */
    mention_total_limit: number;
    mention_raid_protection_enabled?: (boolean | null);
}
export interface MentionSpamTriggerMetadataResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    mention_total_limit: Int32;
}
export interface MentionSpamUpsertRequest {
    /**
     * @maxLength 100
     */
    name: string;
    event_type: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type: typeof AutomodTriggerType["MENTION_SPAM"];
    trigger_metadata?: (null | MentionSpamTriggerMetadata);
}
export interface MentionSpamUpsertRequestPartial {
    /**
     * @maxLength 100
     */
    name?: string;
    event_type?: AutomodEventType;
    /**
     * @maxItems 5
     * @minItems 1
     */
    actions?: (Array<(BlockMessageAction | FlagToChannelAction | QuarantineUserAction | UserCommunicationDisabledAction)> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 20
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_type?: typeof AutomodTriggerType["MENTION_SPAM"];
    trigger_metadata?: (null | MentionSpamTriggerMetadata);
}
export interface MentionableSelect {
    type: typeof MessageComponentType["MENTIONABLE_SELECT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 150
     */
    placeholder?: (string | null);
    /**
     * @maximum 25
     * @minimum 0
     */
    min_values?: (number | null);
    /**
     * @maximum 25
     * @minimum 1
     */
    max_values?: (number | null);
    disabled?: (boolean | null);
}
export interface MessageActivityResponse {

}
export interface MessageAllowedMentionsRequest {
    /**
     * @maxItems 1521
     * @distinct 
     */
    parse?: (Array<(null | AllowedMentionType)> | null);
    /**
     * @maxItems 100
     * @distinct 
     */
    users?: (Array<(Snowflake | null)> | null);
    /**
     * @maxItems 100
     * @distinct 
     */
    roles?: (Array<(Snowflake | null)> | null);
    replied_user?: (boolean | null);
}
export interface MessageAttachmentRequest {
    id: Snowflake;
    /**
     * @maxLength 1024
     */
    filename?: (string | null);
    /**
     * @maxLength 1024
     */
    description?: (string | null);
    is_remix?: (boolean | null);
}
export interface MessageAttachmentResponse {
    id: Snowflake;
    filename: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    size: Int32;
    url: URIString;
    proxy_url: URIString;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    width?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    height?: (Int32 | null);
    duration_secs?: (number | null);
    waveform?: (string | null);
    description?: (string | null);
    content_type?: (string | null);
    ephemeral?: (boolean | null);
}
export interface MessageComponentActionRowResponse {
    type: typeof MessageComponentType["ACTION_ROW"];
    components?: (Array<(MessageComponentButtonResponse | MessageComponentChannelSelectResponse | MessageComponentInputTextResponse | MessageComponentMentionableSelectResponse | MessageComponentRoleSelectResponse | MessageComponentStringSelectResponse | MessageComponentUserSelectResponse)> | null);
}
export interface MessageComponentButtonResponse {
    type: typeof MessageComponentType["BUTTON"];
    custom_id?: (string | null);
    style: ButtonStyleType;
    label?: (string | null);
    disabled?: (boolean | null);
    emoji?: (null | MessageComponentEmojiResponse);
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
}
export interface MessageComponentChannelSelectResponse {
    type: typeof MessageComponentType["CHANNEL_SELECT"];
    custom_id: string;
    placeholder?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_values?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_values?: (Int32 | null);
    disabled?: (boolean | null);
    /**
     * @distinct 
     */
    channel_types?: (Array<ChannelType> | null);
}
export interface MessageComponentEmojiResponse {
    id?: (Snowflake | null);
    name: string;
    animated?: (boolean | null);
}
export interface MessageComponentInputTextResponse {
    type: typeof MessageComponentType["INPUT_TEXT"];
    custom_id: string;
    style: TextStyleType;
    label?: (string | null);
    value?: (string | null);
    placeholder?: (string | null);
    required?: (boolean | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_length?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_length?: (Int32 | null);
}
export interface MessageComponentMentionableSelectResponse {
    type: typeof MessageComponentType["MENTIONABLE_SELECT"];
    custom_id: string;
    placeholder?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_values?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_values?: (Int32 | null);
    disabled?: (boolean | null);
}
export interface MessageComponentRoleSelectResponse {
    type: typeof MessageComponentType["ROLE_SELECT"];
    custom_id: string;
    placeholder?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_values?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_values?: (Int32 | null);
    disabled?: (boolean | null);
}
export interface MessageComponentStringSelectResponse {
    type: typeof MessageComponentType["STRING_SELECT"];
    custom_id: string;
    placeholder?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_values?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_values?: (Int32 | null);
    disabled?: (boolean | null);
    options?: (Array<(null | SelectOptionResponse)> | null);
}
export type MessageComponentType = typeof MessageComponentType[keyof typeof MessageComponentType];
export const MessageComponentType = {
    /**
     * Container for other components
     */
    ACTION_ROW: 1,
    /**
     * Button object
     */
    BUTTON: 2,
    /**
     * Select menu for picking from defined text options
     */
    STRING_SELECT: 3,
    /**
     * Text input object
     */
    INPUT_TEXT: 4,
    /**
     * Select menu for users
     */
    USER_SELECT: 5,
    /**
     * Select menu for roles
     */
    ROLE_SELECT: 6,
    /**
     * Select menu for mentionables (users and roles)
     */
    MENTIONABLE_SELECT: 7,
    /**
     * Select menu for channels
     */
    CHANNEL_SELECT: 8
} as const;
Object.freeze(MessageComponentType);
export interface MessageComponentUserSelectResponse {
    type: typeof MessageComponentType["USER_SELECT"];
    custom_id: string;
    placeholder?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    min_values?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_values?: (Int32 | null);
    disabled?: (boolean | null);
}
export interface MessageCreateRequest {
    /**
     * @maxLength 4000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 3
     */
    sticker_ids?: (Array<Snowflake> | null);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    flags?: (number | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
    message_reference?: (null | ReplyMessageReferenceRequest);
    nonce?: (Int64 | string | null);
    tts?: (boolean | null);
}
export interface MessageEditRequestPartial {
    /**
     * @maxLength 4000
     */
    content?: (string | null);
    /**
     * @maxItems 10
     */
    embeds?: (Array<RichEmbed> | null);
    flags?: (number | null);
    allowed_mentions?: (null | MessageAllowedMentionsRequest);
    /**
     * @maxItems 1521
     */
    sticker_ids?: (Array<(number | null)> | null);
    /**
     * @maxItems 5
     */
    components?: (Array<(ActionRow | Button | ChannelSelect | MentionableSelect | RoleSelect | StringSelect | UserSelect)> | null);
    /**
     * @maxItems 10
     */
    attachments?: (Array<MessageAttachmentRequest> | null);
}
export interface MessageEmbedAuthorResponse {
    name: string;
    url?: (string | null);
    icon_url?: (URIString | null);
    proxy_icon_url?: (URIString | null);
}
export interface MessageEmbedFieldResponse {
    name: string;
    value: string;
    inline: boolean;
}
export interface MessageEmbedFooterResponse {
    text: string;
    icon_url?: (URIString | null);
    proxy_icon_url?: (URIString | null);
}
export interface MessageEmbedImageResponse {
    url?: (URIString | null);
    proxy_url?: (URIString | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    width?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    height?: (Int32 | null);
}
export interface MessageEmbedProviderResponse {
    name: string;
    url?: (URIString | null);
}
export interface MessageEmbedResponse {
    type: string;
    url?: (URIString | null);
    title?: (string | null);
    description?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    color?: (Int32 | null);
    timestamp?: (ISO8601DateTime | null);
    fields?: (Array<MessageEmbedFieldResponse> | null);
    author?: (null | MessageEmbedAuthorResponse);
    provider?: (null | MessageEmbedProviderResponse);
    image?: (null | MessageEmbedImageResponse);
    thumbnail?: (null | MessageEmbedImageResponse);
    video?: (null | MessageEmbedVideoResponse);
    footer?: (null | MessageEmbedFooterResponse);
}
export interface MessageEmbedVideoResponse {
    url?: (URIString | null);
    proxy_url?: (URIString | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    width?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    height?: (Int32 | null);
}
export interface MessageInteractionResponse {
    id: Snowflake;
    type: InteractionType;
    name: string;
    user?: (null | UserResponse);
    name_localized?: (string | null);
}
export interface MessageMentionChannelResponse {
    id: Snowflake;
    name: string;
    type: ChannelType;
    guild_id: Snowflake;
}
export interface MessageReactionCountDetailsResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    burst: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    normal: Int32;
}
export interface MessageReactionEmojiResponse {
    id?: (Snowflake | null);
    name?: (string | null);
    animated?: (boolean | null);
}
export interface MessageReactionResponse {
    emoji: MessageReactionEmojiResponse;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    count: Int32;
    count_details: MessageReactionCountDetailsResponse;
    burst_colors: Array<string>;
    me_burst: boolean;
    me: boolean;
}
export interface MessageReferenceResponse {
    channel_id: Snowflake;
    message_id?: (Snowflake | null);
    guild_id?: (Snowflake | null);
}
export interface MessageResponse {
    id: Snowflake;
    type: MessageType;
    content: string;
    channel_id: Snowflake;
    author: UserResponse;
    attachments: Array<MessageAttachmentResponse>;
    embeds: Array<MessageEmbedResponse>;
    mentions: Array<UserResponse>;
    /**
     * @distinct 
     */
    mention_roles: Array<Snowflake>;
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    timestamp: ISO8601DateTime;
    edited_timestamp?: (ISO8601DateTime | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    components: Array<(MessageComponentActionRowResponse | MessageComponentButtonResponse | MessageComponentChannelSelectResponse | MessageComponentInputTextResponse | MessageComponentMentionableSelectResponse | MessageComponentRoleSelectResponse | MessageComponentStringSelectResponse | MessageComponentUserSelectResponse)>;
    activity?: (null | MessageActivityResponse);
    application?: (null | BasicApplicationResponse);
    application_id?: (Snowflake | null);
    interaction?: (null | MessageInteractionResponse);
    nonce?: (Int64 | string | null);
    webhook_id?: (Snowflake | null);
    message_reference?: (null | MessageReferenceResponse);
    thread?: (null | ThreadResponse);
    mention_channels?: (Array<(null | MessageMentionChannelResponse)> | null);
    stickers?: (Array<(GuildStickerResponse | StandardStickerResponse)> | null);
    sticker_items?: (Array<MessageStickerItemResponse> | null);
    role_subscription_data?: (null | MessageRoleSubscriptionDataResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position?: (Int32 | null);
    reactions?: (Array<MessageReactionResponse> | null);
    referenced_message?: (null | BasicMessageResponse);
}
export interface MessageRoleSubscriptionDataResponse {
    role_subscription_listing_id: Snowflake;
    tier_name: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    total_months_subscribed: Int32;
    is_renewal: boolean;
}
export interface MessageStickerItemResponse {
    id: Snowflake;
    name: string;
    format_type: StickerFormatType;
}
export type MessageType = typeof MessageType[keyof typeof MessageType];
export const MessageType = {
    DEFAULT: 0,
    RECIPIENT_ADD: 1,
    RECIPIENT_REMOVE: 2,
    CALL: 3,
    CHANNEL_NAME_CHANGE: 4,
    CHANNEL_ICON_CHANGE: 5,
    CHANNEL_PINNED_MESSAGE: 6,
    USER_JOIN: 7,
    GUILD_BOOST: 8,
    GUILD_BOOST_TIER_1: 9,
    GUILD_BOOST_TIER_2: 10,
    GUILD_BOOST_TIER_3: 11,
    CHANNEL_FOLLOW_ADD: 12,
    GUILD_DISCOVERY_DISQUALIFIED: 14,
    GUILD_DISCOVERY_REQUALIFIED: 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17,
    THREAD_CREATED: 18,
    REPLY: 19,
    CHAT_INPUT_COMMAND: 20,
    THREAD_STARTER_MESSAGE: 21,
    GUILD_INVITE_REMINDER: 22,
    CONTEXT_MENU_COMMAND: 23,
    AUTO_MODERATION_ACTION: 24,
    ROLE_SUBSCRIPTION_PURCHASE: 25,
    INTERACTION_PREMIUM_UPSELL: 26,
    STAGE_START: 27,
    STAGE_END: 28,
    STAGE_SPEAKER: 29,
    STAGE_TOPIC: 31,
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION: 32
} as const;
Object.freeze(MessageType);
export type MetadataItemType = typeof MetadataItemType[keyof typeof MetadataItemType];
export const MetadataItemType = {
    /**
     * the metadata value (integer) is less than or equal to the guild's configured value (integer)
     */
    INTEGER_LESS_THAN_EQUAL: 1,
    /**
     * the metadata value (integer) is greater than or equal to the guild's configured value (integer)
     */
    INTEGER_GREATER_THAN_EQUAL: 2,
    /**
     * the metadata value (integer) is equal to the guild's configured value (integer)
     */
    INTEGER_EQUAL: 3,
    /**
     * the metadata value (integer) is not equal to the guild's configured value (integer)
     */
    INTEGER_NOT_EQUAL: 4,
    /**
     * the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date)
     */
    DATETIME_LESS_THAN_EQUAL: 5,
    /**
     * the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date)
     */
    DATETIME_GREATER_THAN_EQUAL: 6,
    /**
     * the metadata value (integer) is equal to the guild's configured value (integer; 1)
     */
    BOOLEAN_EQUAL: 7,
    /**
     * the metadata value (integer) is not equal to the guild's configured value (integer; 1)
     */
    BOOLEAN_NOT_EQUAL: 8
} as const;
Object.freeze(MetadataItemType);
export interface ModalInteractionCallbackData {
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 45
     */
    title: string;
    /**
     * @maxItems 5
     * @minItems 1
     */
    components: Array<(ActionRow | InputText)>;
}
export interface ModalInteractionCallbackRequest {
    type: typeof InteractionCallbackType["MODAL"];
    data: ModalInteractionCallbackData;
}
export interface MyGuildResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    owner: boolean;
    permissions: string;
    /**
     * @distinct 
     */
    features: Array<GuildFeature>;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_member_count?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_presence_count?: (Int32 | null);
}
export interface NewMemberActionResponse {
    channel_id: Snowflake;
    action_type: NewMemberActionType;
    title: string;
    description: string;
    emoji?: (null | SettingsEmojiResponse);
    icon?: (string | null);
}
export type NewMemberActionType = typeof NewMemberActionType[keyof typeof NewMemberActionType];
export const NewMemberActionType = {
    VIEW: 0,
    TALK: 1
} as const;
Object.freeze(NewMemberActionType);
export interface OAuth2GetAuthorizationResponse {
    application: ApplicationResponse;
    expires: ISO8601DateTime;
    /**
     * @distinct 
     */
    scopes: Array<OAuth2Scope>;
    user?: (null | UserResponse);
}
export type OAuth2Scope = typeof OAuth2Scope[keyof typeof OAuth2Scope];
export const OAuth2Scope = {
    /**
     * allows /users/\@me without email
     */
    IDENTIFY: "identify",
    /**
     * enables /users/\@me to return an email
     */
    EMAIL: "email",
    /**
     * allows /users/\@me/connections to return linked third-party accounts
     */
    CONNECTIONS: "connections",
    /**
     * allows /users/\@me/guilds to return basic information about all of a user's guilds
     */
    GUILDS: "guilds",
    /**
     * allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild
     */
    GUILDS_JOIN: "guilds.join",
    /**
     * allows /users/\@me/guilds/{guild.id}/member to return a user's member information in a guild
     */
    GUILDS_MEMBERS_READ: "guilds.members.read",
    /**
     * allows your app to join users to a group dm
     */
    GDM_JOIN: "gdm.join",
    /**
     * for oauth2 bots, this puts the bot in the user's selected guild by default
     */
    BOT: "bot",
    /**
     * for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval
     */
    RPC: "rpc",
    /**
     * for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval
     */
    RPC_NOTIFICATIONS_READ: "rpc.notifications.read",
    /**
     * for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval
     */
    RPC_VOICE_READ: "rpc.voice.read",
    /**
     * for local rpc server access, this allows you to update a user's voice settings - requires Discord approval
     */
    RPC_VOICE_WRITE: "rpc.voice.write",
    /**
     * for local rpc server access, this allows you to read a user's video status - requires Discord approval
     */
    RPC_VIDEO_READ: "rpc.video.read",
    /**
     * for local rpc server access, this allows you to update a user's video settings - requires Discord approval
     */
    RPC_VIDEO_WRITE: "rpc.video.write",
    /**
     * for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval
     */
    RPC_SCREENSHARE_READ: "rpc.screenshare.read",
    /**
     * for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval
     */
    RPC_SCREENSHARE_WRITE: "rpc.screenshare.write",
    /**
     * for local rpc server access, this allows you to update a user's activity - requires Discord approval
     */
    RPC_ACTIVITIES_WRITE: "rpc.activities.write",
    /**
     * this generates a webhook that is returned in the oauth token response for authorization code grants
     */
    WEBHOOK_INCOMING: "webhook.incoming",
    /**
     * for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates)
     */
    MESSAGES_READ: "messages.read",
    /**
     * allows your app to upload/update builds for a user's applications - requires Discord approval
     */
    APPLICATIONS_BUILDS_UPLOAD: "applications.builds.upload",
    /**
     * allows your app to read build data for a user's applications
     */
    APPLICATIONS_BUILDS_READ: "applications.builds.read",
    /**
     * allows your app to use commands in a guild
     */
    APPLICATIONS_COMMANDS: "applications.commands",
    /**
     * allows your app to update permissions for its commands in a guild a user has permissions to
     */
    APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE: "applications.commands.permissions.update",
    /**
     * allows your app to update its commands using a Bearer token - client credentials grant only
     */
    APPLICATIONS_COMMANDS_UPDATE: "applications.commands.update",
    /**
     * allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications
     */
    APPLICATIONS_STORE_UPDATE: "applications.store.update",
    /**
     * allows your app to read entitlements for a user's applications
     */
    APPLICATIONS_ENTITLEMENTS: "applications.entitlements",
    /**
     * allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval
     */
    ACTIVITIES_READ: "activities.read",
    /**
     * allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER)
     */
    ACTIVITIES_WRITE: "activities.write",
    /**
     * allows your app to know a user's friends and implicit relationships - requires Discord approval
     */
    RELATIONSHIPS_READ: "relationships.read",
    /**
     * allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval
     */
    VOICE: "voice",
    /**
     * allows your app to see information about the user's DMs and group DMs - requires Discord approval
     */
    DM_CHANNELS_READ: "dm_channels.read",
    /**
     * allows your app to update a user's connection and metadata for the app
     */
    ROLE_CONNECTIONS_WRITE: "role_connections.write"
} as const;
Object.freeze(OAuth2Scope);
export interface OnboardingPromptOptionRequest {
    id?: (Snowflake | null);
    /**
     * @maxLength 50
     * @minLength 1
     */
    title: string;
    /**
     * @maxLength 100
     */
    description?: (string | null);
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 100
     */
    emoji_name?: (string | null);
    emoji_animated?: (boolean | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    role_ids?: (Array<Snowflake> | null);
    /**
     * @maxItems 50
     * @distinct 
     */
    channel_ids?: (Array<Snowflake> | null);
}
export interface OnboardingPromptOptionResponse {
    id: Snowflake;
    title: string;
    description: string;
    emoji: SettingsEmojiResponse;
    /**
     * @distinct 
     */
    role_ids: Array<Snowflake>;
    /**
     * @distinct 
     */
    channel_ids: Array<Snowflake>;
}
export interface OnboardingPromptResponse {
    id: Snowflake;
    title: string;
    options: Array<OnboardingPromptOptionResponse>;
    single_select: boolean;
    required: boolean;
    in_onboarding: boolean;
    type: OnboardingPromptType;
}
export type OnboardingPromptType = typeof OnboardingPromptType[keyof typeof OnboardingPromptType];
export const OnboardingPromptType = {
    /**
     * Multiple choice options
     */
    MULTIPLE_CHOICE: 0,
    /**
     * Many options shown as a dropdown
     */
    DROPDOWN: 1
} as const;
Object.freeze(OnboardingPromptType);
export interface PartialDiscordIntegrationResponse {
    id: Snowflake;
    type: typeof IntegrationType["DISCORD"];
    name?: (string | null);
    account?: (null | AccountResponse);
    application_id: Snowflake;
}
export interface PartialExternalConnectionIntegrationResponse {
    id: Snowflake;
    type: (typeof IntegrationType["TWITCH"] | typeof IntegrationType["YOUTUBE"]);
    name?: (string | null);
    account?: (null | AccountResponse);
}
export interface PartialGuildSubscriptionIntegrationResponse {
    id: Snowflake;
    type: typeof IntegrationType["GUILD_SUBSCRIPTION"];
    name?: (string | null);
    account?: (null | AccountResponse);
}
export interface PongInteractionCallbackRequest {
    type: typeof InteractionCallbackType["PONG"];
}
export type PremiumGuildTier = typeof PremiumGuildTier[keyof typeof PremiumGuildTier];
export const PremiumGuildTier = {
    /**
     * Guild has not unlocked any Server Boost perks
     */
    NONE: 0,
    /**
     * Guild has unlocked Server Boost level 1 perks
     */
    TIER_1: 1,
    /**
     * Guild has unlocked Server Boost level 2 perks
     */
    TIER_2: 2,
    /**
     * Guild has unlocked Server Boost level 3 perks
     */
    TIER_3: 3
} as const;
Object.freeze(PremiumGuildTier);
export type PremiumType = typeof PremiumType[keyof typeof PremiumType];
export const PremiumType = {
    /**
     * None
     */
    NONE: 0,
    /**
     * Nitro Classic
     */
    TIER_1: 1,
    /**
     * Nitro Standard
     */
    TIER_2: 2,
    /**
     * Nitro Basic
     */
    TIER_0: 3
} as const;
Object.freeze(PremiumType);
export interface PrivateApplicationResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
    description: string;
    type?: (null | ApplicationType);
    cover_image?: (string | null);
    primary_sku_id?: (Snowflake | null);
    bot?: (null | UserResponse);
    slug?: (string | null);
    guild_id?: (Snowflake | null);
    rpc_origins?: (Array<(string | null)> | null);
    bot_public?: (boolean | null);
    bot_require_code_grant?: (boolean | null);
    terms_of_service_url?: (URIString | null);
    privacy_policy_url?: (URIString | null);
    custom_install_url?: (URIString | null);
    install_params?: (null | ApplicationOAuth2ParamsResponse);
    verify_key: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    max_participants?: (Int32 | null);
    /**
     * @distinct 
     */
    tags?: (Array<string> | null);
    redirect_uris: Array<(URIString | null)>;
    interactions_endpoint_url?: (URIString | null);
    role_connections_verification_url?: (URIString | null);
    owner: UserResponse;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    approximate_guild_count?: (Int32 | null);
    team?: (null | TeamResponse);
}
export interface PrivateChannelRequestPartial {
    /**
     * @maxLength 100
     * @minLength 0
     */
    name?: (string | null);
    icon?: (Base64String | null);
}
export interface PrivateChannelResponse {
    id: Snowflake;
    type: typeof ChannelType["DM"];
    last_message_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    last_pin_timestamp?: (ISO8601DateTime | null);
    recipients: Array<UserResponse>;
}
export interface PrivateGroupChannelResponse {
    id: Snowflake;
    type: typeof ChannelType["GROUP_DM"];
    last_message_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    last_pin_timestamp?: (ISO8601DateTime | null);
    recipients: Array<UserResponse>;
    name?: (string | null);
    icon?: (string | null);
    owner_id?: (Snowflake | null);
    managed?: (boolean | null);
    application_id?: (Snowflake | null);
}
export interface PrivateGuildMemberResponse {
    avatar?: (string | null);
    communication_disabled_until?: (ISO8601DateTime | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    joined_at: ISO8601DateTime;
    nick?: (string | null);
    pending: boolean;
    premium_since?: (ISO8601DateTime | null);
    /**
     * @distinct 
     */
    roles: Array<Snowflake>;
    user: UserResponse;
    mute: boolean;
    deaf: boolean;
    banner?: (string | null);
}
export interface QuarantineUserAction {
    type: typeof AutomodActionType["QUARANTINE_USER"];
    metadata?: (null | QuarantineUserActionMetadata);
}
export interface QuarantineUserActionMetadata {

}
export interface QuarantineUserActionMetadataResponse {

}
export interface QuarantineUserActionResponse {
    type: typeof AutomodActionType["QUARANTINE_USER"];
    metadata: QuarantineUserActionMetadataResponse;
}
export interface ReplyMessageReferenceRequest {
    guild_id?: (Snowflake | null);
    channel_id?: (Snowflake | null);
    message_id: Snowflake;
    fail_if_not_exists?: (boolean | null);
}
export interface ResourceChannelResponse {
    channel_id: Snowflake;
    title: string;
    emoji?: (null | SettingsEmojiResponse);
    icon?: (string | null);
    description: string;
}
export interface RichEmbed {
    /**
     * @maxLength 152133
     */
    type?: (string | null);
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    /**
     * @maxLength 256
     */
    title?: (string | null);
    /**
     * @maximum 16777215
     * @minimum 0
     */
    color?: (number | null);
    timestamp?: (ISO8601DateTime | null);
    /**
     * @maxLength 4096
     */
    description?: (string | null);
    author?: (null | RichEmbedAuthor);
    image?: (null | RichEmbedImage);
    thumbnail?: (null | RichEmbedThumbnail);
    footer?: (null | RichEmbedFooter);
    /**
     * @maxItems 1521
     */
    fields?: (Array<RichEmbedField> | null);
    provider?: (null | RichEmbedProvider);
    video?: (null | RichEmbedVideo);
}
export interface RichEmbedAuthor {
    /**
     * @maxLength 256
     */
    name?: (string | null);
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    /**
     * @maxLength 2048
     */
    icon_url?: (URIString | null);
}
export interface RichEmbedField {
    /**
     * @maxLength 256
     */
    name: string;
    /**
     * @maxLength 1024
     */
    value: string;
    inline?: (boolean | null);
}
export interface RichEmbedFooter {
    /**
     * @maxLength 2048
     */
    text?: (string | null);
    /**
     * @maxLength 2048
     */
    icon_url?: (URIString | null);
}
export interface RichEmbedImage {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export interface RichEmbedProvider {
    /**
     * @maxLength 256
     */
    name?: (string | null);
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
}
export interface RichEmbedThumbnail {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export interface RichEmbedVideo {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export interface RoleSelect {
    type: typeof MessageComponentType["ROLE_SELECT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 150
     */
    placeholder?: (string | null);
    /**
     * @maximum 25
     * @minimum 0
     */
    min_values?: (number | null);
    /**
     * @maximum 25
     * @minimum 1
     */
    max_values?: (number | null);
    disabled?: (boolean | null);
}
export interface ScheduledEventResponse {
    id: Snowflake;
    guild_id: Snowflake;
    name: string;
    description?: (string | null);
    channel_id?: (Snowflake | null);
    creator_id?: (Snowflake | null);
    creator?: (null | UserResponse);
    image?: (string | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    status: GuildScheduledEventStatus;
    entity_type: GuildScheduledEventEntityType;
    entity_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_count?: (Int32 | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    user_rsvp?: (null | ScheduledEventUserResponse);
}
export interface ScheduledEventUserResponse {
    guild_scheduled_event_id: Snowflake;
    user_id: Snowflake;
    user?: (null | UserResponse);
    member?: (null | GuildMemberResponse);
}
export interface SelectOption {
    /**
     * @maxLength 100
     * @minLength 1
     */
    label: string;
    /**
     * @maxLength 100
     * @minLength 1
     */
    value: string;
    /**
     * @maxLength 100
     */
    description?: (string | null);
    emoji?: (null | Emoji);
    default?: (boolean | null);
}
export interface SelectOptionResponse {
    label: string;
    value: string;
    description?: (string | null);
    emoji?: (null | MessageComponentEmojiResponse);
    default?: (boolean | null);
}
export interface SettingsEmojiResponse {
    id?: (Snowflake | null);
    name?: (string | null);
    animated?: (boolean | null);
}
export interface SlackWebhook {
    /**
     * @maxLength 2000
     */
    text?: (string | null);
    /**
     * @maxLength 152133
     */
    username?: (string | null);
    /**
     * @maxLength 2048
     */
    icon_url?: (URIString | null);
    /**
     * @maxItems 1521
     */
    attachments?: (Array<WebhookSlackEmbed> | null);
}
export interface SpamLinkRuleResponse {
    id: Snowflake;
    guild_id: Snowflake;
    creator_id: Snowflake;
    name: string;
    event_type: AutomodEventType;
    actions: Array<(BlockMessageActionResponse | FlagToChannelActionResponse | QuarantineUserActionResponse | UserCommunicationDisabledActionResponse)>;
    trigger_type: typeof AutomodTriggerType["SPAM_LINK"];
    enabled?: (boolean | null);
    /**
     * @distinct 
     */
    exempt_roles?: (Array<Snowflake> | null);
    /**
     * @distinct 
     */
    exempt_channels?: (Array<Snowflake> | null);
    trigger_metadata: SpamLinkTriggerMetadataResponse;
}
export interface SpamLinkTriggerMetadataResponse {

}
export interface StageInstanceResponse {
    guild_id: Snowflake;
    channel_id: Snowflake;
    topic: string;
    privacy_level: StageInstancesPrivacyLevel;
    id: Snowflake;
    discoverable_disabled?: (boolean | null);
    guild_scheduled_event_id?: (Snowflake | null);
}
export type StageInstancesPrivacyLevel = typeof StageInstancesPrivacyLevel[keyof typeof StageInstancesPrivacyLevel];
export const StageInstancesPrivacyLevel = {
    /**
     * The Stage instance is visible publicly. (deprecated)
     */
    PUBLIC: 1,
    /**
     * The Stage instance is visible publicly. (deprecated)
     */
    GUILD_ONLY: 2
} as const;
Object.freeze(StageInstancesPrivacyLevel);
export interface StageScheduledEventCreateRequest {
    /**
     * @maxLength 100
     */
    name: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    entity_type: typeof GuildScheduledEventEntityType["STAGE_INSTANCE"];
    channel_id?: (Snowflake | null);
    entity_metadata?: (null | EntityMetadataStageInstance);
}
export interface StageScheduledEventPatchRequestPartial {
    status?: (null | GuildScheduledEventStatus);
    /**
     * @maxLength 100
     */
    name?: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time?: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    entity_type?: (null | typeof GuildScheduledEventEntityType["STAGE_INSTANCE"]);
    privacy_level?: GuildScheduledEventPrivacyLevel;
    channel_id?: (Snowflake | null);
    entity_metadata?: (null | EntityMetadataStageInstance);
}
export interface StageScheduledEventResponse {
    id: Snowflake;
    guild_id: Snowflake;
    name: string;
    description?: (string | null);
    channel_id?: (Snowflake | null);
    creator_id?: (Snowflake | null);
    creator?: (null | UserResponse);
    image?: (string | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    status: GuildScheduledEventStatus;
    entity_type: typeof GuildScheduledEventEntityType["STAGE_INSTANCE"];
    entity_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_count?: (Int32 | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    user_rsvp?: (null | ScheduledEventUserResponse);
    entity_metadata?: (null | EntityMetadataStageInstanceResponse);
}
export interface StandardStickerResponse {
    id: Snowflake;
    name: string;
    tags: string;
    type: typeof StickerType["STANDARD"];
    format_type?: (null | StickerFormatType);
    description?: (string | null);
    pack_id: Snowflake;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    sort_value: Int32;
}
export type StickerFormatType = typeof StickerFormatType[keyof typeof StickerFormatType];
export const StickerFormatType = {
    PNG: 1,
    APNG: 2,
    LOTTIE: 3,
    GIF: 4
} as const;
Object.freeze(StickerFormatType);
export interface StickerPackCollectionResponse {
    sticker_packs: Array<StickerPackResponse>;
}
export interface StickerPackResponse {
    id: Snowflake;
    sku_id: Snowflake;
    name: string;
    description?: (string | null);
    stickers: Array<StandardStickerResponse>;
    cover_sticker_id?: (Snowflake | null);
    banner_asset_id?: (Snowflake | null);
}
export type StickerType = typeof StickerType[keyof typeof StickerType];
export const StickerType = {
    /**
     * an official sticker in a pack, part of Nitro or in a removed purchasable pack
     */
    STANDARD: 1,
    /**
     * a sticker uploaded to a guild for the guild's members
     */
    GUILD: 2
} as const;
Object.freeze(StickerType);
export interface StringSelect {
    type: typeof MessageComponentType["STRING_SELECT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 150
     */
    placeholder?: (string | null);
    /**
     * @maximum 25
     * @minimum 0
     */
    min_values?: (number | null);
    /**
     * @maximum 25
     * @minimum 1
     */
    max_values?: (number | null);
    disabled?: (boolean | null);
    /**
     * @maxItems 25
     * @minItems 1
     */
    options: Array<SelectOption>;
}
export interface TeamMemberResponse {
    user: UserResponse;
    team_id: Snowflake;
    membership_state: TeamMembershipState;
}
export type TeamMembershipState = typeof TeamMembershipState[keyof typeof TeamMembershipState];
export const TeamMembershipState = {
    /**
     * User has been invited to the team.
     */
    INVITED: 1,
    /**
     * User has accepted the team invitation.
     */
    ACCEPTED: 2
} as const;
Object.freeze(TeamMembershipState);
export interface TeamResponse {
    id: Snowflake;
    icon?: (string | null);
    name: string;
    owner_user_id: Snowflake;
    members: Array<TeamMemberResponse>;
}
export type TextStyleType = typeof TextStyleType[keyof typeof TextStyleType];
export const TextStyleType = {
    /**
     * Single-line input
     */
    SHORT: 1,
    /**
     * Multi-line input
     */
    PARAGRAPH: 2
} as const;
Object.freeze(TextStyleType);
export type ThreadAutoArchiveDuration = typeof ThreadAutoArchiveDuration[keyof typeof ThreadAutoArchiveDuration];
export const ThreadAutoArchiveDuration = {
    /**
     * One hour
     */
    ONE_HOUR: 60,
    /**
     * One day
     */
    ONE_DAY: 1440,
    /**
     * Three days
     */
    THREE_DAY: 4320,
    /**
     * Seven days
     */
    SEVEN_DAY: 10080
} as const;
Object.freeze(ThreadAutoArchiveDuration);
export interface ThreadMemberResponse {
    id: Snowflake;
    user_id: Snowflake;
    join_timestamp: ISO8601DateTime;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    member?: (null | GuildMemberResponse);
}
export interface ThreadMetadataResponse {
    archived: boolean;
    archive_timestamp?: (ISO8601DateTime | null);
    auto_archive_duration: ThreadAutoArchiveDuration;
    locked: boolean;
    create_timestamp?: (ISO8601DateTime | null);
    invitable?: (boolean | null);
}
export interface ThreadResponse {
    id: Snowflake;
    type: (typeof ChannelType["ANNOUNCEMENT_THREAD"] | typeof ChannelType["PUBLIC_THREAD"] | typeof ChannelType["PRIVATE_THREAD"]);
    last_message_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    flags: Int32;
    last_pin_timestamp?: (ISO8601DateTime | null);
    guild_id: Snowflake;
    name: string;
    parent_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    rate_limit_per_user?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    bitrate?: (Int32 | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_limit?: (Int32 | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    permissions?: (string | null);
    owner_id: Snowflake;
    thread_metadata?: (null | ThreadMetadataResponse);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    message_count: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    member_count: Int32;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    total_message_sent: Int32;
    applied_tags?: (Array<Snowflake> | null);
    member?: (null | ThreadMemberResponse);
}
export type ThreadSortOrder = typeof ThreadSortOrder[keyof typeof ThreadSortOrder];
export const ThreadSortOrder = {
    /**
     * Sort forum posts by activity
     */
    LATEST_ACTIVITY: 0,
    /**
     * Sort forum posts by creation time (from most recent to oldest)
     */
    CREATION_DATE: 1
} as const;
Object.freeze(ThreadSortOrder);
export interface ThreadsResponse {
    threads: Array<ThreadResponse>;
    members: Array<ThreadMemberResponse>;
    has_more?: (boolean | null);
}
export interface TypingIndicatorResponse {

}
export interface UpdateDefaultReactionEmojiRequest {
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 100
     */
    emoji_name?: (string | null);
}
export interface UpdateGuildChannelRequestPartial {
    type?: (null | (typeof ChannelType["GUILD_TEXT"] | typeof ChannelType["GUILD_VOICE"] | typeof ChannelType["GUILD_CATEGORY"] | typeof ChannelType["GUILD_ANNOUNCEMENT"] | typeof ChannelType["GUILD_STAGE_VOICE"] | typeof ChannelType["GUILD_DIRECTORY"] | typeof ChannelType["GUILD_FORUM"]));
    /**
     * @maxLength 100
     * @minLength 1
     */
    name?: string;
    /**
     * @maximum 2147483647
     * @minimum 0
     */
    position?: (Int32 | null);
    /**
     * @maxLength 4096
     * @minLength 0
     */
    topic?: (string | null);
    /**
     * @minimum 8000
     */
    bitrate?: (number | null);
    /**
     * @minimum 0
     */
    user_limit?: (number | null);
    nsfw?: (boolean | null);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    parent_id?: (Snowflake | null);
    /**
     * @maxItems 100
     */
    permission_overwrites?: (Array<ChannelPermissionOverwriteRequest> | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
    default_auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    default_reaction_emoji?: (null | UpdateDefaultReactionEmojiRequest);
    /**
     * @maximum 21600
     * @minimum 0
     */
    default_thread_rate_limit_per_user?: (number | null);
    default_sort_order?: (null | ThreadSortOrder);
    default_forum_layout?: (null | ForumLayout);
    flags?: (number | null);
    /**
     * @maxItems 20
     */
    available_tags?: (Array<(null | UpdateThreadTagRequest)> | null);
}
export interface UpdateGuildOnboardingRequest {
    /**
     * @maxItems 15
     */
    prompts?: (Array<UpdateOnboardingPromptRequest> | null);
    enabled?: (boolean | null);
    /**
     * @maxItems 500
     * @distinct 
     */
    default_channel_ids?: (Array<Snowflake> | null);
    mode?: (null | GuildOnboardingMode);
}
export interface UpdateMessageInteractionCallbackRequest {
    type: (typeof InteractionCallbackType["DEFERRED_UPDATE_MESSAGE"] | typeof InteractionCallbackType["UPDATE_MESSAGE"]);
    data?: (null | IncomingWebhookUpdateForInteractionCallbackRequestPartial);
}
export interface UpdateOnboardingPromptRequest {
    /**
     * @maxLength 100
     * @minLength 1
     */
    title: string;
    /**
     * @maxItems 50
     * @minItems 1
     */
    options: Array<OnboardingPromptOptionRequest>;
    single_select?: (boolean | null);
    required?: (boolean | null);
    in_onboarding?: (boolean | null);
    type?: (null | OnboardingPromptType);
    id: Snowflake;
}
export interface UpdateThreadRequestPartial {
    /**
     * @maxLength 100
     * @minLength 0
     */
    name?: (string | null);
    archived?: (boolean | null);
    locked?: (boolean | null);
    invitable?: (boolean | null);
    auto_archive_duration?: (null | ThreadAutoArchiveDuration);
    /**
     * @maximum 21600
     * @minimum 0
     */
    rate_limit_per_user?: (number | null);
    flags?: (number | null);
    /**
     * @maxItems 5
     */
    applied_tags?: (Array<Snowflake> | null);
    /**
     * @minimum 8000
     */
    bitrate?: (number | null);
    /**
     * @maximum 99
     * @minimum 0
     */
    user_limit?: (number | null);
    rtc_region?: (string | null);
    video_quality_mode?: (null | VideoQualityMode);
}
export interface UpdateThreadTagRequest {
    /**
     * @maxLength 20
     * @minLength 0
     */
    name: string;
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 100
     */
    emoji_name?: (string | null);
    moderated?: (boolean | null);
    id?: (Snowflake | null);
}
export interface UserCommunicationDisabledAction {
    type: typeof AutomodActionType["USER_COMMUNICATION_DISABLED"];
    metadata: UserCommunicationDisabledActionMetadata;
}
export interface UserCommunicationDisabledActionMetadata {
    /**
     * @maximum 2419200
     * @minimum 0
     */
    duration_seconds: number;
}
export interface UserCommunicationDisabledActionMetadataResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    duration_seconds: Int32;
}
export interface UserCommunicationDisabledActionResponse {
    type: typeof AutomodActionType["USER_COMMUNICATION_DISABLED"];
    metadata: UserCommunicationDisabledActionMetadataResponse;
}
export interface UserGuildOnboardingResponse {
    guild_id: Snowflake;
    prompts: Array<OnboardingPromptResponse>;
    /**
     * @distinct 
     */
    default_channel_ids: Array<Snowflake>;
    enabled: boolean;
}
export type UserNotificationSetting = typeof UserNotificationSetting[keyof typeof UserNotificationSetting];
export const UserNotificationSetting = {
    /**
     * members will receive notifications for all messages by default
     */
    ALL_MESSAGES: 0,
    /**
     * members will receive notifications only for messages that \@mention them by default
     */
    ONLY_MENTIONS: 1
} as const;
Object.freeze(UserNotificationSetting);
export interface UserPIIResponse {
    id: Snowflake;
    username: string;
    avatar?: (string | null);
    discriminator: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    public_flags: Int32;
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    flags: number;
    bot?: (boolean | null);
    system?: (boolean | null);
    banner?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    accent_color?: (Int32 | null);
    mfa_enabled: boolean;
    locale: AvailableLocale;
    premium_type?: (null | PremiumType);
    email?: (string | null);
    verified?: (boolean | null);
}
export interface UserResponse {
    id: Snowflake;
    username: string;
    avatar?: (string | null);
    discriminator: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    public_flags: Int32;
    /**
     * @maximum 9007199254740991
     * @minimum -9007199254740991
     */
    flags: number;
    bot?: (boolean | null);
    system?: (boolean | null);
    banner?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    accent_color?: (Int32 | null);
}
export interface UserSelect {
    type: typeof MessageComponentType["USER_SELECT"];
    /**
     * @maxLength 100
     */
    custom_id: string;
    /**
     * @maxLength 150
     */
    placeholder?: (string | null);
    /**
     * @maximum 25
     * @minimum 0
     */
    min_values?: (number | null);
    /**
     * @maximum 25
     * @minimum 1
     */
    max_values?: (number | null);
    disabled?: (boolean | null);
}
export interface VanityURLErrorResponse {
    message: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    code: Int32;
}
export interface VanityURLResponse {
    code?: (string | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    uses: Int32;
    error?: (null | VanityURLErrorResponse);
}
export type VerificationLevel = typeof VerificationLevel[keyof typeof VerificationLevel];
export const VerificationLevel = {
    /**
     * unrestricted
     */
    NONE: 0,
    /**
     * must have verified email on account
     */
    LOW: 1,
    /**
     * must be registered on Discord for longer than 5 minutes
     */
    MEDIUM: 2,
    /**
     * must be a member of the server for longer than 10 minutes
     */
    HIGH: 3,
    /**
     * must have a verified phone number
     */
    VERY_HIGH: 4
} as const;
Object.freeze(VerificationLevel);
export type VideoQualityMode = typeof VideoQualityMode[keyof typeof VideoQualityMode];
export const VideoQualityMode = {
    /**
     * Discord chooses the quality for optimal performance
     */
    AUTO: 1,
    /**
     * 720p
     */
    FULL: 2
} as const;
Object.freeze(VideoQualityMode);
export interface VoiceRegionResponse {
    id: string;
    name: string;
    custom: boolean;
    deprecated: boolean;
    optimal: boolean;
}
export interface VoiceScheduledEventCreateRequest {
    /**
     * @maxLength 100
     */
    name: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    entity_type: typeof GuildScheduledEventEntityType["VOICE"];
    channel_id?: (Snowflake | null);
    entity_metadata?: (null | EntityMetadataVoice);
}
export interface VoiceScheduledEventPatchRequestPartial {
    status?: (null | GuildScheduledEventStatus);
    /**
     * @maxLength 100
     */
    name?: string;
    /**
     * @maxLength 1000
     */
    description?: (string | null);
    image?: (Base64String | null);
    scheduled_start_time?: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    entity_type?: (null | typeof GuildScheduledEventEntityType["VOICE"]);
    privacy_level?: GuildScheduledEventPrivacyLevel;
    channel_id?: (Snowflake | null);
    entity_metadata?: (null | EntityMetadataVoice);
}
export interface VoiceScheduledEventResponse {
    id: Snowflake;
    guild_id: Snowflake;
    name: string;
    description?: (string | null);
    channel_id?: (Snowflake | null);
    creator_id?: (Snowflake | null);
    creator?: (null | UserResponse);
    image?: (string | null);
    scheduled_start_time: ISO8601DateTime;
    scheduled_end_time?: (ISO8601DateTime | null);
    status: GuildScheduledEventStatus;
    entity_type: typeof GuildScheduledEventEntityType["VOICE"];
    entity_id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    user_count?: (Int32 | null);
    privacy_level: GuildScheduledEventPrivacyLevel;
    user_rsvp?: (null | ScheduledEventUserResponse);
    entity_metadata?: (null | EntityMetadataVoiceResponse);
}
export interface WebhookSlackEmbed {
    /**
     * @maxLength 152133
     */
    title?: (string | null);
    /**
     * @maxLength 2048
     */
    title_link?: (URIString | null);
    /**
     * @maxLength 152133
     */
    text?: (string | null);
    /**
     * @maxLength 7
     * @pattern /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/
     */
    color?: (string | null);
    ts?: (number | null);
    /**
     * @maxLength 152133
     */
    pretext?: (string | null);
    /**
     * @maxLength 152133
     */
    footer?: (string | null);
    /**
     * @maxLength 2048
     */
    footer_icon?: (URIString | null);
    /**
     * @maxLength 152133
     */
    author_name?: (string | null);
    /**
     * @maxLength 2048
     */
    author_link?: (URIString | null);
    /**
     * @maxLength 2048
     */
    author_icon?: (URIString | null);
    /**
     * @maxLength 2048
     */
    image_url?: (URIString | null);
    /**
     * @maxLength 2048
     */
    thumb_url?: (URIString | null);
    /**
     * @maxItems 1521
     */
    fields?: (Array<WebhookSlackEmbedField> | null);
}
export interface WebhookSlackEmbedField {
    /**
     * @maxLength 152133
     */
    name?: (string | null);
    /**
     * @maxLength 152133
     */
    value?: (string | null);
    inline?: (boolean | null);
}
export interface WebhookSourceChannelResponse {
    id: Snowflake;
    name: string;
}
export interface WebhookSourceGuildResponse {
    id: Snowflake;
    icon?: (string | null);
    name: string;
}
export type WebhookType = typeof WebhookType[keyof typeof WebhookType];
export const WebhookType = {
    /**
     * Incoming Webhooks can post messages to channels with a generated token
     */
    GUILD_INCOMING: 1,
    /**
     * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
     */
    CHANNEL_FOLLOWER: 2,
    /**
     * Application webhooks are webhooks used with Interactions
     */
    APPLICATION_INCOMING: 3
} as const;
Object.freeze(WebhookType);
export interface WelcomeMessageResponse {
    author_ids: Array<Snowflake>;
    message: string;
}
export interface WelcomeScreenPatchRequestPartial {
    /**
     * @maxLength 140
     */
    description?: (string | null);
    /**
     * @maxItems 5
     */
    welcome_channels?: (Array<GuildWelcomeChannel> | null);
    enabled?: (boolean | null);
}
export interface WidgetActivity {
    name: string;
}
export interface WidgetChannel {
    id: Snowflake;
    name: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position: Int32;
}
export type WidgetImageStyle = typeof WidgetImageStyle[keyof typeof WidgetImageStyle];
export const WidgetImageStyle = {
    /**
     * shield style widget with Discord icon and guild members online count
     */
    SHIELD: "shield",
    /**
     * large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget
     */
    BANNER1: "banner1",
    /**
     * smaller widget style with guild icon, name and online count. Split on the right with Discord logo
     */
    BANNER2: "banner2",
    /**
     * large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right
     */
    BANNER3: "banner3",
    /**
     * large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom
     */
    BANNER4: "banner4"
} as const;
Object.freeze(WidgetImageStyle);
export interface WidgetMember {
    id: string;
    username: string;
    discriminator: WidgetUserDiscriminator;
    avatar?: null;
    status: string;
    avatar_url: URIString;
    activity?: (null | WidgetActivity);
    deaf?: (boolean | null);
    mute?: (boolean | null);
    self_deaf?: (boolean | null);
    self_mute?: (boolean | null);
    suppress?: (boolean | null);
    channel_id?: (Snowflake | null);
}
export interface WidgetResponse {
    id: Snowflake;
    name: string;
    instant_invite?: (string | null);
    channels: Array<WidgetChannel>;
    members: Array<WidgetMember>;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    presence_count: Int32;
}
export interface WidgetSettingsResponse {
    enabled: boolean;
    channel_id?: (Snowflake | null);
}
export type WidgetUserDiscriminator = typeof WidgetUserDiscriminator[keyof typeof WidgetUserDiscriminator];
export const WidgetUserDiscriminator = {
    ZEROES: "0000"
} as const;
Object.freeze(WidgetUserDiscriminator);
/**
 * A single error, either for an API response or a specific field.
 */
export interface DiscordError {
    /**
     * Discord internal error code. See error code reference
     */
    code: number;
    /**
     * Human-readable error message
     */
    message: string;
}
export interface InnerErrors {
    /**
     * The list of errors for this field
     */
    _errors: Array<DiscordError>;
}
export type ErrorDetails = {
    [key: string]: ErrorDetails;
} | InnerErrors;
/**
 * Errors object returned by the Discord API
 */
export type ErrorResponse = DiscordError & {
    errors?: ErrorDetails;
};
export interface RateLimitError {
    code?: number;
    global: boolean;
    message: string;
    retry_after: number;
}
export interface GetMyOauth2ApplicationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListMyConnectionsResponseJSON = Array<ConnectedAccountResponse> | null;
export interface ListMyConnectionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateDmResponseJSON = PrivateChannelResponse | PrivateGroupChannelResponse;
export interface CreateDmRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListMyGuildsResponseJSON = Array<MyGuildResponse> | null;
export interface ListMyGuildsRequestQuery {
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
    with_counts?: (boolean | null);
}
export interface ListMyGuildsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetMyApplicationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateMyApplicationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetBotGatewayRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetMyOauth2AuthorizationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListVoiceRegionsResponseJSON = Array<VoiceRegionResponse> | null;
export interface ListVoiceRegionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetMyUserRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateMyUserRequestJSON = BotAccountPatchRequestPartial;
export interface UpdateMyUserRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateStageInstanceRequestJSON {
    /**
     * @maxLength 120
     * @minLength 1
     */
    topic: string;
    channel_id: Snowflake;
    privacy_level?: (null | StageInstancesPrivacyLevel);
    guild_scheduled_event_id?: (Snowflake | null);
    send_start_notification?: (boolean | null);
}
export interface CreateStageInstanceRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ListStickerPacksRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGatewayRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ListMyPrivateArchivedThreadsRequestQuery {
    before?: (Snowflake | null);
    limit?: (number | null);
}
export interface ListMyPrivateArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export interface ListMyPrivateArchivedThreadsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildApplicationCommandPermissionsResponseJSON = Array<CommandPermissionsResponse>;
export interface ListGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export interface ListGuildApplicationCommandPermissionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export interface GetGuildApplicationCommandPermissionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface SetGuildApplicationCommandPermissionsRequestJSON {
    /**
     * @maxItems 100
     */
    permissions?: (Array<ApplicationCommandPermission> | null);
}
export interface SetGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export interface SetGuildApplicationCommandPermissionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface AddMyMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export interface AddMyMessageReactionRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteMyMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export interface DeleteMyMessageReactionRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ListPrivateArchivedThreadsRequestQuery {
    before?: (ISO8601DateTime | null);
    limit?: (number | null);
}
export interface ListPrivateArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export interface ListPrivateArchivedThreadsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ListPublicArchivedThreadsRequestQuery {
    before?: (ISO8601DateTime | null);
    limit?: (number | null);
}
export interface ListPublicArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export interface ListPublicArchivedThreadsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetApplicationUserRoleConnectionRequestPath {
    application_id: Snowflake;
}
export interface GetApplicationUserRoleConnectionRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateApplicationUserRoleConnectionRequestJSON {
    /**
     * @maxLength 50
     */
    platform_name?: (string | null);
    /**
     * @maxLength 100
     */
    platform_username?: (string | null);
    /**
     * @maxProperties 5
     */
    metadata?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
}
export interface UpdateApplicationUserRoleConnectionRequestPath {
    application_id: Snowflake;
}
export interface UpdateApplicationUserRoleConnectionRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetMyGuildMemberRequestPath {
    guild_id: Snowflake;
}
export interface GetMyGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetApplicationRoleConnectionsMetadataResponseJSON = Array<ApplicationRoleConnectionsMetadataItemResponse> | null;
export interface GetApplicationRoleConnectionsMetadataRequestPath {
    application_id: Snowflake;
}
export interface GetApplicationRoleConnectionsMetadataRequestHeaders {
    "x-audit-log-reason"?: string;
}
/**
 * @maxItems 5
 */
export type UpdateApplicationRoleConnectionsMetadataRequestJSON = Array<ApplicationRoleConnectionsMetadataItemRequest> | null;
export type UpdateApplicationRoleConnectionsMetadataResponseJSON = Array<ApplicationRoleConnectionsMetadataItemResponse> | null;
export interface UpdateApplicationRoleConnectionsMetadataRequestPath {
    application_id: Snowflake;
}
export interface UpdateApplicationRoleConnectionsMetadataRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export interface GetGuildApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export interface DeleteGuildApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildApplicationCommandRequestJSON {
    /**
     * @maxLength 32
     * @minLength 1
     */
    name?: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
}
export interface UpdateGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export interface UpdateGuildApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export interface ListGuildApplicationCommandsRequestQuery {
    with_localizations?: (boolean | null);
}
export interface ListGuildApplicationCommandsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export interface ListGuildApplicationCommandsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type BulkSetGuildApplicationCommandsRequestJSON = Array<{
    id?: (Snowflake | null);
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}>;
export type BulkSetGuildApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export interface BulkSetGuildApplicationCommandsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export interface BulkSetGuildApplicationCommandsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildApplicationCommandRequestJSON {
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}
export interface CreateGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export interface CreateGuildApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface JoinThreadRequestPath {
    channel_id: Snowflake;
}
export interface JoinThreadRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface LeaveThreadRequestPath {
    channel_id: Snowflake;
}
export interface LeaveThreadRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface BulkDeleteMessagesRequestJSON {
    /**
     * @maxItems 1521
     * @distinct 
     */
    messages?: (Array<Snowflake> | null);
}
export interface BulkDeleteMessagesRequestPath {
    channel_id: Snowflake;
}
export interface BulkDeleteMessagesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteUserMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
    user_id: Snowflake;
}
export interface DeleteUserMessageReactionRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListMessageReactionsByEmojiResponseJSON = Array<UserResponse>;
export interface ListMessageReactionsByEmojiRequestQuery {
    after?: (Snowflake | null);
    limit?: (number | null);
}
export interface ListMessageReactionsByEmojiRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export interface ListMessageReactionsByEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteAllMessageReactionsByEmojiRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export interface DeleteAllMessageReactionsByEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteAllMessageReactionsRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface DeleteAllMessageReactionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CrosspostMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface CrosspostMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateThreadFromMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface CreateThreadFromMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface GetOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface GetOriginalWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface DeleteOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface DeleteOriginalWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateOriginalWebhookMessageRequestFormData = IncomingWebhookUpdateRequestPartial & {
    "files[0]"?: File;
    "files[1]"?: File;
    "files[2]"?: File;
    "files[3]"?: File;
    "files[4]"?: File;
    "files[5]"?: File;
    "files[6]"?: File;
    "files[7]"?: File;
    "files[8]"?: File;
    "files[9]"?: File;
};
export interface UpdateOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface UpdateOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface UpdateOriginalWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildScheduledEventUsersResponseJSON = Array<ScheduledEventUserResponse> | null;
export interface ListGuildScheduledEventUsersRequestQuery {
    with_member?: (boolean | null);
    limit?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
}
export interface ListGuildScheduledEventUsersRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export interface ListGuildScheduledEventUsersRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export interface GetAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export interface GetAutoModerationRuleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export interface DeleteAutoModerationRuleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateAutoModerationRuleRequestJSON = DefaultKeywordListUpsertRequestPartial | KeywordUpsertRequestPartial | MLSpamUpsertRequestPartial | MentionSpamUpsertRequestPartial;
export type UpdateAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export interface UpdateAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export interface UpdateAutoModerationRuleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListAutoModerationRulesResponseJSON = Array<(DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse | null)> | null;
export interface ListAutoModerationRulesRequestPath {
    guild_id: Snowflake;
}
export interface ListAutoModerationRulesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateAutoModerationRuleRequestJSON = DefaultKeywordListUpsertRequest | KeywordUpsertRequest | MLSpamUpsertRequest | MentionSpamUpsertRequest;
export type CreateAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export interface CreateAutoModerationRuleRequestPath {
    guild_id: Snowflake;
}
export interface CreateAutoModerationRuleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateSelfVoiceStateRequestJSON {
    request_to_speak_timestamp?: (ISO8601DateTime | null);
    suppress?: (boolean | null);
    channel_id?: (Snowflake | null);
}
export interface UpdateSelfVoiceStateRequestPath {
    guild_id: Snowflake;
}
export interface UpdateSelfVoiceStateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type SearchGuildMembersResponseJSON = Array<GuildMemberResponse>;
export interface SearchGuildMembersRequestQuery {
    limit: number;
    query: string;
}
export interface SearchGuildMembersRequestPath {
    guild_id: Snowflake;
}
export interface SearchGuildMembersRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetActiveGuildThreadsRequestPath {
    guild_id: Snowflake;
}
export interface GetActiveGuildThreadsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateMyGuildMemberRequestJSON {
    /**
     * @maxLength 32
     */
    nick?: (string | null);
}
export interface UpdateMyGuildMemberRequestPath {
    guild_id: Snowflake;
}
export interface UpdateMyGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface AddGuildMemberRoleRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    role_id: Snowflake;
}
export interface AddGuildMemberRoleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildMemberRoleRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    role_id: Snowflake;
}
export interface DeleteGuildMemberRoleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface LeaveGuildRequestPath {
    guild_id: Snowflake;
}
export interface LeaveGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export interface GetApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export interface DeleteApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateApplicationCommandRequestJSON {
    /**
     * @maxLength 32
     * @minLength 1
     */
    name?: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
}
export interface UpdateApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export interface UpdateApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export interface ListApplicationCommandsRequestQuery {
    with_localizations?: (boolean | null);
}
export interface ListApplicationCommandsRequestPath {
    application_id: Snowflake;
}
export interface ListApplicationCommandsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type BulkSetApplicationCommandsRequestJSON = Array<{
    id?: (Snowflake | null);
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}>;
export type BulkSetApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export interface BulkSetApplicationCommandsRequestPath {
    application_id: Snowflake;
}
export interface BulkSetApplicationCommandsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateApplicationCommandRequestJSON {
    /**
     * @maxLength 32
     * @minLength 1
     */
    name: string;
    /**
     * @maxProperties 33
     */
    name_localizations?: ({
        /**
         * @maxLength 32
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxLength 100
     */
    description?: (string | null);
    /**
     * @maxProperties 33
     */
    description_localizations?: ({
        /**
         * @maxLength 100
         * @minLength 1
         */
        [key: string]: string;
    } | null);
    /**
     * @maxItems 25
     */
    options?: (Array<(ApplicationCommandAttachmentOption | ApplicationCommandBooleanOption | ApplicationCommandChannelOption | ApplicationCommandIntegerOption | ApplicationCommandMentionableOption | ApplicationCommandNumberOption | ApplicationCommandRoleOption | ApplicationCommandStringOption | ApplicationCommandSubcommandGroupOption | ApplicationCommandSubcommandOption | ApplicationCommandUserOption)> | null);
    /**
     * @maximum 562949953421311
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}
export interface CreateApplicationCommandRequestPath {
    application_id: Snowflake;
}
export interface CreateApplicationCommandRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateInteractionResponseRequestJSON = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export type CreateInteractionResponseRequestURLEncoded = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export type CreateInteractionResponseRequestFormData = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export interface CreateInteractionResponseRequestPath {
    interaction_id: Snowflake;
    interaction_token: string;
}
export interface CreateInteractionResponseRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetThreadMemberRequestQuery {
    with_member?: (boolean | null);
}
export interface GetThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export interface GetThreadMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface AddThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export interface AddThreadMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export interface DeleteThreadMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListThreadMembersResponseJSON = Array<ThreadMemberResponse>;
export interface ListThreadMembersRequestQuery {
    with_member?: (boolean | null);
    limit?: (number | null);
    after?: (Snowflake | null);
}
export interface ListThreadMembersRequestPath {
    channel_id: Snowflake;
}
export interface ListThreadMembersRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface SetChannelPermissionOverwriteRequestJSON {
    type?: (null | ChannelPermissionOverwrite);
    allow?: (number | null);
    deny?: (number | null);
}
export interface SetChannelPermissionOverwriteRequestPath {
    channel_id: Snowflake;
    overwrite_id: Snowflake;
}
export interface SetChannelPermissionOverwriteRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteChannelPermissionOverwriteRequestPath {
    channel_id: Snowflake;
    overwrite_id: Snowflake;
}
export interface DeleteChannelPermissionOverwriteRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type AddGroupDmUserResponseJSON = PrivateChannelResponse | PrivateGroupChannelResponse;
export interface AddGroupDmUserRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export interface AddGroupDmUserRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGroupDmUserRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export interface DeleteGroupDmUserRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface FollowChannelRequestJSON {
    webhook_channel_id: Snowflake;
}
export interface FollowChannelRequestPath {
    channel_id: Snowflake;
}
export interface FollowChannelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface GetMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface DeleteMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateMessageRequestFormData = MessageEditRequestPartial & {
    "files[0]"?: File;
    "files[1]"?: File;
    "files[2]"?: File;
    "files[3]"?: File;
    "files[4]"?: File;
    "files[5]"?: File;
    "files[6]"?: File;
    "files[7]"?: File;
    "files[8]"?: File;
    "files[9]"?: File;
};
export interface UpdateMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface UpdateMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListMessagesResponseJSON = Array<MessageResponse> | null;
export interface ListMessagesRequestQuery {
    around?: (Snowflake | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
}
export interface ListMessagesRequestPath {
    channel_id: Snowflake;
}
export interface ListMessagesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateMessageRequestFormData = MessageCreateRequest & {
    "files[0]"?: File;
    "files[1]"?: File;
    "files[2]"?: File;
    "files[3]"?: File;
    "files[4]"?: File;
    "files[5]"?: File;
    "files[6]"?: File;
    "files[7]"?: File;
    "files[8]"?: File;
    "files[9]"?: File;
};
export interface CreateMessageRequestPath {
    channel_id: Snowflake;
}
export interface CreateMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListChannelWebhooksResponseJSON = Array<(ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)> | null;
export interface ListChannelWebhooksRequestPath {
    channel_id: Snowflake;
}
export interface ListChannelWebhooksRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateWebhookRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name: string;
    avatar?: (Base64String | null);
}
export interface CreateWebhookRequestPath {
    channel_id: Snowflake;
}
export interface CreateWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListChannelInvitesResponseJSON = Array<(FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse)> | null;
export interface ListChannelInvitesRequestPath {
    channel_id: Snowflake;
}
export interface ListChannelInvitesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateChannelInviteRequestJSON = CreateGroupDMInviteRequest | CreateGuildInviteRequest;
export type CreateChannelInviteResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export interface CreateChannelInviteRequestPath {
    channel_id: Snowflake;
}
export interface CreateChannelInviteRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateThreadRequestJSON = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export type CreateThreadRequestURLEncoded = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export type CreateThreadRequestFormData = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export interface CreateThreadRequestPath {
    channel_id: Snowflake;
}
export interface CreateThreadRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface TriggerTypingIndicatorRequestPath {
    channel_id: Snowflake;
}
export interface TriggerTypingIndicatorRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface PinMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface PinMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UnpinMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export interface UnpinMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListPinnedMessagesResponseJSON = Array<MessageResponse> | null;
export interface ListPinnedMessagesRequestPath {
    channel_id: Snowflake;
}
export interface ListPinnedMessagesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface GetWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export interface GetWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface DeleteWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export interface DeleteWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateWebhookMessageRequestFormData = IncomingWebhookUpdateRequestPartial & {
    "files[0]"?: File;
    "files[1]"?: File;
    "files[2]"?: File;
    "files[3]"?: File;
    "files[4]"?: File;
    "files[5]"?: File;
    "files[6]"?: File;
    "files[7]"?: File;
    "files[8]"?: File;
    "files[9]"?: File;
};
export interface UpdateWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export interface UpdateWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export interface UpdateWebhookMessageRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ExecuteGithubCompatibleWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export interface ExecuteGithubCompatibleWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface ExecuteGithubCompatibleWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ExecuteSlackCompatibleWebhookResponseJSON = string | null;
export interface ExecuteSlackCompatibleWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export interface ExecuteSlackCompatibleWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface ExecuteSlackCompatibleWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildTemplateRequestPath {
    code: string;
}
export interface GetGuildTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildFromTemplateRequestJSON {
    /**
     * @maxLength 100
     * @minLength 2
     */
    name: string;
    icon?: (Base64String | null);
}
export interface CreateGuildFromTemplateRequestPath {
    code: string;
}
export interface CreateGuildFromTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildNewMemberWelcomeRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildNewMemberWelcomeRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export interface GetGuildScheduledEventRequestQuery {
    with_user_count?: (boolean | null);
}
export interface GetGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export interface GetGuildScheduledEventRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export interface DeleteGuildScheduledEventRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateGuildScheduledEventRequestJSON = ExternalScheduledEventPatchRequestPartial | StageScheduledEventPatchRequestPartial | VoiceScheduledEventPatchRequestPartial;
export type UpdateGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export interface UpdateGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export interface UpdateGuildScheduledEventRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildScheduledEventsResponseJSON = Array<(ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse)> | null;
export interface ListGuildScheduledEventsRequestQuery {
    with_user_count?: (boolean | null);
}
export interface ListGuildScheduledEventsRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildScheduledEventsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type CreateGuildScheduledEventRequestJSON = ExternalScheduledEventCreateRequest | StageScheduledEventCreateRequest | VoiceScheduledEventCreateRequest;
export type CreateGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export interface CreateGuildScheduledEventRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildScheduledEventRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildWelcomeScreenRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildWelcomeScreenRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildWelcomeScreenRequestPath {
    guild_id: Snowflake;
}
export interface UpdateGuildWelcomeScreenRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateVoiceStateRequestJSON {
    suppress?: (boolean | null);
    channel_id?: (Snowflake | null);
}
export interface UpdateVoiceStateRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface UpdateVoiceStateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildIntegrationRequestPath {
    guild_id: Snowflake;
    integration_id: Snowflake;
}
export interface DeleteGuildIntegrationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildIntegrationsResponseJSON = Array<(DiscordIntegrationResponse | ExternalConnectionIntegrationResponse | GuildSubscriptionIntegrationResponse)> | null;
export interface ListGuildIntegrationsRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildIntegrationsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildWidgetRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildWidgetRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildsOnboardingRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildsOnboardingRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface PutGuildsOnboardingRequestPath {
    guild_id: Snowflake;
}
export interface PutGuildsOnboardingRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildVanityUrlRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildVanityUrlRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface ListGuildAuditLogEntriesRequestQuery {
    user_id?: (Snowflake | null);
    action_type?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
}
export interface ListGuildAuditLogEntriesRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildAuditLogEntriesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildWidgetPngRequestQuery {
    style?: (null | WidgetImageStyle);
}
export interface GetGuildWidgetPngRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildWidgetPngRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface SyncGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export interface SyncGuildTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export interface DeleteGuildTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildTemplateRequestJSON {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name?: string;
    /**
     * @maxLength 120
     */
    description?: (string | null);
}
export interface UpdateGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export interface UpdateGuildTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildTemplatesResponseJSON = Array<GuildTemplateResponse> | null;
export interface ListGuildTemplatesRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildTemplatesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildTemplateRequestJSON {
    /**
     * @maxLength 100
     * @minLength 1
     */
    name: string;
    /**
     * @maxLength 120
     */
    description?: (string | null);
}
export interface CreateGuildTemplateRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildTemplateRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export interface GetGuildStickerRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export interface DeleteGuildStickerRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildStickerRequestJSON {
    /**
     * @maxLength 30
     * @minLength 2
     */
    name?: string;
    /**
     * @maxLength 200
     * @minLength 1
     */
    tags?: string;
    /**
     * @maxLength 100
     */
    description?: (string | null);
}
export interface UpdateGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export interface UpdateGuildStickerRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildChannelsResponseJSON = Array<(GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse | null)> | null;
export interface ListGuildChannelsRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildChannelsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildChannelRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildChannelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type BulkUpdateGuildChannelsRequestJSON = Array<{
    id?: Snowflake;
    /**
     * @maximum 2147483647
     * @minimum 0
     */
    position?: (Int32 | null);
    parent_id?: (Snowflake | null);
    lock_permissions?: (boolean | null);
}>;
export interface BulkUpdateGuildChannelsRequestPath {
    guild_id: Snowflake;
}
export interface BulkUpdateGuildChannelsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildStickersResponseJSON = Array<GuildStickerResponse>;
export interface ListGuildStickersRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildStickersRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildStickerRequestFormData {
    /**
     * @maxLength 30
     * @minLength 2
     */
    name: string;
    /**
     * @maxLength 200
     * @minLength 1
     */
    tags: string;
    /**
     * @maxLength 100
     */
    description?: (string | null);
    file: File;
}
export interface CreateGuildStickerRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildStickerRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetGuildWebhooksResponseJSON = Array<(ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)> | null;
export interface GetGuildWebhooksRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildWebhooksRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface GetGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface AddGuildMemberRequestJSON {
    /**
     * @maxLength 32
     */
    nick?: (string | null);
    /**
     * @maxItems 1521
     * @distinct 
     */
    roles?: (Array<(Snowflake | null)> | null);
    mute?: (boolean | null);
    deaf?: (boolean | null);
    /**
     * @maxLength 152133
     */
    access_token: string;
    flags?: (number | null);
}
export interface AddGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface AddGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface DeleteGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildMemberRequestJSON {
    /**
     * @maxLength 32
     */
    nick?: (string | null);
    /**
     * @maxItems 1521
     * @distinct 
     */
    roles?: (Array<(Snowflake | null)> | null);
    mute?: (boolean | null);
    deaf?: (boolean | null);
    channel_id?: (Snowflake | null);
    communication_disabled_until?: (ISO8601DateTime | null);
    flags?: (number | null);
}
export interface UpdateGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface UpdateGuildMemberRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildMembersResponseJSON = Array<GuildMemberResponse>;
export interface ListGuildMembersRequestQuery {
    limit?: (number | null);
    after?: (number | null);
}
export interface ListGuildMembersRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildMembersRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildPreviewRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildPreviewRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildInvitesResponseJSON = Array<(FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse)> | null;
export interface ListGuildInvitesRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildInvitesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildVoiceRegionsResponseJSON = Array<VoiceRegionResponse> | null;
export interface ListGuildVoiceRegionsRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildVoiceRegionsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export interface GetGuildEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export interface DeleteGuildEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildEmojiRequestJSON {
    /**
     * @maxLength 32
     * @minLength 2
     */
    name?: string;
    /**
     * @maxItems 1521
     * @distinct 
     */
    roles?: (Array<(Snowflake | null)> | null);
}
export interface UpdateGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export interface UpdateGuildEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildEmojisResponseJSON = Array<EmojiResponse> | null;
export interface ListGuildEmojisRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildEmojisRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildEmojiRequestJSON {
    /**
     * @maxLength 32
     * @minLength 2
     */
    name: string;
    image: Base64String;
    /**
     * @maxItems 1521
     * @distinct 
     */
    roles?: (Array<(Snowflake | null)> | null);
}
export interface CreateGuildEmojiRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildEmojiRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildWidgetSettingsRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildWidgetSettingsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildWidgetSettingsRequestJSON {
    channel_id?: (Snowflake | null);
    enabled?: (boolean | null);
}
export interface UpdateGuildWidgetSettingsRequestPath {
    guild_id: Snowflake;
}
export interface UpdateGuildWidgetSettingsRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildRoleRequestPath {
    guild_id: Snowflake;
    role_id: Snowflake;
}
export interface DeleteGuildRoleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildRoleRequestJSON {
    /**
     * @maxLength 100
     */
    name?: (string | null);
    permissions?: (number | null);
    /**
     * @maximum 16777215
     * @minimum 0
     */
    color?: (number | null);
    hoist?: (boolean | null);
    mentionable?: (boolean | null);
    icon?: (Base64String | null);
    /**
     * @maxLength 100
     */
    unicode_emoji?: (string | null);
}
export interface UpdateGuildRoleRequestPath {
    guild_id: Snowflake;
    role_id: Snowflake;
}
export interface UpdateGuildRoleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildRolesResponseJSON = Array<GuildRoleResponse>;
export interface ListGuildRolesRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildRolesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface CreateGuildRoleRequestPath {
    guild_id: Snowflake;
}
export interface CreateGuildRoleRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type BulkUpdateGuildRolesRequestJSON = Array<{
    id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position?: (Int32 | null);
}>;
export type BulkUpdateGuildRolesResponseJSON = Array<GuildRoleResponse>;
export interface BulkUpdateGuildRolesRequestPath {
    guild_id: Snowflake;
}
export interface BulkUpdateGuildRolesRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface PreviewPruneGuildRequestPath {
    guild_id: Snowflake;
}
export interface PreviewPruneGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface PruneGuildRequestPath {
    guild_id: Snowflake;
}
export interface PruneGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildBanRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface GetGuildBanRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface BanUserFromGuildRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface BanUserFromGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UnbanUserFromGuildRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export interface UnbanUserFromGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ListGuildBansResponseJSON = Array<GuildBanResponse> | null;
export interface ListGuildBansRequestQuery {
    limit?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
}
export interface ListGuildBansRequestPath {
    guild_id: Snowflake;
}
export interface ListGuildBansRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface SetGuildMfaLevelRequestJSON {
    level: GuildMFALevel;
}
export interface SetGuildMfaLevelRequestPath {
    guild_id: Snowflake;
}
export interface SetGuildMfaLevelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetStageInstanceRequestPath {
    channel_id: Snowflake;
}
export interface GetStageInstanceRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteStageInstanceRequestPath {
    channel_id: Snowflake;
}
export interface DeleteStageInstanceRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateStageInstanceRequestJSON {
    /**
     * @maxLength 120
     * @minLength 1
     */
    topic?: string;
    privacy_level?: StageInstancesPrivacyLevel;
}
export interface UpdateStageInstanceRequestPath {
    channel_id: Snowflake;
}
export interface UpdateStageInstanceRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetApplicationRequestPath {
    application_id: Snowflake;
}
export interface GetApplicationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateApplicationRequestPath {
    application_id: Snowflake;
}
export interface UpdateApplicationRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetWebhookByTokenResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export interface GetWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface GetWebhookByTokenRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type ExecuteWebhookRequestJSON = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export type ExecuteWebhookRequestURLEncoded = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export type ExecuteWebhookRequestFormData = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export interface ExecuteWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export interface ExecuteWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface ExecuteWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface DeleteWebhookByTokenRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateWebhookByTokenRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name?: string;
    avatar?: (Base64String | null);
}
export type UpdateWebhookByTokenResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export interface UpdateWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export interface UpdateWebhookByTokenRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export interface GetChannelRequestPath {
    channel_id: Snowflake;
}
export interface GetChannelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type DeleteChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export interface DeleteChannelRequestPath {
    channel_id: Snowflake;
}
export interface DeleteChannelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type UpdateChannelRequestJSON = PrivateChannelRequestPartial | UpdateGuildChannelRequestPartial | UpdateThreadRequestPartial;
export type UpdateChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export interface UpdateChannelRequestPath {
    channel_id: Snowflake;
}
export interface UpdateChannelRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetStickerResponseJSON = GuildStickerResponse | StandardStickerResponse;
export interface GetStickerRequestPath {
    sticker_id: Snowflake;
}
export interface GetStickerRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type GetWebhookResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export interface GetWebhookRequestPath {
    webhook_id: Snowflake;
}
export interface GetWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteWebhookRequestPath {
    webhook_id: Snowflake;
}
export interface DeleteWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateWebhookRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name?: string;
    avatar?: (Base64String | null);
    channel_id?: (Snowflake | null);
}
export type UpdateWebhookResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export interface UpdateWebhookRequestPath {
    webhook_id: Snowflake;
}
export interface UpdateWebhookRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type InviteResolveResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export interface InviteResolveRequestQuery {
    with_counts?: (boolean | null);
    guild_scheduled_event_id?: (Snowflake | null);
}
export interface InviteResolveRequestPath {
    code: string;
}
export interface InviteResolveRequestHeaders {
    "x-audit-log-reason"?: string;
}
export type InviteRevokeResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export interface InviteRevokeRequestPath {
    code: string;
}
export interface InviteRevokeRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetGuildRequestQuery {
    with_counts?: (boolean | null);
}
export interface GetGuildRequestPath {
    guild_id: Snowflake;
}
export interface GetGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface DeleteGuildRequestPath {
    guild_id: Snowflake;
}
export interface DeleteGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface UpdateGuildRequestPath {
    guild_id: Snowflake;
}
export interface UpdateGuildRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetUserRequestPath {
    user_id: Snowflake;
}
export interface GetUserRequestHeaders {
    "x-audit-log-reason"?: string;
}
export interface GetCustomEmojiRequestPath {
    emoji_id: Snowflake;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetGuildIconRequestPath {
    guild_id: Snowflake;
    guild_icon: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetGuildSplashRequestPath {
    guild_id: Snowflake;
    guild_splash: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetGuildDiscoverySplashRequestPath {
    guild_id: Snowflake;
    guild_discovery_splash: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetGuildBannerRequestPath {
    guild_id: Snowflake;
    guild_banner: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetUserBannerRequestPath {
    user_id: Snowflake;
    user_banner: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetDefaultUserAvatarRequestPath {
    index: string;
    format: "png";
}
export interface GetUserAvatarRequestPath {
    user_id: Snowflake;
    user_avatar: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetGuildMemberAvatarRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    member_avatar: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
export interface GetUserAvatarDecorationRequestPath {
    user_id: Snowflake;
    user_avatar_decoration: string;
    format: "png";
}
export interface GetApplicationIconRequestPath {
    application_id: Snowflake;
    icon: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetApplicationCoverRequestPath {
    application_id: Snowflake;
    cover_image: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetApplicationAssetRequestPath {
    application_id: Snowflake;
    asset_id: Snowflake;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetAchievementIconRequestPath {
    application_id: Snowflake;
    achievement_id: Snowflake;
    icon_hash: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetStorePageAssetRequestPath {
    application_id: Snowflake;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetStickerPackBannerRequestPath {
    sticker_pack_banner_asset_id: Snowflake;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetTeamIconRequestPath {
    team_id: Snowflake;
    team_icon: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetStickerRequestPath {
    sticker_id: Snowflake;
    format: ("png" | "json" | "gif");
}
export interface GetRoleIconRequestPath {
    role_id: Snowflake;
    role_icon: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetGuildScheduledEventCoverRequestPath {
    scheduled_event_id: Snowflake;
    scheduled_event_cover_image: string;
    format: ("png" | "jpg" | "jpeg" | "webp");
}
export interface GetGuildMemberBannerRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    member_banner: string;
    format: ("png" | "jpg" | "jpeg" | "webp" | "gif");
}
/**
 * @docs https://discord.com/developers/docs/reference#snowflakes
 */
export type Snowflake = `${bigint}`;
/**
 * @docs https://discord.com/developers/docs/reference#iso8601-datetime
 * @format yyyy-MM-dd'T'HH:mm:ss.SSSXXX
 */
export type ISO8601DateTime = string;
export type URIString = `${'http'|'ws'}${'s'|''}://${string}`;
export type UserMessageTag = `<@${'!'|''}${bigint}>`;
export type ChannelMessageTag = `<#${bigint}>`;
export type RoleMessageTag = `<@&${bigint}>`;
export type SlashCommandMessageTag = `</${string}:${bigint}>`;
export type CustomEmojiMessageTag = `<${'a'|''}:${string}:${bigint}>`;
export type TimestampMessageTag = `<t:${bigint}${''|`:${'t'|'T'|'d'|'D'|'f'|'F'|'R'}`}>`;
export type MessageTag = UserMessageTag | ChannelMessageTag | RoleMessageTag | SlashCommandMessageTag | CustomEmojiMessageTag | TimestampMessageTag;
export type Int32 = number;
export type Base64String = `data:image/${"jpeg"|"png"|"gif"};base64,${string}`;
export interface File {
    content: ArrayBufferView;
    name?: string;
    contentType?: string;
}
export type Int64 = number;