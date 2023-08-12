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
export const AccountResponseKeys = ["id","name"] as const satisfies ReadonlyArray<keyof AccountResponse>;
Object.freeze(AccountResponseKeys);
export interface AccountResponse {
    id: string;
    name?: (string | null);
}
export const ActionRowKeys = ["type","components"] as const satisfies ReadonlyArray<keyof ActionRow>;
Object.freeze(ActionRowKeys);
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
export const ApplicationCommandAttachmentOptionKeys = ["type","name","name_localizations","description","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandAttachmentOption>;
Object.freeze(ApplicationCommandAttachmentOptionKeys);
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
export const ApplicationCommandAttachmentOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandAttachmentOptionResponse>;
Object.freeze(ApplicationCommandAttachmentOptionResponseKeys);
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
export const ApplicationCommandAutocompleteCallbackRequestKeys = ["type","data"] as const satisfies ReadonlyArray<keyof ApplicationCommandAutocompleteCallbackRequest>;
Object.freeze(ApplicationCommandAutocompleteCallbackRequestKeys);
export interface ApplicationCommandAutocompleteCallbackRequest {
    type: typeof InteractionCallbackType["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"];
    data: (InteractionApplicationCommandAutocompleteCallbackIntegerData | InteractionApplicationCommandAutocompleteCallbackNumberData | InteractionApplicationCommandAutocompleteCallbackStringData);
}
export const ApplicationCommandBooleanOptionKeys = ["type","name","name_localizations","description","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandBooleanOption>;
Object.freeze(ApplicationCommandBooleanOptionKeys);
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
export const ApplicationCommandBooleanOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandBooleanOptionResponse>;
Object.freeze(ApplicationCommandBooleanOptionResponseKeys);
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
export const ApplicationCommandChannelOptionKeys = ["type","name","name_localizations","description","description_localizations","required","channel_types"] as const satisfies ReadonlyArray<keyof ApplicationCommandChannelOption>;
Object.freeze(ApplicationCommandChannelOptionKeys);
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
export const ApplicationCommandChannelOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","channel_types"] as const satisfies ReadonlyArray<keyof ApplicationCommandChannelOptionResponse>;
Object.freeze(ApplicationCommandChannelOptionResponseKeys);
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
export const ApplicationCommandIntegerOptionKeys = ["type","name","name_localizations","description","description_localizations","required","autocomplete","choices","min_value","max_value"] as const satisfies ReadonlyArray<keyof ApplicationCommandIntegerOption>;
Object.freeze(ApplicationCommandIntegerOptionKeys);
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
export const ApplicationCommandIntegerOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","autocomplete","choices","min_value","max_value"] as const satisfies ReadonlyArray<keyof ApplicationCommandIntegerOptionResponse>;
Object.freeze(ApplicationCommandIntegerOptionResponseKeys);
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
export const ApplicationCommandMentionableOptionKeys = ["type","name","name_localizations","description","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandMentionableOption>;
Object.freeze(ApplicationCommandMentionableOptionKeys);
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
export const ApplicationCommandMentionableOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandMentionableOptionResponse>;
Object.freeze(ApplicationCommandMentionableOptionResponseKeys);
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
export const ApplicationCommandNumberOptionKeys = ["type","name","name_localizations","description","description_localizations","required","autocomplete","choices","min_value","max_value"] as const satisfies ReadonlyArray<keyof ApplicationCommandNumberOption>;
Object.freeze(ApplicationCommandNumberOptionKeys);
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
export const ApplicationCommandNumberOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","autocomplete","choices","min_value","max_value"] as const satisfies ReadonlyArray<keyof ApplicationCommandNumberOptionResponse>;
Object.freeze(ApplicationCommandNumberOptionResponseKeys);
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
export const ApplicationCommandOptionIntegerChoiceKeys = ["name","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionIntegerChoice>;
Object.freeze(ApplicationCommandOptionIntegerChoiceKeys);
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
export const ApplicationCommandOptionIntegerChoiceResponseKeys = ["name","name_localized","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionIntegerChoiceResponse>;
Object.freeze(ApplicationCommandOptionIntegerChoiceResponseKeys);
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
export const ApplicationCommandOptionNumberChoiceKeys = ["name","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionNumberChoice>;
Object.freeze(ApplicationCommandOptionNumberChoiceKeys);
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
export const ApplicationCommandOptionNumberChoiceResponseKeys = ["name","name_localized","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionNumberChoiceResponse>;
Object.freeze(ApplicationCommandOptionNumberChoiceResponseKeys);
export interface ApplicationCommandOptionNumberChoiceResponse {
    name: string;
    name_localized?: (string | null);
    name_localizations?: ({
        [key: string]: string;
    } | null);
    value: number;
}
export const ApplicationCommandOptionStringChoiceKeys = ["name","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionStringChoice>;
Object.freeze(ApplicationCommandOptionStringChoiceKeys);
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
export const ApplicationCommandOptionStringChoiceResponseKeys = ["name","name_localized","name_localizations","value"] as const satisfies ReadonlyArray<keyof ApplicationCommandOptionStringChoiceResponse>;
Object.freeze(ApplicationCommandOptionStringChoiceResponseKeys);
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
export const ApplicationCommandPermissionKeys = ["id","type","permission"] as const satisfies ReadonlyArray<keyof ApplicationCommandPermission>;
Object.freeze(ApplicationCommandPermissionKeys);
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
export const ApplicationCommandResponseKeys = ["id","application_id","version","default_member_permissions","type","name","name_localized","name_localizations","description","description_localized","description_localizations","guild_id","dm_permission","options","nsfw"] as const satisfies ReadonlyArray<keyof ApplicationCommandResponse>;
Object.freeze(ApplicationCommandResponseKeys);
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
export const ApplicationCommandRoleOptionKeys = ["type","name","name_localizations","description","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandRoleOption>;
Object.freeze(ApplicationCommandRoleOptionKeys);
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
export const ApplicationCommandRoleOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandRoleOptionResponse>;
Object.freeze(ApplicationCommandRoleOptionResponseKeys);
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
export const ApplicationCommandStringOptionKeys = ["type","name","name_localizations","description","description_localizations","required","autocomplete","min_length","max_length","choices"] as const satisfies ReadonlyArray<keyof ApplicationCommandStringOption>;
Object.freeze(ApplicationCommandStringOptionKeys);
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
export const ApplicationCommandStringOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","autocomplete","choices","min_length","max_length"] as const satisfies ReadonlyArray<keyof ApplicationCommandStringOptionResponse>;
Object.freeze(ApplicationCommandStringOptionResponseKeys);
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
export const ApplicationCommandSubcommandGroupOptionKeys = ["type","name","name_localizations","description","description_localizations","required","options"] as const satisfies ReadonlyArray<keyof ApplicationCommandSubcommandGroupOption>;
Object.freeze(ApplicationCommandSubcommandGroupOptionKeys);
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
export const ApplicationCommandSubcommandGroupOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","options"] as const satisfies ReadonlyArray<keyof ApplicationCommandSubcommandGroupOptionResponse>;
Object.freeze(ApplicationCommandSubcommandGroupOptionResponseKeys);
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
export const ApplicationCommandSubcommandOptionKeys = ["type","name","name_localizations","description","description_localizations","required","options"] as const satisfies ReadonlyArray<keyof ApplicationCommandSubcommandOption>;
Object.freeze(ApplicationCommandSubcommandOptionKeys);
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
export const ApplicationCommandSubcommandOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required","options"] as const satisfies ReadonlyArray<keyof ApplicationCommandSubcommandOptionResponse>;
Object.freeze(ApplicationCommandSubcommandOptionResponseKeys);
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
export const ApplicationCommandUserOptionKeys = ["type","name","name_localizations","description","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandUserOption>;
Object.freeze(ApplicationCommandUserOptionKeys);
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
export const ApplicationCommandUserOptionResponseKeys = ["type","name","name_localized","name_localizations","description","description_localized","description_localizations","required"] as const satisfies ReadonlyArray<keyof ApplicationCommandUserOptionResponse>;
Object.freeze(ApplicationCommandUserOptionResponseKeys);
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
export const ApplicationFormPartialKeys = ["description","icon","cover_image","team_id","flags","interactions_endpoint_url","max_participants","type","tags","custom_install_url","install_params","role_connections_verification_url"] as const satisfies ReadonlyArray<keyof ApplicationFormPartial>;
Object.freeze(ApplicationFormPartialKeys);
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
export const ApplicationIncomingWebhookResponseKeys = ["application_id","avatar","channel_id","guild_id","id","name","type","user"] as const satisfies ReadonlyArray<keyof ApplicationIncomingWebhookResponse>;
Object.freeze(ApplicationIncomingWebhookResponseKeys);
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
export const ApplicationOAuth2ParamsKeys = ["scopes","permissions"] as const satisfies ReadonlyArray<keyof ApplicationOAuth2Params>;
Object.freeze(ApplicationOAuth2ParamsKeys);
export interface ApplicationOAuth2Params {
    /**
     * @minItems 1
     * @distinct 
     */
    scopes?: (Array<(typeof OAuth2Scope["APPLICATIONS_COMMANDS"] | typeof OAuth2Scope["BOT"])> | null);
    /**
     * @maximum 281474976710655
     * @minimum 0
     */
    permissions?: (number | null);
}
export const ApplicationOAuth2ParamsResponseKeys = ["scopes","permissions"] as const satisfies ReadonlyArray<keyof ApplicationOAuth2ParamsResponse>;
Object.freeze(ApplicationOAuth2ParamsResponseKeys);
export interface ApplicationOAuth2ParamsResponse {
    /**
     * @distinct 
     */
    scopes: Array<(typeof OAuth2Scope["APPLICATIONS_COMMANDS"] | typeof OAuth2Scope["BOT"])>;
    permissions: string;
}
export const ApplicationResponseKeys = ["id","name","icon","description","type","cover_image","primary_sku_id","bot","slug","guild_id","rpc_origins","bot_public","bot_require_code_grant","terms_of_service_url","privacy_policy_url","custom_install_url","install_params","verify_key","flags","max_participants","tags"] as const satisfies ReadonlyArray<keyof ApplicationResponse>;
Object.freeze(ApplicationResponseKeys);
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
export const ApplicationRoleConnectionsMetadataItemRequestKeys = ["type","key","name","name_localizations","description","description_localizations"] as const satisfies ReadonlyArray<keyof ApplicationRoleConnectionsMetadataItemRequest>;
Object.freeze(ApplicationRoleConnectionsMetadataItemRequestKeys);
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
export const ApplicationRoleConnectionsMetadataItemResponseKeys = ["type","key","name","name_localizations","description","description_localizations"] as const satisfies ReadonlyArray<keyof ApplicationRoleConnectionsMetadataItemResponse>;
Object.freeze(ApplicationRoleConnectionsMetadataItemResponseKeys);
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
export const ApplicationUserRoleConnectionResponseKeys = ["platform_name","platform_username","metadata"] as const satisfies ReadonlyArray<keyof ApplicationUserRoleConnectionResponse>;
Object.freeze(ApplicationUserRoleConnectionResponseKeys);
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
    HOME_SETTINGS_UPDATE: 191
} as const;
Object.freeze(AuditLogActionType);
export const AuditLogEntryResponseKeys = ["id","action_type","user_id","target_id","changes","options","reason"] as const satisfies ReadonlyArray<keyof AuditLogEntryResponse>;
Object.freeze(AuditLogEntryResponseKeys);
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
export const AuditLogObjectChangeResponseKeys = ["key","new_value","old_value"] as const satisfies ReadonlyArray<keyof AuditLogObjectChangeResponse>;
Object.freeze(AuditLogObjectChangeResponseKeys);
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
export const BaseCreateMessageCreateRequestKeys = ["content","embeds","allowed_mentions","sticker_ids","components","flags","attachments"] as const satisfies ReadonlyArray<keyof BaseCreateMessageCreateRequest>;
Object.freeze(BaseCreateMessageCreateRequestKeys);
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
export const BasicApplicationResponseKeys = ["id","name","icon","description","type","cover_image","primary_sku_id","bot"] as const satisfies ReadonlyArray<keyof BasicApplicationResponse>;
Object.freeze(BasicApplicationResponseKeys);
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
export const BasicMessageResponseKeys = ["id","type","content","channel_id","author","attachments","embeds","mentions","mention_roles","pinned","mention_everyone","tts","timestamp","edited_timestamp","flags","components","activity","application","application_id","interaction","nonce","webhook_id","message_reference","thread","mention_channels","stickers","sticker_items","role_subscription_data","position"] as const satisfies ReadonlyArray<keyof BasicMessageResponse>;
Object.freeze(BasicMessageResponseKeys);
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
export const BlockMessageActionKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof BlockMessageAction>;
Object.freeze(BlockMessageActionKeys);
export interface BlockMessageAction {
    type: typeof AutomodActionType["BLOCK_MESSAGE"];
    metadata?: (null | BlockMessageActionMetadata);
}
export const BlockMessageActionMetadataKeys = ["custom_message"] as const satisfies ReadonlyArray<keyof BlockMessageActionMetadata>;
Object.freeze(BlockMessageActionMetadataKeys);
export interface BlockMessageActionMetadata {
    /**
     * @maxLength 150
     */
    custom_message?: (string | null);
}
export const BlockMessageActionMetadataResponseKeys = ["custom_message"] as const satisfies ReadonlyArray<keyof BlockMessageActionMetadataResponse>;
Object.freeze(BlockMessageActionMetadataResponseKeys);
export interface BlockMessageActionMetadataResponse {
    custom_message?: (string | null);
}
export const BlockMessageActionResponseKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof BlockMessageActionResponse>;
Object.freeze(BlockMessageActionResponseKeys);
export interface BlockMessageActionResponse {
    type: typeof AutomodActionType["BLOCK_MESSAGE"];
    metadata: BlockMessageActionMetadataResponse;
}
export const BotAccountPatchRequestPartialKeys = ["username","avatar"] as const satisfies ReadonlyArray<keyof BotAccountPatchRequestPartial>;
Object.freeze(BotAccountPatchRequestPartialKeys);
export interface BotAccountPatchRequestPartial {
    /**
     * @maxLength 32
     * @minLength 2
     */
    username?: string;
    avatar?: (Base64String | null);
}
export const ButtonKeys = ["type","custom_id","style","label","disabled","emoji","url"] as const satisfies ReadonlyArray<keyof Button>;
Object.freeze(ButtonKeys);
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
export const ChannelFollowerResponseKeys = ["channel_id","webhook_id"] as const satisfies ReadonlyArray<keyof ChannelFollowerResponse>;
Object.freeze(ChannelFollowerResponseKeys);
export interface ChannelFollowerResponse {
    channel_id: Snowflake;
    webhook_id: Snowflake;
}
export const ChannelFollowerWebhookResponseKeys = ["application_id","avatar","channel_id","guild_id","id","name","type","user","source_guild","source_channel"] as const satisfies ReadonlyArray<keyof ChannelFollowerWebhookResponse>;
Object.freeze(ChannelFollowerWebhookResponseKeys);
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
export const ChannelPermissionOverwriteRequestKeys = ["id","type","allow","deny"] as const satisfies ReadonlyArray<keyof ChannelPermissionOverwriteRequest>;
Object.freeze(ChannelPermissionOverwriteRequestKeys);
export interface ChannelPermissionOverwriteRequest {
    id: Snowflake;
    type?: (null | ChannelPermissionOverwrite);
    allow?: (number | null);
    deny?: (number | null);
}
export const ChannelPermissionOverwriteResponseKeys = ["id","type","allow","deny"] as const satisfies ReadonlyArray<keyof ChannelPermissionOverwriteResponse>;
Object.freeze(ChannelPermissionOverwriteResponseKeys);
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
export const ChannelSelectKeys = ["type","custom_id","placeholder","min_values","max_values","disabled","channel_types"] as const satisfies ReadonlyArray<keyof ChannelSelect>;
Object.freeze(ChannelSelectKeys);
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
export const CommandPermissionResponseKeys = ["id","type","permission"] as const satisfies ReadonlyArray<keyof CommandPermissionResponse>;
Object.freeze(CommandPermissionResponseKeys);
export interface CommandPermissionResponse {
    id: Snowflake;
    type: ApplicationCommandPermissionType;
    permission: boolean;
}
export const CommandPermissionsResponseKeys = ["id","application_id","guild_id","permissions"] as const satisfies ReadonlyArray<keyof CommandPermissionsResponse>;
Object.freeze(CommandPermissionsResponseKeys);
export interface CommandPermissionsResponse {
    id: Snowflake;
    application_id: Snowflake;
    guild_id: Snowflake;
    permissions: Array<CommandPermissionResponse>;
}
export const ConnectedAccountGuildResponseKeys = ["id","name","icon"] as const satisfies ReadonlyArray<keyof ConnectedAccountGuildResponse>;
Object.freeze(ConnectedAccountGuildResponseKeys);
export interface ConnectedAccountGuildResponse {
    id: Snowflake;
    name: string;
    icon?: (string | null);
}
export const ConnectedAccountIntegrationResponseKeys = ["id","type","account","guild"] as const satisfies ReadonlyArray<keyof ConnectedAccountIntegrationResponse>;
Object.freeze(ConnectedAccountIntegrationResponseKeys);
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
export const ConnectedAccountResponseKeys = ["id","name","type","friend_sync","integrations","show_activity","two_way_link","verified","visibility","revoked"] as const satisfies ReadonlyArray<keyof ConnectedAccountResponse>;
Object.freeze(ConnectedAccountResponseKeys);
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
export const CreateForumThreadRequestKeys = ["name","auto_archive_duration","rate_limit_per_user","applied_tags","message"] as const satisfies ReadonlyArray<keyof CreateForumThreadRequest>;
Object.freeze(CreateForumThreadRequestKeys);
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
export const CreateGroupDMInviteRequestKeys = ["max_age"] as const satisfies ReadonlyArray<keyof CreateGroupDMInviteRequest>;
Object.freeze(CreateGroupDMInviteRequestKeys);
export interface CreateGroupDMInviteRequest {
    /**
     * @maximum 604800
     * @minimum 1
     */
    max_age?: (number | null);
}
export const CreateGuildChannelRequestKeys = ["type","name","position","topic","bitrate","user_limit","nsfw","rate_limit_per_user","parent_id","permission_overwrites","rtc_region","video_quality_mode","default_auto_archive_duration","default_reaction_emoji","default_sort_order","default_forum_layout","available_tags"] as const satisfies ReadonlyArray<keyof CreateGuildChannelRequest>;
Object.freeze(CreateGuildChannelRequestKeys);
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
export const CreateGuildInviteRequestKeys = ["max_age","temporary","max_uses","unique","target_user_id","target_application_id","target_type"] as const satisfies ReadonlyArray<keyof CreateGuildInviteRequest>;
Object.freeze(CreateGuildInviteRequestKeys);
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
export const CreateGuildRequestChannelItemKeys = ["type","name","position","topic","bitrate","user_limit","nsfw","rate_limit_per_user","parent_id","permission_overwrites","rtc_region","video_quality_mode","default_auto_archive_duration","default_reaction_emoji","default_thread_rate_limit_per_user","default_sort_order","default_forum_layout","id","available_tags"] as const satisfies ReadonlyArray<keyof CreateGuildRequestChannelItem>;
Object.freeze(CreateGuildRequestChannelItemKeys);
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
export const CreateGuildRequestRoleItemKeys = ["id","name","permissions","color","hoist","mentionable","unicode_emoji"] as const satisfies ReadonlyArray<keyof CreateGuildRequestRoleItem>;
Object.freeze(CreateGuildRequestRoleItemKeys);
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
export const CreateMessageInteractionCallbackRequestKeys = ["type","data"] as const satisfies ReadonlyArray<keyof CreateMessageInteractionCallbackRequest>;
Object.freeze(CreateMessageInteractionCallbackRequestKeys);
export interface CreateMessageInteractionCallbackRequest {
    type: (typeof InteractionCallbackType["CHANNEL_MESSAGE_WITH_SOURCE"] | typeof InteractionCallbackType["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"]);
    data?: (null | IncomingWebhookInteractionRequest);
}
export const CreateOrUpdateThreadTagRequestKeys = ["name","emoji_id","emoji_name","moderated"] as const satisfies ReadonlyArray<keyof CreateOrUpdateThreadTagRequest>;
Object.freeze(CreateOrUpdateThreadTagRequestKeys);
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
export const CreatePrivateChannelRequestKeys = ["recipient_id","access_tokens","nicks"] as const satisfies ReadonlyArray<keyof CreatePrivateChannelRequest>;
Object.freeze(CreatePrivateChannelRequestKeys);
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
export const CreateTextThreadWithMessageRequestKeys = ["name","auto_archive_duration","rate_limit_per_user"] as const satisfies ReadonlyArray<keyof CreateTextThreadWithMessageRequest>;
Object.freeze(CreateTextThreadWithMessageRequestKeys);
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
export const CreateTextThreadWithoutMessageRequestKeys = ["name","auto_archive_duration","rate_limit_per_user","type","invitable"] as const satisfies ReadonlyArray<keyof CreateTextThreadWithoutMessageRequest>;
Object.freeze(CreateTextThreadWithoutMessageRequestKeys);
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
export const CreatedThreadResponseKeys = ["id","type","last_message_id","flags","last_pin_timestamp","guild_id","name","parent_id","rate_limit_per_user","bitrate","user_limit","rtc_region","video_quality_mode","permissions","owner_id","thread_metadata","message_count","member_count","total_message_sent","applied_tags","member"] as const satisfies ReadonlyArray<keyof CreatedThreadResponse>;
Object.freeze(CreatedThreadResponseKeys);
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
export const DefaultKeywordListTriggerMetadataKeys = ["allow_list","presets"] as const satisfies ReadonlyArray<keyof DefaultKeywordListTriggerMetadata>;
Object.freeze(DefaultKeywordListTriggerMetadataKeys);
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
export const DefaultKeywordListTriggerMetadataResponseKeys = ["allow_list","presets"] as const satisfies ReadonlyArray<keyof DefaultKeywordListTriggerMetadataResponse>;
Object.freeze(DefaultKeywordListTriggerMetadataResponseKeys);
export interface DefaultKeywordListTriggerMetadataResponse {
    allow_list: Array<string>;
    /**
     * @distinct 
     */
    presets: Array<AutomodKeywordPresetType>;
}
export const DefaultKeywordListUpsertRequestKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof DefaultKeywordListUpsertRequest>;
Object.freeze(DefaultKeywordListUpsertRequestKeys);
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
export const DefaultKeywordListUpsertRequestPartialKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof DefaultKeywordListUpsertRequestPartial>;
Object.freeze(DefaultKeywordListUpsertRequestPartialKeys);
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
export const DefaultKeywordRuleResponseKeys = ["id","guild_id","creator_id","name","event_type","actions","trigger_type","enabled","exempt_roles","exempt_channels","trigger_metadata"] as const satisfies ReadonlyArray<keyof DefaultKeywordRuleResponse>;
Object.freeze(DefaultKeywordRuleResponseKeys);
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
export const DefaultReactionEmojiResponseKeys = ["emoji_id","emoji_name"] as const satisfies ReadonlyArray<keyof DefaultReactionEmojiResponse>;
Object.freeze(DefaultReactionEmojiResponseKeys);
export interface DefaultReactionEmojiResponse {
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export const DiscordIntegrationResponseKeys = ["type","name","account","enabled","id","application","scopes","user"] as const satisfies ReadonlyArray<keyof DiscordIntegrationResponse>;
Object.freeze(DiscordIntegrationResponseKeys);
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
export const EmojiKeys = ["id","name","animated"] as const satisfies ReadonlyArray<keyof Emoji>;
Object.freeze(EmojiKeys);
export interface Emoji {
    id?: (Snowflake | null);
    /**
     * @maxLength 32
     */
    name: string;
    animated?: (boolean | null);
}
export const EmojiResponseKeys = ["id","name","user","roles","require_colons","managed","animated","available"] as const satisfies ReadonlyArray<keyof EmojiResponse>;
Object.freeze(EmojiResponseKeys);
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
export const EntityMetadataExternalKeys = ["location"] as const satisfies ReadonlyArray<keyof EntityMetadataExternal>;
Object.freeze(EntityMetadataExternalKeys);
export interface EntityMetadataExternal {
    /**
     * @maxLength 100
     */
    location: string;
}
export const EntityMetadataExternalResponseKeys = ["location"] as const satisfies ReadonlyArray<keyof EntityMetadataExternalResponse>;
Object.freeze(EntityMetadataExternalResponseKeys);
export interface EntityMetadataExternalResponse {
    location: string;
}
export const EntityMetadataStageInstanceKeys = [] as const satisfies ReadonlyArray<keyof EntityMetadataStageInstance>;
Object.freeze(EntityMetadataStageInstanceKeys);
export interface EntityMetadataStageInstance {

}
export const EntityMetadataStageInstanceResponseKeys = [] as const satisfies ReadonlyArray<keyof EntityMetadataStageInstanceResponse>;
Object.freeze(EntityMetadataStageInstanceResponseKeys);
export interface EntityMetadataStageInstanceResponse {

}
export const EntityMetadataVoiceKeys = [] as const satisfies ReadonlyArray<keyof EntityMetadataVoice>;
Object.freeze(EntityMetadataVoiceKeys);
export interface EntityMetadataVoice {

}
export const EntityMetadataVoiceResponseKeys = [] as const satisfies ReadonlyArray<keyof EntityMetadataVoiceResponse>;
Object.freeze(EntityMetadataVoiceResponseKeys);
export interface EntityMetadataVoiceResponse {

}
export const ExternalConnectionIntegrationResponseKeys = ["type","name","account","enabled","id","user","revoked","expire_behavior","expire_grace_period","subscriber_count","synced_at","role_id","syncing","enable_emoticons"] as const satisfies ReadonlyArray<keyof ExternalConnectionIntegrationResponse>;
Object.freeze(ExternalConnectionIntegrationResponseKeys);
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
export const ExternalScheduledEventCreateRequestKeys = ["name","description","image","scheduled_start_time","scheduled_end_time","privacy_level","entity_type","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof ExternalScheduledEventCreateRequest>;
Object.freeze(ExternalScheduledEventCreateRequestKeys);
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
export const ExternalScheduledEventPatchRequestPartialKeys = ["status","name","description","image","scheduled_start_time","scheduled_end_time","entity_type","privacy_level","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof ExternalScheduledEventPatchRequestPartial>;
Object.freeze(ExternalScheduledEventPatchRequestPartialKeys);
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
export const ExternalScheduledEventResponseKeys = ["id","guild_id","name","description","channel_id","creator_id","creator","image","scheduled_start_time","scheduled_end_time","status","entity_type","entity_id","user_count","privacy_level","user_rsvp","entity_metadata"] as const satisfies ReadonlyArray<keyof ExternalScheduledEventResponse>;
Object.freeze(ExternalScheduledEventResponseKeys);
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
export const FlagToChannelActionKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof FlagToChannelAction>;
Object.freeze(FlagToChannelActionKeys);
export interface FlagToChannelAction {
    type: typeof AutomodActionType["FLAG_TO_CHANNEL"];
    metadata: FlagToChannelActionMetadata;
}
export const FlagToChannelActionMetadataKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof FlagToChannelActionMetadata>;
Object.freeze(FlagToChannelActionMetadataKeys);
export interface FlagToChannelActionMetadata {
    channel_id: Snowflake;
}
export const FlagToChannelActionMetadataResponseKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof FlagToChannelActionMetadataResponse>;
Object.freeze(FlagToChannelActionMetadataResponseKeys);
export interface FlagToChannelActionMetadataResponse {
    channel_id: Snowflake;
}
export const FlagToChannelActionResponseKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof FlagToChannelActionResponse>;
Object.freeze(FlagToChannelActionResponseKeys);
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
export const ForumTagResponseKeys = ["id","name","moderated","emoji_id","emoji_name"] as const satisfies ReadonlyArray<keyof ForumTagResponse>;
Object.freeze(ForumTagResponseKeys);
export interface ForumTagResponse {
    id: Snowflake;
    name: string;
    moderated: boolean;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export const FriendInviteResponseKeys = ["type","code","inviter","max_age","created_at","expires_at","channel","is_contact","friends_count","uses","max_uses","flags"] as const satisfies ReadonlyArray<keyof FriendInviteResponse>;
Object.freeze(FriendInviteResponseKeys);
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
export const GatewayBotResponseKeys = ["url","session_start_limit","shards"] as const satisfies ReadonlyArray<keyof GatewayBotResponse>;
Object.freeze(GatewayBotResponseKeys);
export interface GatewayBotResponse {
    url: URIString;
    session_start_limit: GatewayBotSessionStartLimitResponse;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    shards: Int32;
}
export const GatewayBotSessionStartLimitResponseKeys = ["max_concurrency","remaining","reset_after","total"] as const satisfies ReadonlyArray<keyof GatewayBotSessionStartLimitResponse>;
Object.freeze(GatewayBotSessionStartLimitResponseKeys);
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
export const GatewayResponseKeys = ["url"] as const satisfies ReadonlyArray<keyof GatewayResponse>;
Object.freeze(GatewayResponseKeys);
export interface GatewayResponse {
    url: URIString;
}
export const GithubAuthorKeys = ["username","name"] as const satisfies ReadonlyArray<keyof GithubAuthor>;
Object.freeze(GithubAuthorKeys);
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
export const GithubCheckAppKeys = ["name"] as const satisfies ReadonlyArray<keyof GithubCheckApp>;
Object.freeze(GithubCheckAppKeys);
export interface GithubCheckApp {
    /**
     * @maxLength 152133
     */
    name: string;
}
export const GithubCheckPullRequestKeys = ["number"] as const satisfies ReadonlyArray<keyof GithubCheckPullRequest>;
Object.freeze(GithubCheckPullRequestKeys);
export interface GithubCheckPullRequest {
    number: number;
}
export const GithubCheckRunKeys = ["conclusion","name","html_url","check_suite","details_url","output","pull_requests"] as const satisfies ReadonlyArray<keyof GithubCheckRun>;
Object.freeze(GithubCheckRunKeys);
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
export const GithubCheckRunOutputKeys = ["title","summary"] as const satisfies ReadonlyArray<keyof GithubCheckRunOutput>;
Object.freeze(GithubCheckRunOutputKeys);
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
export const GithubCheckSuiteKeys = ["conclusion","head_branch","head_sha","pull_requests","app"] as const satisfies ReadonlyArray<keyof GithubCheckSuite>;
Object.freeze(GithubCheckSuiteKeys);
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
export const GithubCommentKeys = ["id","html_url","user","commit_id","body"] as const satisfies ReadonlyArray<keyof GithubComment>;
Object.freeze(GithubCommentKeys);
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
export const GithubCommitKeys = ["id","url","message","author"] as const satisfies ReadonlyArray<keyof GithubCommit>;
Object.freeze(GithubCommitKeys);
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
export const GithubDiscussionKeys = ["title","number","html_url","answer_html_url","body","user"] as const satisfies ReadonlyArray<keyof GithubDiscussion>;
Object.freeze(GithubDiscussionKeys);
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
export const GithubIssueKeys = ["id","number","html_url","user","title","body","pull_request"] as const satisfies ReadonlyArray<keyof GithubIssue>;
Object.freeze(GithubIssueKeys);
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
export const GithubReleaseKeys = ["id","tag_name","html_url","author"] as const satisfies ReadonlyArray<keyof GithubRelease>;
Object.freeze(GithubReleaseKeys);
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
export const GithubRepositoryKeys = ["id","html_url","name","full_name"] as const satisfies ReadonlyArray<keyof GithubRepository>;
Object.freeze(GithubRepositoryKeys);
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
export const GithubReviewKeys = ["user","body","html_url","state"] as const satisfies ReadonlyArray<keyof GithubReview>;
Object.freeze(GithubReviewKeys);
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
export const GithubUserKeys = ["id","login","html_url","avatar_url"] as const satisfies ReadonlyArray<keyof GithubUser>;
Object.freeze(GithubUserKeys);
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
export const GithubWebhookKeys = ["action","ref","ref_type","comment","issue","pull_request","repository","forkee","sender","member","release","head_commit","commits","forced","compare","review","check_run","check_suite","discussion","answer"] as const satisfies ReadonlyArray<keyof GithubWebhook>;
Object.freeze(GithubWebhookKeys);
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
export const GroupDMInviteResponseKeys = ["type","code","inviter","max_age","created_at","expires_at","channel","approximate_member_count"] as const satisfies ReadonlyArray<keyof GroupDMInviteResponse>;
Object.freeze(GroupDMInviteResponseKeys);
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
export const GuildAuditLogResponseKeys = ["audit_log_entries","users","integrations","webhooks","guild_scheduled_events","threads","application_commands","auto_moderation_rules"] as const satisfies ReadonlyArray<keyof GuildAuditLogResponse>;
Object.freeze(GuildAuditLogResponseKeys);
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
export const GuildBanResponseKeys = ["user","reason"] as const satisfies ReadonlyArray<keyof GuildBanResponse>;
Object.freeze(GuildBanResponseKeys);
export interface GuildBanResponse {
    user: UserResponse;
    reason?: (string | null);
}
export const GuildChannelResponseKeys = ["id","type","last_message_id","flags","last_pin_timestamp","guild_id","name","parent_id","rate_limit_per_user","bitrate","user_limit","rtc_region","video_quality_mode","permissions","topic","default_auto_archive_duration","default_thread_rate_limit_per_user","position","permission_overwrites","nsfw","available_tags","default_reaction_emoji","default_sort_order","default_forum_layout"] as const satisfies ReadonlyArray<keyof GuildChannelResponse>;
Object.freeze(GuildChannelResponseKeys);
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
export const GuildCreateRequestKeys = ["name","description","region","icon","verification_level","default_message_notifications","explicit_content_filter","preferred_locale","afk_timeout","roles","channels","afk_channel_id","system_channel_id","system_channel_flags"] as const satisfies ReadonlyArray<keyof GuildCreateRequest>;
Object.freeze(GuildCreateRequestKeys);
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
export const GuildHomeSettingsResponseKeys = ["guild_id","enabled","welcome_message","new_member_actions","resource_channels"] as const satisfies ReadonlyArray<keyof GuildHomeSettingsResponse>;
Object.freeze(GuildHomeSettingsResponseKeys);
export interface GuildHomeSettingsResponse {
    guild_id: Snowflake;
    enabled: boolean;
    welcome_message?: (null | WelcomeMessageResponse);
    new_member_actions?: (Array<(null | NewMemberActionResponse)> | null);
    resource_channels?: (Array<(null | ResourceChannelResponse)> | null);
}
export const GuildIncomingWebhookResponseKeys = ["application_id","avatar","channel_id","guild_id","id","name","type","user","token","url"] as const satisfies ReadonlyArray<keyof GuildIncomingWebhookResponse>;
Object.freeze(GuildIncomingWebhookResponseKeys);
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
export const GuildInviteResponseKeys = ["type","code","inviter","max_age","created_at","expires_at","is_contact","flags","guild","guild_id","channel","stage_instance","target_type","target_user","target_application","guild_scheduled_event","uses","max_uses","temporary","approximate_member_count","approximate_presence_count"] as const satisfies ReadonlyArray<keyof GuildInviteResponse>;
Object.freeze(GuildInviteResponseKeys);
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
export const GuildMFALevelResponseKeys = ["level"] as const satisfies ReadonlyArray<keyof GuildMFALevelResponse>;
Object.freeze(GuildMFALevelResponseKeys);
export interface GuildMFALevelResponse {
    level: GuildMFALevel;
}
export const GuildMemberResponseKeys = ["avatar","communication_disabled_until","flags","joined_at","nick","pending","premium_since","roles","user","mute","deaf"] as const satisfies ReadonlyArray<keyof GuildMemberResponse>;
Object.freeze(GuildMemberResponseKeys);
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
export const GuildOnboardingResponseKeys = ["guild_id","prompts","default_channel_ids","enabled"] as const satisfies ReadonlyArray<keyof GuildOnboardingResponse>;
Object.freeze(GuildOnboardingResponseKeys);
export interface GuildOnboardingResponse {
    guild_id: Snowflake;
    prompts: Array<OnboardingPromptResponse>;
    /**
     * @distinct 
     */
    default_channel_ids: Array<Snowflake>;
    enabled: boolean;
}
export const GuildPatchRequestPartialKeys = ["name","description","region","icon","verification_level","default_message_notifications","explicit_content_filter","preferred_locale","afk_timeout","afk_channel_id","system_channel_id","owner_id","splash","banner","system_channel_flags","features","discovery_splash","home_header","rules_channel_id","safety_alerts_channel_id","public_updates_channel_id","premium_progress_bar_enabled"] as const satisfies ReadonlyArray<keyof GuildPatchRequestPartial>;
Object.freeze(GuildPatchRequestPartialKeys);
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
export const GuildPreviewResponseKeys = ["id","name","icon","description","home_header","splash","discovery_splash","features","approximate_member_count","approximate_presence_count","emojis","stickers"] as const satisfies ReadonlyArray<keyof GuildPreviewResponse>;
Object.freeze(GuildPreviewResponseKeys);
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
export const GuildPruneResponseKeys = ["pruned"] as const satisfies ReadonlyArray<keyof GuildPruneResponse>;
Object.freeze(GuildPruneResponseKeys);
export interface GuildPruneResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    pruned?: (Int32 | null);
}
export const GuildResponseKeys = ["id","name","icon","description","home_header","splash","discovery_splash","features","banner","owner_id","application_id","region","afk_channel_id","afk_timeout","system_channel_id","system_channel_flags","widget_enabled","widget_channel_id","verification_level","roles","default_message_notifications","mfa_level","explicit_content_filter","max_presences","max_members","max_stage_video_channel_users","max_video_channel_users","vanity_url_code","premium_tier","premium_subscription_count","preferred_locale","rules_channel_id","safety_alerts_channel_id","public_updates_channel_id","premium_progress_bar_enabled","nsfw","nsfw_level","emojis","stickers"] as const satisfies ReadonlyArray<keyof GuildResponse>;
Object.freeze(GuildResponseKeys);
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
export const GuildRoleResponseKeys = ["id","name","description","permissions","position","color","hoist","managed","mentionable","icon","unicode_emoji","tags"] as const satisfies ReadonlyArray<keyof GuildRoleResponse>;
Object.freeze(GuildRoleResponseKeys);
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
export const GuildRoleTagsResponseKeys = ["premium_subscriber","bot_id","integration_id","subscription_listing_id","available_for_purchase","guild_connections"] as const satisfies ReadonlyArray<keyof GuildRoleTagsResponse>;
Object.freeze(GuildRoleTagsResponseKeys);
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
export const GuildStickerResponseKeys = ["id","name","tags","type","format_type","description","available","guild_id","user"] as const satisfies ReadonlyArray<keyof GuildStickerResponse>;
Object.freeze(GuildStickerResponseKeys);
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
export const GuildSubscriptionIntegrationResponseKeys = ["type","name","account","enabled","id"] as const satisfies ReadonlyArray<keyof GuildSubscriptionIntegrationResponse>;
Object.freeze(GuildSubscriptionIntegrationResponseKeys);
export interface GuildSubscriptionIntegrationResponse {
    type: typeof IntegrationType["GUILD_SUBSCRIPTION"];
    name?: (string | null);
    account?: (null | AccountResponse);
    enabled?: (boolean | null);
    id: Snowflake;
}
export const GuildTemplateChannelResponseKeys = ["id","type","name","position","topic","bitrate","user_limit","nsfw","rate_limit_per_user","parent_id","default_auto_archive_duration","permission_overwrites","available_tags","template","default_reaction_emoji","default_thread_rate_limit_per_user","default_sort_order","default_forum_layout","icon_emoji","theme_color"] as const satisfies ReadonlyArray<keyof GuildTemplateChannelResponse>;
Object.freeze(GuildTemplateChannelResponseKeys);
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
export const GuildTemplateChannelTagsKeys = ["name","emoji_id","emoji_name","moderated"] as const satisfies ReadonlyArray<keyof GuildTemplateChannelTags>;
Object.freeze(GuildTemplateChannelTagsKeys);
export interface GuildTemplateChannelTags {
    name: string;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
    moderated?: (boolean | null);
}
export const GuildTemplateResponseKeys = ["code","name","description","usage_count","creator_id","creator","created_at","updated_at","source_guild_id","serialized_source_guild","is_dirty"] as const satisfies ReadonlyArray<keyof GuildTemplateResponse>;
Object.freeze(GuildTemplateResponseKeys);
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
export const GuildTemplateRoleResponseKeys = ["id","name","permissions","color","hoist","mentionable","icon","unicode_emoji"] as const satisfies ReadonlyArray<keyof GuildTemplateRoleResponse>;
Object.freeze(GuildTemplateRoleResponseKeys);
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
export const GuildTemplateSnapshotResponseKeys = ["name","description","region","verification_level","default_message_notifications","explicit_content_filter","preferred_locale","afk_channel_id","afk_timeout","system_channel_id","system_channel_flags","roles","channels"] as const satisfies ReadonlyArray<keyof GuildTemplateSnapshotResponse>;
Object.freeze(GuildTemplateSnapshotResponseKeys);
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
export const GuildWelcomeChannelKeys = ["channel_id","description","emoji_id","emoji_name"] as const satisfies ReadonlyArray<keyof GuildWelcomeChannel>;
Object.freeze(GuildWelcomeChannelKeys);
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
export const GuildWelcomeScreenChannelResponseKeys = ["channel_id","description","emoji_id","emoji_name"] as const satisfies ReadonlyArray<keyof GuildWelcomeScreenChannelResponse>;
Object.freeze(GuildWelcomeScreenChannelResponseKeys);
export interface GuildWelcomeScreenChannelResponse {
    channel_id: Snowflake;
    description: string;
    emoji_id?: (Snowflake | null);
    emoji_name?: (string | null);
}
export const GuildWelcomeScreenResponseKeys = ["description","welcome_channels"] as const satisfies ReadonlyArray<keyof GuildWelcomeScreenResponse>;
Object.freeze(GuildWelcomeScreenResponseKeys);
export interface GuildWelcomeScreenResponse {
    description?: (string | null);
    welcome_channels: Array<GuildWelcomeScreenChannelResponse>;
}
export const GuildWithCountsResponseKeys = ["id","name","icon","description","home_header","splash","discovery_splash","features","banner","owner_id","application_id","region","afk_channel_id","afk_timeout","system_channel_id","system_channel_flags","widget_enabled","widget_channel_id","verification_level","roles","default_message_notifications","mfa_level","explicit_content_filter","max_presences","max_members","max_stage_video_channel_users","max_video_channel_users","vanity_url_code","premium_tier","premium_subscription_count","preferred_locale","rules_channel_id","safety_alerts_channel_id","public_updates_channel_id","premium_progress_bar_enabled","nsfw","nsfw_level","emojis","stickers","approximate_member_count","approximate_presence_count"] as const satisfies ReadonlyArray<keyof GuildWithCountsResponse>;
Object.freeze(GuildWithCountsResponseKeys);
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
export const IconEmojiResponseKeys = [] as const satisfies ReadonlyArray<keyof IconEmojiResponse>;
Object.freeze(IconEmojiResponseKeys);
export interface IconEmojiResponse {

}
export const IncomingWebhookInteractionRequestKeys = ["content","embeds","allowed_mentions","components","attachments","tts","flags"] as const satisfies ReadonlyArray<keyof IncomingWebhookInteractionRequest>;
Object.freeze(IncomingWebhookInteractionRequestKeys);
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
export const IncomingWebhookRequestPartialKeys = ["content","embeds","allowed_mentions","components","attachments","tts","flags","username","avatar_url","thread_name","applied_tags"] as const satisfies ReadonlyArray<keyof IncomingWebhookRequestPartial>;
Object.freeze(IncomingWebhookRequestPartialKeys);
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
export const IncomingWebhookUpdateForInteractionCallbackRequestPartialKeys = ["content","embeds","allowed_mentions","components","attachments","flags"] as const satisfies ReadonlyArray<keyof IncomingWebhookUpdateForInteractionCallbackRequestPartial>;
Object.freeze(IncomingWebhookUpdateForInteractionCallbackRequestPartialKeys);
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
export const IncomingWebhookUpdateRequestPartialKeys = ["content","embeds","allowed_mentions","components","attachments","flags"] as const satisfies ReadonlyArray<keyof IncomingWebhookUpdateRequestPartial>;
Object.freeze(IncomingWebhookUpdateRequestPartialKeys);
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
export const InputTextKeys = ["type","custom_id","style","label","value","placeholder","required","min_length","max_length"] as const satisfies ReadonlyArray<keyof InputText>;
Object.freeze(InputTextKeys);
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
export const IntegrationApplicationResponseKeys = ["id","name","icon","description","type","cover_image","primary_sku_id","bot"] as const satisfies ReadonlyArray<keyof IntegrationApplicationResponse>;
Object.freeze(IntegrationApplicationResponseKeys);
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
export const InteractionApplicationCommandAutocompleteCallbackIntegerDataKeys = ["choices"] as const satisfies ReadonlyArray<keyof InteractionApplicationCommandAutocompleteCallbackIntegerData>;
Object.freeze(InteractionApplicationCommandAutocompleteCallbackIntegerDataKeys);
export interface InteractionApplicationCommandAutocompleteCallbackIntegerData {
    /**
     * @maxItems 25
     */
    choices?: (Array<(null | ApplicationCommandOptionIntegerChoice)> | null);
}
export const InteractionApplicationCommandAutocompleteCallbackNumberDataKeys = ["choices"] as const satisfies ReadonlyArray<keyof InteractionApplicationCommandAutocompleteCallbackNumberData>;
Object.freeze(InteractionApplicationCommandAutocompleteCallbackNumberDataKeys);
export interface InteractionApplicationCommandAutocompleteCallbackNumberData {
    /**
     * @maxItems 25
     */
    choices?: (Array<(null | ApplicationCommandOptionNumberChoice)> | null);
}
export const InteractionApplicationCommandAutocompleteCallbackStringDataKeys = ["choices"] as const satisfies ReadonlyArray<keyof InteractionApplicationCommandAutocompleteCallbackStringData>;
Object.freeze(InteractionApplicationCommandAutocompleteCallbackStringDataKeys);
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
export const InviteApplicationResponseKeys = ["id","name","icon","description","type","cover_image","primary_sku_id","bot","slug","guild_id","rpc_origins","bot_public","bot_require_code_grant","terms_of_service_url","privacy_policy_url","custom_install_url","install_params","verify_key","flags","max_participants","tags"] as const satisfies ReadonlyArray<keyof InviteApplicationResponse>;
Object.freeze(InviteApplicationResponseKeys);
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
export const InviteChannelRecipientResponseKeys = ["username"] as const satisfies ReadonlyArray<keyof InviteChannelRecipientResponse>;
Object.freeze(InviteChannelRecipientResponseKeys);
export interface InviteChannelRecipientResponse {
    username: string;
}
export const InviteChannelResponseKeys = ["id","type","name","icon","recipients"] as const satisfies ReadonlyArray<keyof InviteChannelResponse>;
Object.freeze(InviteChannelResponseKeys);
export interface InviteChannelResponse {
    id: Snowflake;
    type: ChannelType;
    name?: (string | null);
    icon?: (string | null);
    recipients?: (Array<InviteChannelRecipientResponse> | null);
}
export const InviteGuildResponseKeys = ["id","name","splash","banner","description","icon","features","verification_level","vanity_url_code","nsfw_level","nsfw","premium_subscription_count"] as const satisfies ReadonlyArray<keyof InviteGuildResponse>;
Object.freeze(InviteGuildResponseKeys);
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
export const InviteStageInstanceResponseKeys = ["topic","participant_count","speaker_count","members"] as const satisfies ReadonlyArray<keyof InviteStageInstanceResponse>;
Object.freeze(InviteStageInstanceResponseKeys);
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
export const KeywordRuleResponseKeys = ["id","guild_id","creator_id","name","event_type","actions","trigger_type","enabled","exempt_roles","exempt_channels","trigger_metadata"] as const satisfies ReadonlyArray<keyof KeywordRuleResponse>;
Object.freeze(KeywordRuleResponseKeys);
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
export const KeywordTriggerMetadataKeys = ["keyword_filter","regex_patterns","allow_list"] as const satisfies ReadonlyArray<keyof KeywordTriggerMetadata>;
Object.freeze(KeywordTriggerMetadataKeys);
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
export const KeywordTriggerMetadataResponseKeys = ["keyword_filter","regex_patterns","allow_list"] as const satisfies ReadonlyArray<keyof KeywordTriggerMetadataResponse>;
Object.freeze(KeywordTriggerMetadataResponseKeys);
export interface KeywordTriggerMetadataResponse {
    keyword_filter: Array<string>;
    regex_patterns: Array<string>;
    allow_list: Array<string>;
}
export const KeywordUpsertRequestKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof KeywordUpsertRequest>;
Object.freeze(KeywordUpsertRequestKeys);
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
export const KeywordUpsertRequestPartialKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof KeywordUpsertRequestPartial>;
Object.freeze(KeywordUpsertRequestPartialKeys);
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
export const MLSpamRuleResponseKeys = ["id","guild_id","creator_id","name","event_type","actions","trigger_type","enabled","exempt_roles","exempt_channels","trigger_metadata"] as const satisfies ReadonlyArray<keyof MLSpamRuleResponse>;
Object.freeze(MLSpamRuleResponseKeys);
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
export const MLSpamTriggerMetadataKeys = [] as const satisfies ReadonlyArray<keyof MLSpamTriggerMetadata>;
Object.freeze(MLSpamTriggerMetadataKeys);
export interface MLSpamTriggerMetadata {

}
export const MLSpamTriggerMetadataResponseKeys = [] as const satisfies ReadonlyArray<keyof MLSpamTriggerMetadataResponse>;
Object.freeze(MLSpamTriggerMetadataResponseKeys);
export interface MLSpamTriggerMetadataResponse {

}
export const MLSpamUpsertRequestKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof MLSpamUpsertRequest>;
Object.freeze(MLSpamUpsertRequestKeys);
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
export const MLSpamUpsertRequestPartialKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof MLSpamUpsertRequestPartial>;
Object.freeze(MLSpamUpsertRequestPartialKeys);
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
export const MentionSpamRuleResponseKeys = ["id","guild_id","creator_id","name","event_type","actions","trigger_type","enabled","exempt_roles","exempt_channels","trigger_metadata"] as const satisfies ReadonlyArray<keyof MentionSpamRuleResponse>;
Object.freeze(MentionSpamRuleResponseKeys);
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
export const MentionSpamTriggerMetadataKeys = ["mention_total_limit","mention_raid_protection_enabled"] as const satisfies ReadonlyArray<keyof MentionSpamTriggerMetadata>;
Object.freeze(MentionSpamTriggerMetadataKeys);
export interface MentionSpamTriggerMetadata {
    /**
     * @maximum 50
     * @minimum 0
     */
    mention_total_limit: number;
    mention_raid_protection_enabled?: (boolean | null);
}
export const MentionSpamTriggerMetadataResponseKeys = ["mention_total_limit"] as const satisfies ReadonlyArray<keyof MentionSpamTriggerMetadataResponse>;
Object.freeze(MentionSpamTriggerMetadataResponseKeys);
export interface MentionSpamTriggerMetadataResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    mention_total_limit: Int32;
}
export const MentionSpamUpsertRequestKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof MentionSpamUpsertRequest>;
Object.freeze(MentionSpamUpsertRequestKeys);
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
export const MentionSpamUpsertRequestPartialKeys = ["name","event_type","actions","enabled","exempt_roles","exempt_channels","trigger_type","trigger_metadata"] as const satisfies ReadonlyArray<keyof MentionSpamUpsertRequestPartial>;
Object.freeze(MentionSpamUpsertRequestPartialKeys);
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
export const MentionableSelectKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof MentionableSelect>;
Object.freeze(MentionableSelectKeys);
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
export const MessageActivityResponseKeys = [] as const satisfies ReadonlyArray<keyof MessageActivityResponse>;
Object.freeze(MessageActivityResponseKeys);
export interface MessageActivityResponse {

}
export const MessageAllowedMentionsRequestKeys = ["parse","users","roles","replied_user"] as const satisfies ReadonlyArray<keyof MessageAllowedMentionsRequest>;
Object.freeze(MessageAllowedMentionsRequestKeys);
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
export const MessageAttachmentRequestKeys = ["id","filename","description"] as const satisfies ReadonlyArray<keyof MessageAttachmentRequest>;
Object.freeze(MessageAttachmentRequestKeys);
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
}
export const MessageAttachmentResponseKeys = ["id","filename","size","url","proxy_url","width","height","duration_secs","waveform","description","content_type","ephemeral"] as const satisfies ReadonlyArray<keyof MessageAttachmentResponse>;
Object.freeze(MessageAttachmentResponseKeys);
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
export const MessageComponentActionRowResponseKeys = ["type","components"] as const satisfies ReadonlyArray<keyof MessageComponentActionRowResponse>;
Object.freeze(MessageComponentActionRowResponseKeys);
export interface MessageComponentActionRowResponse {
    type: typeof MessageComponentType["ACTION_ROW"];
    components?: (Array<(MessageComponentButtonResponse | MessageComponentChannelSelectResponse | MessageComponentInputTextResponse | MessageComponentMentionableSelectResponse | MessageComponentRoleSelectResponse | MessageComponentStringSelectResponse | MessageComponentUserSelectResponse)> | null);
}
export const MessageComponentButtonResponseKeys = ["type","custom_id","style","label","disabled","emoji","url"] as const satisfies ReadonlyArray<keyof MessageComponentButtonResponse>;
Object.freeze(MessageComponentButtonResponseKeys);
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
export const MessageComponentChannelSelectResponseKeys = ["type","custom_id","placeholder","min_values","max_values","disabled","channel_types"] as const satisfies ReadonlyArray<keyof MessageComponentChannelSelectResponse>;
Object.freeze(MessageComponentChannelSelectResponseKeys);
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
export const MessageComponentEmojiResponseKeys = ["id","name","animated"] as const satisfies ReadonlyArray<keyof MessageComponentEmojiResponse>;
Object.freeze(MessageComponentEmojiResponseKeys);
export interface MessageComponentEmojiResponse {
    id?: (Snowflake | null);
    name: string;
    animated?: (boolean | null);
}
export const MessageComponentInputTextResponseKeys = ["type","custom_id","style","label","value","placeholder","required","min_length","max_length"] as const satisfies ReadonlyArray<keyof MessageComponentInputTextResponse>;
Object.freeze(MessageComponentInputTextResponseKeys);
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
export const MessageComponentMentionableSelectResponseKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof MessageComponentMentionableSelectResponse>;
Object.freeze(MessageComponentMentionableSelectResponseKeys);
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
export const MessageComponentRoleSelectResponseKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof MessageComponentRoleSelectResponse>;
Object.freeze(MessageComponentRoleSelectResponseKeys);
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
export const MessageComponentStringSelectResponseKeys = ["type","custom_id","placeholder","min_values","max_values","disabled","options"] as const satisfies ReadonlyArray<keyof MessageComponentStringSelectResponse>;
Object.freeze(MessageComponentStringSelectResponseKeys);
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
export const MessageComponentUserSelectResponseKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof MessageComponentUserSelectResponse>;
Object.freeze(MessageComponentUserSelectResponseKeys);
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
export const MessageCreateRequestKeys = ["content","embeds","allowed_mentions","sticker_ids","components","flags","attachments","message_reference","nonce","tts"] as const satisfies ReadonlyArray<keyof MessageCreateRequest>;
Object.freeze(MessageCreateRequestKeys);
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
export const MessageEditRequestPartialKeys = ["content","embeds","flags","allowed_mentions","sticker_ids","components","attachments"] as const satisfies ReadonlyArray<keyof MessageEditRequestPartial>;
Object.freeze(MessageEditRequestPartialKeys);
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
export const MessageEmbedAuthorResponseKeys = ["name","url","icon_url","proxy_icon_url"] as const satisfies ReadonlyArray<keyof MessageEmbedAuthorResponse>;
Object.freeze(MessageEmbedAuthorResponseKeys);
export interface MessageEmbedAuthorResponse {
    name: string;
    url?: (string | null);
    icon_url?: (URIString | null);
    proxy_icon_url?: (URIString | null);
}
export const MessageEmbedFieldResponseKeys = ["name","value","inline"] as const satisfies ReadonlyArray<keyof MessageEmbedFieldResponse>;
Object.freeze(MessageEmbedFieldResponseKeys);
export interface MessageEmbedFieldResponse {
    name: string;
    value: string;
    inline: boolean;
}
export const MessageEmbedFooterResponseKeys = ["text","icon_url","proxy_icon_url"] as const satisfies ReadonlyArray<keyof MessageEmbedFooterResponse>;
Object.freeze(MessageEmbedFooterResponseKeys);
export interface MessageEmbedFooterResponse {
    text: string;
    icon_url?: (URIString | null);
    proxy_icon_url?: (URIString | null);
}
export const MessageEmbedImageResponseKeys = ["url","proxy_url","width","height"] as const satisfies ReadonlyArray<keyof MessageEmbedImageResponse>;
Object.freeze(MessageEmbedImageResponseKeys);
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
export const MessageEmbedProviderResponseKeys = ["name","url"] as const satisfies ReadonlyArray<keyof MessageEmbedProviderResponse>;
Object.freeze(MessageEmbedProviderResponseKeys);
export interface MessageEmbedProviderResponse {
    name: string;
    url?: (URIString | null);
}
export const MessageEmbedResponseKeys = ["type","url","title","description","color","timestamp","fields","author","provider","image","thumbnail","video","footer"] as const satisfies ReadonlyArray<keyof MessageEmbedResponse>;
Object.freeze(MessageEmbedResponseKeys);
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
export const MessageEmbedVideoResponseKeys = ["url","proxy_url","width","height"] as const satisfies ReadonlyArray<keyof MessageEmbedVideoResponse>;
Object.freeze(MessageEmbedVideoResponseKeys);
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
export const MessageInteractionResponseKeys = ["id","type","name","user","name_localized"] as const satisfies ReadonlyArray<keyof MessageInteractionResponse>;
Object.freeze(MessageInteractionResponseKeys);
export interface MessageInteractionResponse {
    id: Snowflake;
    type: InteractionType;
    name: string;
    user?: (null | UserResponse);
    name_localized?: (string | null);
}
export const MessageMentionChannelResponseKeys = ["id","name","type","guild_id"] as const satisfies ReadonlyArray<keyof MessageMentionChannelResponse>;
Object.freeze(MessageMentionChannelResponseKeys);
export interface MessageMentionChannelResponse {
    id: Snowflake;
    name: string;
    type: ChannelType;
    guild_id: Snowflake;
}
export const MessageReactionCountDetailsResponseKeys = ["burst","normal"] as const satisfies ReadonlyArray<keyof MessageReactionCountDetailsResponse>;
Object.freeze(MessageReactionCountDetailsResponseKeys);
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
export const MessageReactionEmojiResponseKeys = ["id","name","animated"] as const satisfies ReadonlyArray<keyof MessageReactionEmojiResponse>;
Object.freeze(MessageReactionEmojiResponseKeys);
export interface MessageReactionEmojiResponse {
    id?: (Snowflake | null);
    name?: (string | null);
    animated?: (boolean | null);
}
export const MessageReactionResponseKeys = ["emoji","count","count_details","burst_colors","me_burst","me"] as const satisfies ReadonlyArray<keyof MessageReactionResponse>;
Object.freeze(MessageReactionResponseKeys);
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
export const MessageReferenceResponseKeys = ["channel_id","message_id","guild_id"] as const satisfies ReadonlyArray<keyof MessageReferenceResponse>;
Object.freeze(MessageReferenceResponseKeys);
export interface MessageReferenceResponse {
    channel_id: Snowflake;
    message_id?: (Snowflake | null);
    guild_id?: (Snowflake | null);
}
export const MessageResponseKeys = ["id","type","content","channel_id","author","attachments","embeds","mentions","mention_roles","pinned","mention_everyone","tts","timestamp","edited_timestamp","flags","components","activity","application","application_id","interaction","nonce","webhook_id","message_reference","thread","mention_channels","stickers","sticker_items","role_subscription_data","position","reactions","referenced_message"] as const satisfies ReadonlyArray<keyof MessageResponse>;
Object.freeze(MessageResponseKeys);
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
export const MessageRoleSubscriptionDataResponseKeys = ["role_subscription_listing_id","tier_name","total_months_subscribed","is_renewal"] as const satisfies ReadonlyArray<keyof MessageRoleSubscriptionDataResponse>;
Object.freeze(MessageRoleSubscriptionDataResponseKeys);
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
export const MessageStickerItemResponseKeys = ["id","name","format_type"] as const satisfies ReadonlyArray<keyof MessageStickerItemResponse>;
Object.freeze(MessageStickerItemResponseKeys);
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
export const ModalInteractionCallbackDataKeys = ["custom_id","title","components"] as const satisfies ReadonlyArray<keyof ModalInteractionCallbackData>;
Object.freeze(ModalInteractionCallbackDataKeys);
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
export const ModalInteractionCallbackRequestKeys = ["type","data"] as const satisfies ReadonlyArray<keyof ModalInteractionCallbackRequest>;
Object.freeze(ModalInteractionCallbackRequestKeys);
export interface ModalInteractionCallbackRequest {
    type: typeof InteractionCallbackType["MODAL"];
    data: ModalInteractionCallbackData;
}
export const MyGuildResponseKeys = ["id","name","icon","owner","permissions","features","approximate_member_count","approximate_presence_count"] as const satisfies ReadonlyArray<keyof MyGuildResponse>;
Object.freeze(MyGuildResponseKeys);
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
export const NewMemberActionResponseKeys = ["channel_id","action_type","title","description","emoji","icon"] as const satisfies ReadonlyArray<keyof NewMemberActionResponse>;
Object.freeze(NewMemberActionResponseKeys);
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
export const OAuth2GetAuthorizationResponseKeys = ["application","expires","scopes","user"] as const satisfies ReadonlyArray<keyof OAuth2GetAuthorizationResponse>;
Object.freeze(OAuth2GetAuthorizationResponseKeys);
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
export const OnboardingPromptOptionRequestKeys = ["id","title","description","emoji_id","emoji_name","emoji_animated","role_ids","channel_ids"] as const satisfies ReadonlyArray<keyof OnboardingPromptOptionRequest>;
Object.freeze(OnboardingPromptOptionRequestKeys);
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
export const OnboardingPromptOptionResponseKeys = ["id","title","description","emoji","role_ids","channel_ids"] as const satisfies ReadonlyArray<keyof OnboardingPromptOptionResponse>;
Object.freeze(OnboardingPromptOptionResponseKeys);
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
export const OnboardingPromptResponseKeys = ["id","title","options","single_select","required","in_onboarding","type"] as const satisfies ReadonlyArray<keyof OnboardingPromptResponse>;
Object.freeze(OnboardingPromptResponseKeys);
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
export const PartialDiscordIntegrationResponseKeys = ["id","type","name","account","application_id"] as const satisfies ReadonlyArray<keyof PartialDiscordIntegrationResponse>;
Object.freeze(PartialDiscordIntegrationResponseKeys);
export interface PartialDiscordIntegrationResponse {
    id: Snowflake;
    type: typeof IntegrationType["DISCORD"];
    name?: (string | null);
    account?: (null | AccountResponse);
    application_id: Snowflake;
}
export const PartialExternalConnectionIntegrationResponseKeys = ["id","type","name","account"] as const satisfies ReadonlyArray<keyof PartialExternalConnectionIntegrationResponse>;
Object.freeze(PartialExternalConnectionIntegrationResponseKeys);
export interface PartialExternalConnectionIntegrationResponse {
    id: Snowflake;
    type: (typeof IntegrationType["TWITCH"] | typeof IntegrationType["YOUTUBE"]);
    name?: (string | null);
    account?: (null | AccountResponse);
}
export const PartialGuildSubscriptionIntegrationResponseKeys = ["id","type","name","account"] as const satisfies ReadonlyArray<keyof PartialGuildSubscriptionIntegrationResponse>;
Object.freeze(PartialGuildSubscriptionIntegrationResponseKeys);
export interface PartialGuildSubscriptionIntegrationResponse {
    id: Snowflake;
    type: typeof IntegrationType["GUILD_SUBSCRIPTION"];
    name?: (string | null);
    account?: (null | AccountResponse);
}
export const PongInteractionCallbackRequestKeys = ["type"] as const satisfies ReadonlyArray<keyof PongInteractionCallbackRequest>;
Object.freeze(PongInteractionCallbackRequestKeys);
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
export const PrivateApplicationResponseKeys = ["id","name","icon","description","type","cover_image","primary_sku_id","bot","slug","guild_id","rpc_origins","bot_public","bot_require_code_grant","terms_of_service_url","privacy_policy_url","custom_install_url","install_params","verify_key","flags","max_participants","tags","redirect_uris","interactions_endpoint_url","role_connections_verification_url","owner","approximate_guild_count","team"] as const satisfies ReadonlyArray<keyof PrivateApplicationResponse>;
Object.freeze(PrivateApplicationResponseKeys);
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
export const PrivateChannelRequestPartialKeys = ["name","icon"] as const satisfies ReadonlyArray<keyof PrivateChannelRequestPartial>;
Object.freeze(PrivateChannelRequestPartialKeys);
export interface PrivateChannelRequestPartial {
    /**
     * @maxLength 100
     * @minLength 0
     */
    name?: (string | null);
    icon?: (Base64String | null);
}
export const PrivateChannelResponseKeys = ["id","type","last_message_id","flags","last_pin_timestamp","recipients"] as const satisfies ReadonlyArray<keyof PrivateChannelResponse>;
Object.freeze(PrivateChannelResponseKeys);
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
export const PrivateGroupChannelResponseKeys = ["id","type","last_message_id","flags","last_pin_timestamp","recipients","name","icon","owner_id","managed","application_id"] as const satisfies ReadonlyArray<keyof PrivateGroupChannelResponse>;
Object.freeze(PrivateGroupChannelResponseKeys);
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
export const PrivateGuildMemberResponseKeys = ["avatar","communication_disabled_until","flags","joined_at","nick","pending","premium_since","roles","user","mute","deaf","banner"] as const satisfies ReadonlyArray<keyof PrivateGuildMemberResponse>;
Object.freeze(PrivateGuildMemberResponseKeys);
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
export const QuarantineUserActionKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof QuarantineUserAction>;
Object.freeze(QuarantineUserActionKeys);
export interface QuarantineUserAction {
    type: typeof AutomodActionType["QUARANTINE_USER"];
    metadata?: (null | QuarantineUserActionMetadata);
}
export const QuarantineUserActionMetadataKeys = [] as const satisfies ReadonlyArray<keyof QuarantineUserActionMetadata>;
Object.freeze(QuarantineUserActionMetadataKeys);
export interface QuarantineUserActionMetadata {

}
export const QuarantineUserActionMetadataResponseKeys = [] as const satisfies ReadonlyArray<keyof QuarantineUserActionMetadataResponse>;
Object.freeze(QuarantineUserActionMetadataResponseKeys);
export interface QuarantineUserActionMetadataResponse {

}
export const QuarantineUserActionResponseKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof QuarantineUserActionResponse>;
Object.freeze(QuarantineUserActionResponseKeys);
export interface QuarantineUserActionResponse {
    type: typeof AutomodActionType["QUARANTINE_USER"];
    metadata: QuarantineUserActionMetadataResponse;
}
export const ReplyMessageReferenceRequestKeys = ["guild_id","channel_id","message_id","fail_if_not_exists"] as const satisfies ReadonlyArray<keyof ReplyMessageReferenceRequest>;
Object.freeze(ReplyMessageReferenceRequestKeys);
export interface ReplyMessageReferenceRequest {
    guild_id?: (Snowflake | null);
    channel_id?: (Snowflake | null);
    message_id: Snowflake;
    fail_if_not_exists?: (boolean | null);
}
export const ResourceChannelResponseKeys = ["channel_id","title","emoji","icon","description"] as const satisfies ReadonlyArray<keyof ResourceChannelResponse>;
Object.freeze(ResourceChannelResponseKeys);
export interface ResourceChannelResponse {
    channel_id: Snowflake;
    title: string;
    emoji?: (null | SettingsEmojiResponse);
    icon?: (string | null);
    description: string;
}
export const RichEmbedKeys = ["type","url","title","color","timestamp","description","author","image","thumbnail","footer","fields","provider","video"] as const satisfies ReadonlyArray<keyof RichEmbed>;
Object.freeze(RichEmbedKeys);
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
export const RichEmbedAuthorKeys = ["name","url","icon_url"] as const satisfies ReadonlyArray<keyof RichEmbedAuthor>;
Object.freeze(RichEmbedAuthorKeys);
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
export const RichEmbedFieldKeys = ["name","value","inline"] as const satisfies ReadonlyArray<keyof RichEmbedField>;
Object.freeze(RichEmbedFieldKeys);
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
export const RichEmbedFooterKeys = ["text","icon_url"] as const satisfies ReadonlyArray<keyof RichEmbedFooter>;
Object.freeze(RichEmbedFooterKeys);
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
export const RichEmbedImageKeys = ["url","width","height"] as const satisfies ReadonlyArray<keyof RichEmbedImage>;
Object.freeze(RichEmbedImageKeys);
export interface RichEmbedImage {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export const RichEmbedProviderKeys = ["name","url"] as const satisfies ReadonlyArray<keyof RichEmbedProvider>;
Object.freeze(RichEmbedProviderKeys);
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
export const RichEmbedThumbnailKeys = ["url","width","height"] as const satisfies ReadonlyArray<keyof RichEmbedThumbnail>;
Object.freeze(RichEmbedThumbnailKeys);
export interface RichEmbedThumbnail {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export const RichEmbedVideoKeys = ["url","width","height"] as const satisfies ReadonlyArray<keyof RichEmbedVideo>;
Object.freeze(RichEmbedVideoKeys);
export interface RichEmbedVideo {
    /**
     * @maxLength 2048
     */
    url?: (URIString | null);
    width?: (number | null);
    height?: (number | null);
}
export const RoleSelectKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof RoleSelect>;
Object.freeze(RoleSelectKeys);
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
export const ScheduledEventResponseKeys = ["id","guild_id","name","description","channel_id","creator_id","creator","image","scheduled_start_time","scheduled_end_time","status","entity_type","entity_id","user_count","privacy_level","user_rsvp"] as const satisfies ReadonlyArray<keyof ScheduledEventResponse>;
Object.freeze(ScheduledEventResponseKeys);
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
export const ScheduledEventUserResponseKeys = ["guild_scheduled_event_id","user_id","user","member"] as const satisfies ReadonlyArray<keyof ScheduledEventUserResponse>;
Object.freeze(ScheduledEventUserResponseKeys);
export interface ScheduledEventUserResponse {
    guild_scheduled_event_id: Snowflake;
    user_id: Snowflake;
    user?: (null | UserResponse);
    member?: (null | GuildMemberResponse);
}
export const SelectOptionKeys = ["label","value","description","emoji","default"] as const satisfies ReadonlyArray<keyof SelectOption>;
Object.freeze(SelectOptionKeys);
export interface SelectOption {
    /**
     * @maxLength 100
     */
    label: string;
    /**
     * @maxLength 100
     */
    value: string;
    /**
     * @maxLength 100
     */
    description?: (string | null);
    emoji?: (null | Emoji);
    default?: (boolean | null);
}
export const SelectOptionResponseKeys = ["label","value","description","emoji","default"] as const satisfies ReadonlyArray<keyof SelectOptionResponse>;
Object.freeze(SelectOptionResponseKeys);
export interface SelectOptionResponse {
    label: string;
    value: string;
    description?: (string | null);
    emoji?: (null | MessageComponentEmojiResponse);
    default?: (boolean | null);
}
export const SettingsEmojiResponseKeys = ["id","name","animated"] as const satisfies ReadonlyArray<keyof SettingsEmojiResponse>;
Object.freeze(SettingsEmojiResponseKeys);
export interface SettingsEmojiResponse {
    id?: (Snowflake | null);
    name?: (string | null);
    animated?: (boolean | null);
}
export const SlackWebhookKeys = ["text","username","icon_url","attachments"] as const satisfies ReadonlyArray<keyof SlackWebhook>;
Object.freeze(SlackWebhookKeys);
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
export const SpamLinkRuleResponseKeys = ["id","guild_id","creator_id","name","event_type","actions","trigger_type","enabled","exempt_roles","exempt_channels","trigger_metadata"] as const satisfies ReadonlyArray<keyof SpamLinkRuleResponse>;
Object.freeze(SpamLinkRuleResponseKeys);
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
export const SpamLinkTriggerMetadataResponseKeys = [] as const satisfies ReadonlyArray<keyof SpamLinkTriggerMetadataResponse>;
Object.freeze(SpamLinkTriggerMetadataResponseKeys);
export interface SpamLinkTriggerMetadataResponse {

}
export const StageInstanceResponseKeys = ["guild_id","channel_id","topic","privacy_level","id","discoverable_disabled","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof StageInstanceResponse>;
Object.freeze(StageInstanceResponseKeys);
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
export const StageScheduledEventCreateRequestKeys = ["name","description","image","scheduled_start_time","scheduled_end_time","privacy_level","entity_type","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof StageScheduledEventCreateRequest>;
Object.freeze(StageScheduledEventCreateRequestKeys);
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
export const StageScheduledEventPatchRequestPartialKeys = ["status","name","description","image","scheduled_start_time","scheduled_end_time","entity_type","privacy_level","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof StageScheduledEventPatchRequestPartial>;
Object.freeze(StageScheduledEventPatchRequestPartialKeys);
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
export const StageScheduledEventResponseKeys = ["id","guild_id","name","description","channel_id","creator_id","creator","image","scheduled_start_time","scheduled_end_time","status","entity_type","entity_id","user_count","privacy_level","user_rsvp","entity_metadata"] as const satisfies ReadonlyArray<keyof StageScheduledEventResponse>;
Object.freeze(StageScheduledEventResponseKeys);
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
export const StandardStickerResponseKeys = ["id","name","tags","type","format_type","description","pack_id","sort_value"] as const satisfies ReadonlyArray<keyof StandardStickerResponse>;
Object.freeze(StandardStickerResponseKeys);
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
export const StickerPackCollectionResponseKeys = ["sticker_packs"] as const satisfies ReadonlyArray<keyof StickerPackCollectionResponse>;
Object.freeze(StickerPackCollectionResponseKeys);
export interface StickerPackCollectionResponse {
    sticker_packs: Array<StickerPackResponse>;
}
export const StickerPackResponseKeys = ["id","sku_id","name","description","stickers","cover_sticker_id","banner_asset_id"] as const satisfies ReadonlyArray<keyof StickerPackResponse>;
Object.freeze(StickerPackResponseKeys);
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
export const StringSelectKeys = ["type","custom_id","placeholder","min_values","max_values","disabled","options"] as const satisfies ReadonlyArray<keyof StringSelect>;
Object.freeze(StringSelectKeys);
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
export const TeamMemberResponseKeys = ["user","team_id","membership_state","permissions"] as const satisfies ReadonlyArray<keyof TeamMemberResponse>;
Object.freeze(TeamMemberResponseKeys);
export interface TeamMemberResponse {
    user: UserResponse;
    team_id: Snowflake;
    membership_state: TeamMembershipState;
    permissions: Array<string>;
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
export const TeamResponseKeys = ["id","icon","name","owner_user_id","members"] as const satisfies ReadonlyArray<keyof TeamResponse>;
Object.freeze(TeamResponseKeys);
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
export const ThreadMemberResponseKeys = ["id","user_id","join_timestamp","flags","member"] as const satisfies ReadonlyArray<keyof ThreadMemberResponse>;
Object.freeze(ThreadMemberResponseKeys);
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
export const ThreadMetadataResponseKeys = ["archived","archive_timestamp","auto_archive_duration","locked","create_timestamp","invitable"] as const satisfies ReadonlyArray<keyof ThreadMetadataResponse>;
Object.freeze(ThreadMetadataResponseKeys);
export interface ThreadMetadataResponse {
    archived: boolean;
    archive_timestamp?: (ISO8601DateTime | null);
    auto_archive_duration: ThreadAutoArchiveDuration;
    locked: boolean;
    create_timestamp?: (ISO8601DateTime | null);
    invitable?: (boolean | null);
}
export const ThreadResponseKeys = ["id","type","last_message_id","flags","last_pin_timestamp","guild_id","name","parent_id","rate_limit_per_user","bitrate","user_limit","rtc_region","video_quality_mode","permissions","owner_id","thread_metadata","message_count","member_count","total_message_sent","applied_tags","member"] as const satisfies ReadonlyArray<keyof ThreadResponse>;
Object.freeze(ThreadResponseKeys);
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
export const ThreadsResponseKeys = ["threads","members","has_more"] as const satisfies ReadonlyArray<keyof ThreadsResponse>;
Object.freeze(ThreadsResponseKeys);
export interface ThreadsResponse {
    threads: Array<ThreadResponse>;
    members: Array<ThreadMemberResponse>;
    has_more?: (boolean | null);
}
export const TypingIndicatorResponseKeys = [] as const satisfies ReadonlyArray<keyof TypingIndicatorResponse>;
Object.freeze(TypingIndicatorResponseKeys);
export interface TypingIndicatorResponse {

}
export const UpdateDefaultReactionEmojiRequestKeys = ["emoji_id","emoji_name"] as const satisfies ReadonlyArray<keyof UpdateDefaultReactionEmojiRequest>;
Object.freeze(UpdateDefaultReactionEmojiRequestKeys);
export interface UpdateDefaultReactionEmojiRequest {
    emoji_id?: (Snowflake | null);
    /**
     * @maxLength 100
     */
    emoji_name?: (string | null);
}
export const UpdateGuildChannelRequestPartialKeys = ["type","name","position","topic","bitrate","user_limit","nsfw","rate_limit_per_user","parent_id","permission_overwrites","rtc_region","video_quality_mode","default_auto_archive_duration","default_reaction_emoji","default_thread_rate_limit_per_user","default_sort_order","default_forum_layout","flags","available_tags"] as const satisfies ReadonlyArray<keyof UpdateGuildChannelRequestPartial>;
Object.freeze(UpdateGuildChannelRequestPartialKeys);
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
export const UpdateGuildOnboardingRequestKeys = ["prompts","enabled","default_channel_ids","mode"] as const satisfies ReadonlyArray<keyof UpdateGuildOnboardingRequest>;
Object.freeze(UpdateGuildOnboardingRequestKeys);
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
export const UpdateMessageInteractionCallbackRequestKeys = ["type","data"] as const satisfies ReadonlyArray<keyof UpdateMessageInteractionCallbackRequest>;
Object.freeze(UpdateMessageInteractionCallbackRequestKeys);
export interface UpdateMessageInteractionCallbackRequest {
    type: (typeof InteractionCallbackType["DEFERRED_UPDATE_MESSAGE"] | typeof InteractionCallbackType["UPDATE_MESSAGE"]);
    data?: (null | IncomingWebhookUpdateForInteractionCallbackRequestPartial);
}
export const UpdateOnboardingPromptRequestKeys = ["title","options","single_select","required","in_onboarding","type","id"] as const satisfies ReadonlyArray<keyof UpdateOnboardingPromptRequest>;
Object.freeze(UpdateOnboardingPromptRequestKeys);
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
export const UpdateThreadRequestPartialKeys = ["name","archived","locked","invitable","auto_archive_duration","rate_limit_per_user","flags","applied_tags","bitrate","user_limit","rtc_region","video_quality_mode"] as const satisfies ReadonlyArray<keyof UpdateThreadRequestPartial>;
Object.freeze(UpdateThreadRequestPartialKeys);
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
export const UpdateThreadTagRequestKeys = ["name","emoji_id","emoji_name","moderated","id"] as const satisfies ReadonlyArray<keyof UpdateThreadTagRequest>;
Object.freeze(UpdateThreadTagRequestKeys);
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
export const UserCommunicationDisabledActionKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof UserCommunicationDisabledAction>;
Object.freeze(UserCommunicationDisabledActionKeys);
export interface UserCommunicationDisabledAction {
    type: typeof AutomodActionType["USER_COMMUNICATION_DISABLED"];
    metadata: UserCommunicationDisabledActionMetadata;
}
export const UserCommunicationDisabledActionMetadataKeys = ["duration_seconds"] as const satisfies ReadonlyArray<keyof UserCommunicationDisabledActionMetadata>;
Object.freeze(UserCommunicationDisabledActionMetadataKeys);
export interface UserCommunicationDisabledActionMetadata {
    /**
     * @maximum 2419200
     * @minimum 0
     */
    duration_seconds: number;
}
export const UserCommunicationDisabledActionMetadataResponseKeys = ["duration_seconds"] as const satisfies ReadonlyArray<keyof UserCommunicationDisabledActionMetadataResponse>;
Object.freeze(UserCommunicationDisabledActionMetadataResponseKeys);
export interface UserCommunicationDisabledActionMetadataResponse {
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    duration_seconds: Int32;
}
export const UserCommunicationDisabledActionResponseKeys = ["type","metadata"] as const satisfies ReadonlyArray<keyof UserCommunicationDisabledActionResponse>;
Object.freeze(UserCommunicationDisabledActionResponseKeys);
export interface UserCommunicationDisabledActionResponse {
    type: typeof AutomodActionType["USER_COMMUNICATION_DISABLED"];
    metadata: UserCommunicationDisabledActionMetadataResponse;
}
export const UserGuildOnboardingResponseKeys = ["guild_id","prompts","default_channel_ids","enabled"] as const satisfies ReadonlyArray<keyof UserGuildOnboardingResponse>;
Object.freeze(UserGuildOnboardingResponseKeys);
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
export const UserPIIResponseKeys = ["id","username","avatar","discriminator","public_flags","flags","bot","system","banner","accent_color","mfa_enabled","locale","premium_type","email","verified"] as const satisfies ReadonlyArray<keyof UserPIIResponse>;
Object.freeze(UserPIIResponseKeys);
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
export const UserResponseKeys = ["id","username","avatar","discriminator","public_flags","flags","bot","system","banner","accent_color"] as const satisfies ReadonlyArray<keyof UserResponse>;
Object.freeze(UserResponseKeys);
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
export const UserSelectKeys = ["type","custom_id","placeholder","min_values","max_values","disabled"] as const satisfies ReadonlyArray<keyof UserSelect>;
Object.freeze(UserSelectKeys);
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
export const VanityURLErrorResponseKeys = ["message","code"] as const satisfies ReadonlyArray<keyof VanityURLErrorResponse>;
Object.freeze(VanityURLErrorResponseKeys);
export interface VanityURLErrorResponse {
    message: string;
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    code: Int32;
}
export const VanityURLResponseKeys = ["code","uses","error"] as const satisfies ReadonlyArray<keyof VanityURLResponse>;
Object.freeze(VanityURLResponseKeys);
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
export const VoiceRegionResponseKeys = ["id","name","custom","deprecated","optimal"] as const satisfies ReadonlyArray<keyof VoiceRegionResponse>;
Object.freeze(VoiceRegionResponseKeys);
export interface VoiceRegionResponse {
    id: string;
    name: string;
    custom: boolean;
    deprecated: boolean;
    optimal: boolean;
}
export const VoiceScheduledEventCreateRequestKeys = ["name","description","image","scheduled_start_time","scheduled_end_time","privacy_level","entity_type","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof VoiceScheduledEventCreateRequest>;
Object.freeze(VoiceScheduledEventCreateRequestKeys);
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
export const VoiceScheduledEventPatchRequestPartialKeys = ["status","name","description","image","scheduled_start_time","scheduled_end_time","entity_type","privacy_level","channel_id","entity_metadata"] as const satisfies ReadonlyArray<keyof VoiceScheduledEventPatchRequestPartial>;
Object.freeze(VoiceScheduledEventPatchRequestPartialKeys);
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
export const VoiceScheduledEventResponseKeys = ["id","guild_id","name","description","channel_id","creator_id","creator","image","scheduled_start_time","scheduled_end_time","status","entity_type","entity_id","user_count","privacy_level","user_rsvp","entity_metadata"] as const satisfies ReadonlyArray<keyof VoiceScheduledEventResponse>;
Object.freeze(VoiceScheduledEventResponseKeys);
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
export const WebhookSlackEmbedKeys = ["title","title_link","text","color","ts","pretext","footer","footer_icon","author_name","author_link","author_icon","image_url","thumb_url","fields"] as const satisfies ReadonlyArray<keyof WebhookSlackEmbed>;
Object.freeze(WebhookSlackEmbedKeys);
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
export const WebhookSlackEmbedFieldKeys = ["name","value","inline"] as const satisfies ReadonlyArray<keyof WebhookSlackEmbedField>;
Object.freeze(WebhookSlackEmbedFieldKeys);
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
export const WebhookSourceChannelResponseKeys = ["id","name"] as const satisfies ReadonlyArray<keyof WebhookSourceChannelResponse>;
Object.freeze(WebhookSourceChannelResponseKeys);
export interface WebhookSourceChannelResponse {
    id: Snowflake;
    name: string;
}
export const WebhookSourceGuildResponseKeys = ["id","icon","name"] as const satisfies ReadonlyArray<keyof WebhookSourceGuildResponse>;
Object.freeze(WebhookSourceGuildResponseKeys);
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
export const WelcomeMessageResponseKeys = ["author_ids","message"] as const satisfies ReadonlyArray<keyof WelcomeMessageResponse>;
Object.freeze(WelcomeMessageResponseKeys);
export interface WelcomeMessageResponse {
    author_ids: Array<Snowflake>;
    message: string;
}
export const WelcomeScreenPatchRequestPartialKeys = ["description","welcome_channels","enabled"] as const satisfies ReadonlyArray<keyof WelcomeScreenPatchRequestPartial>;
Object.freeze(WelcomeScreenPatchRequestPartialKeys);
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
export const WidgetActivityKeys = ["name"] as const satisfies ReadonlyArray<keyof WidgetActivity>;
Object.freeze(WidgetActivityKeys);
export interface WidgetActivity {
    name: string;
}
export const WidgetChannelKeys = ["id","name","position"] as const satisfies ReadonlyArray<keyof WidgetChannel>;
Object.freeze(WidgetChannelKeys);
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
export const WidgetMemberKeys = ["id","username","discriminator","avatar","status","avatar_url","activity","deaf","mute","self_deaf","self_mute","suppress","channel_id"] as const satisfies ReadonlyArray<keyof WidgetMember>;
Object.freeze(WidgetMemberKeys);
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
export const WidgetResponseKeys = ["id","name","instant_invite","channels","members","presence_count"] as const satisfies ReadonlyArray<keyof WidgetResponse>;
Object.freeze(WidgetResponseKeys);
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
export const WidgetSettingsResponseKeys = ["enabled","channel_id"] as const satisfies ReadonlyArray<keyof WidgetSettingsResponse>;
Object.freeze(WidgetSettingsResponseKeys);
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
export const DiscordErrorKeys = ["code","message"] as const satisfies ReadonlyArray<keyof DiscordError>;
Object.freeze(DiscordErrorKeys);
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
export const InnerErrorsKeys = ["_errors"] as const satisfies ReadonlyArray<keyof InnerErrors>;
Object.freeze(InnerErrorsKeys);
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
export const ListMyGuildsRequestQueryKeys = ["before","after","limit","with_counts"] as const satisfies ReadonlyArray<keyof ListMyGuildsRequestQuery>;
Object.freeze(ListMyGuildsRequestQueryKeys);
export interface ListMyGuildsRequestQuery {
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
    with_counts?: (boolean | null);
}
export const ListMyPrivateArchivedThreadsRequestQueryKeys = ["before","limit"] as const satisfies ReadonlyArray<keyof ListMyPrivateArchivedThreadsRequestQuery>;
Object.freeze(ListMyPrivateArchivedThreadsRequestQueryKeys);
export interface ListMyPrivateArchivedThreadsRequestQuery {
    before?: (Snowflake | null);
    limit?: (number | null);
}
export const ListMyPrivateArchivedThreadsRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListMyPrivateArchivedThreadsRequestPath>;
Object.freeze(ListMyPrivateArchivedThreadsRequestPathKeys);
export interface ListMyPrivateArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export const ListGuildApplicationCommandPermissionsRequestPathKeys = ["application_id","guild_id"] as const satisfies ReadonlyArray<keyof ListGuildApplicationCommandPermissionsRequestPath>;
Object.freeze(ListGuildApplicationCommandPermissionsRequestPathKeys);
export interface ListGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export const GetGuildApplicationCommandPermissionsRequestPathKeys = ["application_id","guild_id","command_id"] as const satisfies ReadonlyArray<keyof GetGuildApplicationCommandPermissionsRequestPath>;
Object.freeze(GetGuildApplicationCommandPermissionsRequestPathKeys);
export interface GetGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export const SetGuildApplicationCommandPermissionsRequestPathKeys = ["application_id","guild_id","command_id"] as const satisfies ReadonlyArray<keyof SetGuildApplicationCommandPermissionsRequestPath>;
Object.freeze(SetGuildApplicationCommandPermissionsRequestPathKeys);
export interface SetGuildApplicationCommandPermissionsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export const AddMyMessageReactionRequestPathKeys = ["channel_id","message_id","emoji_name"] as const satisfies ReadonlyArray<keyof AddMyMessageReactionRequestPath>;
Object.freeze(AddMyMessageReactionRequestPathKeys);
export interface AddMyMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export const DeleteMyMessageReactionRequestPathKeys = ["channel_id","message_id","emoji_name"] as const satisfies ReadonlyArray<keyof DeleteMyMessageReactionRequestPath>;
Object.freeze(DeleteMyMessageReactionRequestPathKeys);
export interface DeleteMyMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export const ListPrivateArchivedThreadsRequestQueryKeys = ["before","limit"] as const satisfies ReadonlyArray<keyof ListPrivateArchivedThreadsRequestQuery>;
Object.freeze(ListPrivateArchivedThreadsRequestQueryKeys);
export interface ListPrivateArchivedThreadsRequestQuery {
    before?: (ISO8601DateTime | null);
    limit?: (number | null);
}
export const ListPrivateArchivedThreadsRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListPrivateArchivedThreadsRequestPath>;
Object.freeze(ListPrivateArchivedThreadsRequestPathKeys);
export interface ListPrivateArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export const ListPublicArchivedThreadsRequestQueryKeys = ["before","limit"] as const satisfies ReadonlyArray<keyof ListPublicArchivedThreadsRequestQuery>;
Object.freeze(ListPublicArchivedThreadsRequestQueryKeys);
export interface ListPublicArchivedThreadsRequestQuery {
    before?: (ISO8601DateTime | null);
    limit?: (number | null);
}
export const ListPublicArchivedThreadsRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListPublicArchivedThreadsRequestPath>;
Object.freeze(ListPublicArchivedThreadsRequestPathKeys);
export interface ListPublicArchivedThreadsRequestPath {
    channel_id: Snowflake;
}
export const GetApplicationUserRoleConnectionRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof GetApplicationUserRoleConnectionRequestPath>;
Object.freeze(GetApplicationUserRoleConnectionRequestPathKeys);
export interface GetApplicationUserRoleConnectionRequestPath {
    application_id: Snowflake;
}
export const UpdateApplicationUserRoleConnectionRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof UpdateApplicationUserRoleConnectionRequestPath>;
Object.freeze(UpdateApplicationUserRoleConnectionRequestPathKeys);
export interface UpdateApplicationUserRoleConnectionRequestPath {
    application_id: Snowflake;
}
export const GetMyGuildMemberRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetMyGuildMemberRequestPath>;
Object.freeze(GetMyGuildMemberRequestPathKeys);
export interface GetMyGuildMemberRequestPath {
    guild_id: Snowflake;
}
export const GetApplicationRoleConnectionsMetadataRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof GetApplicationRoleConnectionsMetadataRequestPath>;
Object.freeze(GetApplicationRoleConnectionsMetadataRequestPathKeys);
export interface GetApplicationRoleConnectionsMetadataRequestPath {
    application_id: Snowflake;
}
export const UpdateApplicationRoleConnectionsMetadataRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof UpdateApplicationRoleConnectionsMetadataRequestPath>;
Object.freeze(UpdateApplicationRoleConnectionsMetadataRequestPathKeys);
export interface UpdateApplicationRoleConnectionsMetadataRequestPath {
    application_id: Snowflake;
}
export const GetGuildApplicationCommandRequestPathKeys = ["application_id","guild_id","command_id"] as const satisfies ReadonlyArray<keyof GetGuildApplicationCommandRequestPath>;
Object.freeze(GetGuildApplicationCommandRequestPathKeys);
export interface GetGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export const DeleteGuildApplicationCommandRequestPathKeys = ["application_id","guild_id","command_id"] as const satisfies ReadonlyArray<keyof DeleteGuildApplicationCommandRequestPath>;
Object.freeze(DeleteGuildApplicationCommandRequestPathKeys);
export interface DeleteGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export const UpdateGuildApplicationCommandRequestPathKeys = ["application_id","guild_id","command_id"] as const satisfies ReadonlyArray<keyof UpdateGuildApplicationCommandRequestPath>;
Object.freeze(UpdateGuildApplicationCommandRequestPathKeys);
export interface UpdateGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
    command_id: Snowflake;
}
export const ListGuildApplicationCommandsRequestQueryKeys = ["with_localizations"] as const satisfies ReadonlyArray<keyof ListGuildApplicationCommandsRequestQuery>;
Object.freeze(ListGuildApplicationCommandsRequestQueryKeys);
export interface ListGuildApplicationCommandsRequestQuery {
    with_localizations?: (boolean | null);
}
export const ListGuildApplicationCommandsRequestPathKeys = ["application_id","guild_id"] as const satisfies ReadonlyArray<keyof ListGuildApplicationCommandsRequestPath>;
Object.freeze(ListGuildApplicationCommandsRequestPathKeys);
export interface ListGuildApplicationCommandsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export const BulkSetGuildApplicationCommandsRequestPathKeys = ["application_id","guild_id"] as const satisfies ReadonlyArray<keyof BulkSetGuildApplicationCommandsRequestPath>;
Object.freeze(BulkSetGuildApplicationCommandsRequestPathKeys);
export interface BulkSetGuildApplicationCommandsRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export const CreateGuildApplicationCommandRequestPathKeys = ["application_id","guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildApplicationCommandRequestPath>;
Object.freeze(CreateGuildApplicationCommandRequestPathKeys);
export interface CreateGuildApplicationCommandRequestPath {
    application_id: Snowflake;
    guild_id: Snowflake;
}
export const JoinThreadRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof JoinThreadRequestPath>;
Object.freeze(JoinThreadRequestPathKeys);
export interface JoinThreadRequestPath {
    channel_id: Snowflake;
}
export const LeaveThreadRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof LeaveThreadRequestPath>;
Object.freeze(LeaveThreadRequestPathKeys);
export interface LeaveThreadRequestPath {
    channel_id: Snowflake;
}
export const BulkDeleteMessagesRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof BulkDeleteMessagesRequestPath>;
Object.freeze(BulkDeleteMessagesRequestPathKeys);
export interface BulkDeleteMessagesRequestPath {
    channel_id: Snowflake;
}
export const DeleteUserMessageReactionRequestPathKeys = ["channel_id","message_id","emoji_name","user_id"] as const satisfies ReadonlyArray<keyof DeleteUserMessageReactionRequestPath>;
Object.freeze(DeleteUserMessageReactionRequestPathKeys);
export interface DeleteUserMessageReactionRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
    user_id: Snowflake;
}
export const ListMessageReactionsByEmojiRequestQueryKeys = ["after","limit"] as const satisfies ReadonlyArray<keyof ListMessageReactionsByEmojiRequestQuery>;
Object.freeze(ListMessageReactionsByEmojiRequestQueryKeys);
export interface ListMessageReactionsByEmojiRequestQuery {
    after?: (Snowflake | null);
    limit?: (number | null);
}
export const ListMessageReactionsByEmojiRequestPathKeys = ["channel_id","message_id","emoji_name"] as const satisfies ReadonlyArray<keyof ListMessageReactionsByEmojiRequestPath>;
Object.freeze(ListMessageReactionsByEmojiRequestPathKeys);
export interface ListMessageReactionsByEmojiRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export const DeleteAllMessageReactionsByEmojiRequestPathKeys = ["channel_id","message_id","emoji_name"] as const satisfies ReadonlyArray<keyof DeleteAllMessageReactionsByEmojiRequestPath>;
Object.freeze(DeleteAllMessageReactionsByEmojiRequestPathKeys);
export interface DeleteAllMessageReactionsByEmojiRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
    emoji_name: string;
}
export const DeleteAllMessageReactionsRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof DeleteAllMessageReactionsRequestPath>;
Object.freeze(DeleteAllMessageReactionsRequestPathKeys);
export interface DeleteAllMessageReactionsRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const CrosspostMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof CrosspostMessageRequestPath>;
Object.freeze(CrosspostMessageRequestPathKeys);
export interface CrosspostMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const CreateThreadFromMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof CreateThreadFromMessageRequestPath>;
Object.freeze(CreateThreadFromMessageRequestPathKeys);
export interface CreateThreadFromMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const GetOriginalWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof GetOriginalWebhookMessageRequestQuery>;
Object.freeze(GetOriginalWebhookMessageRequestQueryKeys);
export interface GetOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const GetOriginalWebhookMessageRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof GetOriginalWebhookMessageRequestPath>;
Object.freeze(GetOriginalWebhookMessageRequestPathKeys);
export interface GetOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const DeleteOriginalWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof DeleteOriginalWebhookMessageRequestQuery>;
Object.freeze(DeleteOriginalWebhookMessageRequestQueryKeys);
export interface DeleteOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const DeleteOriginalWebhookMessageRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof DeleteOriginalWebhookMessageRequestPath>;
Object.freeze(DeleteOriginalWebhookMessageRequestPathKeys);
export interface DeleteOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const UpdateOriginalWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof UpdateOriginalWebhookMessageRequestQuery>;
Object.freeze(UpdateOriginalWebhookMessageRequestQueryKeys);
export interface UpdateOriginalWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const UpdateOriginalWebhookMessageRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof UpdateOriginalWebhookMessageRequestPath>;
Object.freeze(UpdateOriginalWebhookMessageRequestPathKeys);
export interface UpdateOriginalWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const ListGuildScheduledEventUsersRequestQueryKeys = ["with_member","limit","before","after"] as const satisfies ReadonlyArray<keyof ListGuildScheduledEventUsersRequestQuery>;
Object.freeze(ListGuildScheduledEventUsersRequestQueryKeys);
export interface ListGuildScheduledEventUsersRequestQuery {
    with_member?: (boolean | null);
    limit?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
}
export const ListGuildScheduledEventUsersRequestPathKeys = ["guild_id","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof ListGuildScheduledEventUsersRequestPath>;
Object.freeze(ListGuildScheduledEventUsersRequestPathKeys);
export interface ListGuildScheduledEventUsersRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export const GetAutoModerationRuleRequestPathKeys = ["guild_id","rule_id"] as const satisfies ReadonlyArray<keyof GetAutoModerationRuleRequestPath>;
Object.freeze(GetAutoModerationRuleRequestPathKeys);
export interface GetAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export const DeleteAutoModerationRuleRequestPathKeys = ["guild_id","rule_id"] as const satisfies ReadonlyArray<keyof DeleteAutoModerationRuleRequestPath>;
Object.freeze(DeleteAutoModerationRuleRequestPathKeys);
export interface DeleteAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export const UpdateAutoModerationRuleRequestPathKeys = ["guild_id","rule_id"] as const satisfies ReadonlyArray<keyof UpdateAutoModerationRuleRequestPath>;
Object.freeze(UpdateAutoModerationRuleRequestPathKeys);
export interface UpdateAutoModerationRuleRequestPath {
    guild_id: Snowflake;
    rule_id: Snowflake;
}
export const ListAutoModerationRulesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListAutoModerationRulesRequestPath>;
Object.freeze(ListAutoModerationRulesRequestPathKeys);
export interface ListAutoModerationRulesRequestPath {
    guild_id: Snowflake;
}
export const CreateAutoModerationRuleRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateAutoModerationRuleRequestPath>;
Object.freeze(CreateAutoModerationRuleRequestPathKeys);
export interface CreateAutoModerationRuleRequestPath {
    guild_id: Snowflake;
}
export const UpdateSelfVoiceStateRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof UpdateSelfVoiceStateRequestPath>;
Object.freeze(UpdateSelfVoiceStateRequestPathKeys);
export interface UpdateSelfVoiceStateRequestPath {
    guild_id: Snowflake;
}
export const SearchGuildMembersRequestQueryKeys = ["limit","query"] as const satisfies ReadonlyArray<keyof SearchGuildMembersRequestQuery>;
Object.freeze(SearchGuildMembersRequestQueryKeys);
export interface SearchGuildMembersRequestQuery {
    limit: number;
    query: string;
}
export const SearchGuildMembersRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof SearchGuildMembersRequestPath>;
Object.freeze(SearchGuildMembersRequestPathKeys);
export interface SearchGuildMembersRequestPath {
    guild_id: Snowflake;
}
export const GetActiveGuildThreadsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetActiveGuildThreadsRequestPath>;
Object.freeze(GetActiveGuildThreadsRequestPathKeys);
export interface GetActiveGuildThreadsRequestPath {
    guild_id: Snowflake;
}
export const UpdateMyGuildMemberRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof UpdateMyGuildMemberRequestPath>;
Object.freeze(UpdateMyGuildMemberRequestPathKeys);
export interface UpdateMyGuildMemberRequestPath {
    guild_id: Snowflake;
}
export const AddGuildMemberRoleRequestPathKeys = ["guild_id","user_id","role_id"] as const satisfies ReadonlyArray<keyof AddGuildMemberRoleRequestPath>;
Object.freeze(AddGuildMemberRoleRequestPathKeys);
export interface AddGuildMemberRoleRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    role_id: Snowflake;
}
export const DeleteGuildMemberRoleRequestPathKeys = ["guild_id","user_id","role_id"] as const satisfies ReadonlyArray<keyof DeleteGuildMemberRoleRequestPath>;
Object.freeze(DeleteGuildMemberRoleRequestPathKeys);
export interface DeleteGuildMemberRoleRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
    role_id: Snowflake;
}
export const LeaveGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof LeaveGuildRequestPath>;
Object.freeze(LeaveGuildRequestPathKeys);
export interface LeaveGuildRequestPath {
    guild_id: Snowflake;
}
export const GetApplicationCommandRequestPathKeys = ["application_id","command_id"] as const satisfies ReadonlyArray<keyof GetApplicationCommandRequestPath>;
Object.freeze(GetApplicationCommandRequestPathKeys);
export interface GetApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export const DeleteApplicationCommandRequestPathKeys = ["application_id","command_id"] as const satisfies ReadonlyArray<keyof DeleteApplicationCommandRequestPath>;
Object.freeze(DeleteApplicationCommandRequestPathKeys);
export interface DeleteApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export const UpdateApplicationCommandRequestPathKeys = ["application_id","command_id"] as const satisfies ReadonlyArray<keyof UpdateApplicationCommandRequestPath>;
Object.freeze(UpdateApplicationCommandRequestPathKeys);
export interface UpdateApplicationCommandRequestPath {
    application_id: Snowflake;
    command_id: Snowflake;
}
export const ListApplicationCommandsRequestQueryKeys = ["with_localizations"] as const satisfies ReadonlyArray<keyof ListApplicationCommandsRequestQuery>;
Object.freeze(ListApplicationCommandsRequestQueryKeys);
export interface ListApplicationCommandsRequestQuery {
    with_localizations?: (boolean | null);
}
export const ListApplicationCommandsRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof ListApplicationCommandsRequestPath>;
Object.freeze(ListApplicationCommandsRequestPathKeys);
export interface ListApplicationCommandsRequestPath {
    application_id: Snowflake;
}
export const BulkSetApplicationCommandsRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof BulkSetApplicationCommandsRequestPath>;
Object.freeze(BulkSetApplicationCommandsRequestPathKeys);
export interface BulkSetApplicationCommandsRequestPath {
    application_id: Snowflake;
}
export const CreateApplicationCommandRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof CreateApplicationCommandRequestPath>;
Object.freeze(CreateApplicationCommandRequestPathKeys);
export interface CreateApplicationCommandRequestPath {
    application_id: Snowflake;
}
export const CreateInteractionResponseRequestPathKeys = ["interaction_id","interaction_token"] as const satisfies ReadonlyArray<keyof CreateInteractionResponseRequestPath>;
Object.freeze(CreateInteractionResponseRequestPathKeys);
export interface CreateInteractionResponseRequestPath {
    interaction_id: Snowflake;
    interaction_token: string;
}
export const GetThreadMemberRequestQueryKeys = ["with_member"] as const satisfies ReadonlyArray<keyof GetThreadMemberRequestQuery>;
Object.freeze(GetThreadMemberRequestQueryKeys);
export interface GetThreadMemberRequestQuery {
    with_member?: (boolean | null);
}
export const GetThreadMemberRequestPathKeys = ["channel_id","user_id"] as const satisfies ReadonlyArray<keyof GetThreadMemberRequestPath>;
Object.freeze(GetThreadMemberRequestPathKeys);
export interface GetThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export const AddThreadMemberRequestPathKeys = ["channel_id","user_id"] as const satisfies ReadonlyArray<keyof AddThreadMemberRequestPath>;
Object.freeze(AddThreadMemberRequestPathKeys);
export interface AddThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export const DeleteThreadMemberRequestPathKeys = ["channel_id","user_id"] as const satisfies ReadonlyArray<keyof DeleteThreadMemberRequestPath>;
Object.freeze(DeleteThreadMemberRequestPathKeys);
export interface DeleteThreadMemberRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export const ListThreadMembersRequestQueryKeys = ["with_member","limit","after"] as const satisfies ReadonlyArray<keyof ListThreadMembersRequestQuery>;
Object.freeze(ListThreadMembersRequestQueryKeys);
export interface ListThreadMembersRequestQuery {
    with_member?: (boolean | null);
    limit?: (number | null);
    after?: (Snowflake | null);
}
export const ListThreadMembersRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListThreadMembersRequestPath>;
Object.freeze(ListThreadMembersRequestPathKeys);
export interface ListThreadMembersRequestPath {
    channel_id: Snowflake;
}
export const SetChannelPermissionOverwriteRequestPathKeys = ["channel_id","overwrite_id"] as const satisfies ReadonlyArray<keyof SetChannelPermissionOverwriteRequestPath>;
Object.freeze(SetChannelPermissionOverwriteRequestPathKeys);
export interface SetChannelPermissionOverwriteRequestPath {
    channel_id: Snowflake;
    overwrite_id: Snowflake;
}
export const DeleteChannelPermissionOverwriteRequestPathKeys = ["channel_id","overwrite_id"] as const satisfies ReadonlyArray<keyof DeleteChannelPermissionOverwriteRequestPath>;
Object.freeze(DeleteChannelPermissionOverwriteRequestPathKeys);
export interface DeleteChannelPermissionOverwriteRequestPath {
    channel_id: Snowflake;
    overwrite_id: Snowflake;
}
export const AddGroupDmUserRequestPathKeys = ["channel_id","user_id"] as const satisfies ReadonlyArray<keyof AddGroupDmUserRequestPath>;
Object.freeze(AddGroupDmUserRequestPathKeys);
export interface AddGroupDmUserRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export const DeleteGroupDmUserRequestPathKeys = ["channel_id","user_id"] as const satisfies ReadonlyArray<keyof DeleteGroupDmUserRequestPath>;
Object.freeze(DeleteGroupDmUserRequestPathKeys);
export interface DeleteGroupDmUserRequestPath {
    channel_id: Snowflake;
    user_id: Snowflake;
}
export const FollowChannelRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof FollowChannelRequestPath>;
Object.freeze(FollowChannelRequestPathKeys);
export interface FollowChannelRequestPath {
    channel_id: Snowflake;
}
export const GetMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof GetMessageRequestPath>;
Object.freeze(GetMessageRequestPathKeys);
export interface GetMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const DeleteMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof DeleteMessageRequestPath>;
Object.freeze(DeleteMessageRequestPathKeys);
export interface DeleteMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const UpdateMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof UpdateMessageRequestPath>;
Object.freeze(UpdateMessageRequestPathKeys);
export interface UpdateMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const ListMessagesRequestQueryKeys = ["around","before","after","limit"] as const satisfies ReadonlyArray<keyof ListMessagesRequestQuery>;
Object.freeze(ListMessagesRequestQueryKeys);
export interface ListMessagesRequestQuery {
    around?: (Snowflake | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
}
export const ListMessagesRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListMessagesRequestPath>;
Object.freeze(ListMessagesRequestPathKeys);
export interface ListMessagesRequestPath {
    channel_id: Snowflake;
}
export const CreateMessageRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof CreateMessageRequestPath>;
Object.freeze(CreateMessageRequestPathKeys);
export interface CreateMessageRequestPath {
    channel_id: Snowflake;
}
export const ListChannelWebhooksRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListChannelWebhooksRequestPath>;
Object.freeze(ListChannelWebhooksRequestPathKeys);
export interface ListChannelWebhooksRequestPath {
    channel_id: Snowflake;
}
export const CreateWebhookRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof CreateWebhookRequestPath>;
Object.freeze(CreateWebhookRequestPathKeys);
export interface CreateWebhookRequestPath {
    channel_id: Snowflake;
}
export const ListChannelInvitesRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListChannelInvitesRequestPath>;
Object.freeze(ListChannelInvitesRequestPathKeys);
export interface ListChannelInvitesRequestPath {
    channel_id: Snowflake;
}
export const CreateChannelInviteRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof CreateChannelInviteRequestPath>;
Object.freeze(CreateChannelInviteRequestPathKeys);
export interface CreateChannelInviteRequestPath {
    channel_id: Snowflake;
}
export const CreateThreadRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof CreateThreadRequestPath>;
Object.freeze(CreateThreadRequestPathKeys);
export interface CreateThreadRequestPath {
    channel_id: Snowflake;
}
export const TriggerTypingIndicatorRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof TriggerTypingIndicatorRequestPath>;
Object.freeze(TriggerTypingIndicatorRequestPathKeys);
export interface TriggerTypingIndicatorRequestPath {
    channel_id: Snowflake;
}
export const PinMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof PinMessageRequestPath>;
Object.freeze(PinMessageRequestPathKeys);
export interface PinMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const UnpinMessageRequestPathKeys = ["channel_id","message_id"] as const satisfies ReadonlyArray<keyof UnpinMessageRequestPath>;
Object.freeze(UnpinMessageRequestPathKeys);
export interface UnpinMessageRequestPath {
    channel_id: Snowflake;
    message_id: Snowflake;
}
export const ListPinnedMessagesRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof ListPinnedMessagesRequestPath>;
Object.freeze(ListPinnedMessagesRequestPathKeys);
export interface ListPinnedMessagesRequestPath {
    channel_id: Snowflake;
}
export const GetWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof GetWebhookMessageRequestQuery>;
Object.freeze(GetWebhookMessageRequestQueryKeys);
export interface GetWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const GetWebhookMessageRequestPathKeys = ["webhook_id","webhook_token","message_id"] as const satisfies ReadonlyArray<keyof GetWebhookMessageRequestPath>;
Object.freeze(GetWebhookMessageRequestPathKeys);
export interface GetWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export const DeleteWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof DeleteWebhookMessageRequestQuery>;
Object.freeze(DeleteWebhookMessageRequestQueryKeys);
export interface DeleteWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const DeleteWebhookMessageRequestPathKeys = ["webhook_id","webhook_token","message_id"] as const satisfies ReadonlyArray<keyof DeleteWebhookMessageRequestPath>;
Object.freeze(DeleteWebhookMessageRequestPathKeys);
export interface DeleteWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export const UpdateWebhookMessageRequestQueryKeys = ["thread_id"] as const satisfies ReadonlyArray<keyof UpdateWebhookMessageRequestQuery>;
Object.freeze(UpdateWebhookMessageRequestQueryKeys);
export interface UpdateWebhookMessageRequestQuery {
    thread_id?: (Snowflake | null);
}
export const UpdateWebhookMessageRequestPathKeys = ["webhook_id","webhook_token","message_id"] as const satisfies ReadonlyArray<keyof UpdateWebhookMessageRequestPath>;
Object.freeze(UpdateWebhookMessageRequestPathKeys);
export interface UpdateWebhookMessageRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
    message_id: Snowflake;
}
export const ExecuteGithubCompatibleWebhookRequestQueryKeys = ["wait","thread_id"] as const satisfies ReadonlyArray<keyof ExecuteGithubCompatibleWebhookRequestQuery>;
Object.freeze(ExecuteGithubCompatibleWebhookRequestQueryKeys);
export interface ExecuteGithubCompatibleWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export const ExecuteGithubCompatibleWebhookRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof ExecuteGithubCompatibleWebhookRequestPath>;
Object.freeze(ExecuteGithubCompatibleWebhookRequestPathKeys);
export interface ExecuteGithubCompatibleWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const ExecuteSlackCompatibleWebhookRequestQueryKeys = ["wait","thread_id"] as const satisfies ReadonlyArray<keyof ExecuteSlackCompatibleWebhookRequestQuery>;
Object.freeze(ExecuteSlackCompatibleWebhookRequestQueryKeys);
export interface ExecuteSlackCompatibleWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export const ExecuteSlackCompatibleWebhookRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof ExecuteSlackCompatibleWebhookRequestPath>;
Object.freeze(ExecuteSlackCompatibleWebhookRequestPathKeys);
export interface ExecuteSlackCompatibleWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const GetGuildTemplateRequestPathKeys = ["code"] as const satisfies ReadonlyArray<keyof GetGuildTemplateRequestPath>;
Object.freeze(GetGuildTemplateRequestPathKeys);
export interface GetGuildTemplateRequestPath {
    code: string;
}
export const CreateGuildFromTemplateRequestPathKeys = ["code"] as const satisfies ReadonlyArray<keyof CreateGuildFromTemplateRequestPath>;
Object.freeze(CreateGuildFromTemplateRequestPathKeys);
export interface CreateGuildFromTemplateRequestPath {
    code: string;
}
export const GetGuildNewMemberWelcomeRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildNewMemberWelcomeRequestPath>;
Object.freeze(GetGuildNewMemberWelcomeRequestPathKeys);
export interface GetGuildNewMemberWelcomeRequestPath {
    guild_id: Snowflake;
}
export const GetGuildScheduledEventRequestQueryKeys = ["with_user_count"] as const satisfies ReadonlyArray<keyof GetGuildScheduledEventRequestQuery>;
Object.freeze(GetGuildScheduledEventRequestQueryKeys);
export interface GetGuildScheduledEventRequestQuery {
    with_user_count?: (boolean | null);
}
export const GetGuildScheduledEventRequestPathKeys = ["guild_id","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof GetGuildScheduledEventRequestPath>;
Object.freeze(GetGuildScheduledEventRequestPathKeys);
export interface GetGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export const DeleteGuildScheduledEventRequestPathKeys = ["guild_id","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof DeleteGuildScheduledEventRequestPath>;
Object.freeze(DeleteGuildScheduledEventRequestPathKeys);
export interface DeleteGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export const UpdateGuildScheduledEventRequestPathKeys = ["guild_id","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof UpdateGuildScheduledEventRequestPath>;
Object.freeze(UpdateGuildScheduledEventRequestPathKeys);
export interface UpdateGuildScheduledEventRequestPath {
    guild_id: Snowflake;
    guild_scheduled_event_id: Snowflake;
}
export const ListGuildScheduledEventsRequestQueryKeys = ["with_user_count"] as const satisfies ReadonlyArray<keyof ListGuildScheduledEventsRequestQuery>;
Object.freeze(ListGuildScheduledEventsRequestQueryKeys);
export interface ListGuildScheduledEventsRequestQuery {
    with_user_count?: (boolean | null);
}
export const ListGuildScheduledEventsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildScheduledEventsRequestPath>;
Object.freeze(ListGuildScheduledEventsRequestPathKeys);
export interface ListGuildScheduledEventsRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildScheduledEventRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildScheduledEventRequestPath>;
Object.freeze(CreateGuildScheduledEventRequestPathKeys);
export interface CreateGuildScheduledEventRequestPath {
    guild_id: Snowflake;
}
export const GetGuildWelcomeScreenRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildWelcomeScreenRequestPath>;
Object.freeze(GetGuildWelcomeScreenRequestPathKeys);
export interface GetGuildWelcomeScreenRequestPath {
    guild_id: Snowflake;
}
export const UpdateGuildWelcomeScreenRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof UpdateGuildWelcomeScreenRequestPath>;
Object.freeze(UpdateGuildWelcomeScreenRequestPathKeys);
export interface UpdateGuildWelcomeScreenRequestPath {
    guild_id: Snowflake;
}
export const UpdateVoiceStateRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof UpdateVoiceStateRequestPath>;
Object.freeze(UpdateVoiceStateRequestPathKeys);
export interface UpdateVoiceStateRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const DeleteGuildIntegrationRequestPathKeys = ["guild_id","integration_id"] as const satisfies ReadonlyArray<keyof DeleteGuildIntegrationRequestPath>;
Object.freeze(DeleteGuildIntegrationRequestPathKeys);
export interface DeleteGuildIntegrationRequestPath {
    guild_id: Snowflake;
    integration_id: Snowflake;
}
export const ListGuildIntegrationsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildIntegrationsRequestPath>;
Object.freeze(ListGuildIntegrationsRequestPathKeys);
export interface ListGuildIntegrationsRequestPath {
    guild_id: Snowflake;
}
export const GetGuildWidgetRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildWidgetRequestPath>;
Object.freeze(GetGuildWidgetRequestPathKeys);
export interface GetGuildWidgetRequestPath {
    guild_id: Snowflake;
}
export const GetGuildsOnboardingRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildsOnboardingRequestPath>;
Object.freeze(GetGuildsOnboardingRequestPathKeys);
export interface GetGuildsOnboardingRequestPath {
    guild_id: Snowflake;
}
export const PutGuildsOnboardingRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof PutGuildsOnboardingRequestPath>;
Object.freeze(PutGuildsOnboardingRequestPathKeys);
export interface PutGuildsOnboardingRequestPath {
    guild_id: Snowflake;
}
export const GetGuildVanityUrlRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildVanityUrlRequestPath>;
Object.freeze(GetGuildVanityUrlRequestPathKeys);
export interface GetGuildVanityUrlRequestPath {
    guild_id: Snowflake;
}
export const ListGuildAuditLogEntriesRequestQueryKeys = ["user_id","action_type","before","after","limit"] as const satisfies ReadonlyArray<keyof ListGuildAuditLogEntriesRequestQuery>;
Object.freeze(ListGuildAuditLogEntriesRequestQueryKeys);
export interface ListGuildAuditLogEntriesRequestQuery {
    user_id?: (Snowflake | null);
    action_type?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
    limit?: (number | null);
}
export const ListGuildAuditLogEntriesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildAuditLogEntriesRequestPath>;
Object.freeze(ListGuildAuditLogEntriesRequestPathKeys);
export interface ListGuildAuditLogEntriesRequestPath {
    guild_id: Snowflake;
}
export const GetGuildWidgetPngRequestQueryKeys = ["style"] as const satisfies ReadonlyArray<keyof GetGuildWidgetPngRequestQuery>;
Object.freeze(GetGuildWidgetPngRequestQueryKeys);
export interface GetGuildWidgetPngRequestQuery {
    style?: (null | WidgetImageStyle);
}
export const GetGuildWidgetPngRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildWidgetPngRequestPath>;
Object.freeze(GetGuildWidgetPngRequestPathKeys);
export interface GetGuildWidgetPngRequestPath {
    guild_id: Snowflake;
}
export const SyncGuildTemplateRequestPathKeys = ["guild_id","code"] as const satisfies ReadonlyArray<keyof SyncGuildTemplateRequestPath>;
Object.freeze(SyncGuildTemplateRequestPathKeys);
export interface SyncGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export const DeleteGuildTemplateRequestPathKeys = ["guild_id","code"] as const satisfies ReadonlyArray<keyof DeleteGuildTemplateRequestPath>;
Object.freeze(DeleteGuildTemplateRequestPathKeys);
export interface DeleteGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export const UpdateGuildTemplateRequestPathKeys = ["guild_id","code"] as const satisfies ReadonlyArray<keyof UpdateGuildTemplateRequestPath>;
Object.freeze(UpdateGuildTemplateRequestPathKeys);
export interface UpdateGuildTemplateRequestPath {
    guild_id: Snowflake;
    code: string;
}
export const ListGuildTemplatesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildTemplatesRequestPath>;
Object.freeze(ListGuildTemplatesRequestPathKeys);
export interface ListGuildTemplatesRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildTemplateRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildTemplateRequestPath>;
Object.freeze(CreateGuildTemplateRequestPathKeys);
export interface CreateGuildTemplateRequestPath {
    guild_id: Snowflake;
}
export const GetGuildStickerRequestPathKeys = ["guild_id","sticker_id"] as const satisfies ReadonlyArray<keyof GetGuildStickerRequestPath>;
Object.freeze(GetGuildStickerRequestPathKeys);
export interface GetGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export const DeleteGuildStickerRequestPathKeys = ["guild_id","sticker_id"] as const satisfies ReadonlyArray<keyof DeleteGuildStickerRequestPath>;
Object.freeze(DeleteGuildStickerRequestPathKeys);
export interface DeleteGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export const UpdateGuildStickerRequestPathKeys = ["guild_id","sticker_id"] as const satisfies ReadonlyArray<keyof UpdateGuildStickerRequestPath>;
Object.freeze(UpdateGuildStickerRequestPathKeys);
export interface UpdateGuildStickerRequestPath {
    guild_id: Snowflake;
    sticker_id: Snowflake;
}
export const ListGuildChannelsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildChannelsRequestPath>;
Object.freeze(ListGuildChannelsRequestPathKeys);
export interface ListGuildChannelsRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildChannelRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildChannelRequestPath>;
Object.freeze(CreateGuildChannelRequestPathKeys);
export interface CreateGuildChannelRequestPath {
    guild_id: Snowflake;
}
export const BulkUpdateGuildChannelsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof BulkUpdateGuildChannelsRequestPath>;
Object.freeze(BulkUpdateGuildChannelsRequestPathKeys);
export interface BulkUpdateGuildChannelsRequestPath {
    guild_id: Snowflake;
}
export const ListGuildStickersRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildStickersRequestPath>;
Object.freeze(ListGuildStickersRequestPathKeys);
export interface ListGuildStickersRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildStickerRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildStickerRequestPath>;
Object.freeze(CreateGuildStickerRequestPathKeys);
export interface CreateGuildStickerRequestPath {
    guild_id: Snowflake;
}
export const GetGuildWebhooksRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildWebhooksRequestPath>;
Object.freeze(GetGuildWebhooksRequestPathKeys);
export interface GetGuildWebhooksRequestPath {
    guild_id: Snowflake;
}
export const GetGuildMemberRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof GetGuildMemberRequestPath>;
Object.freeze(GetGuildMemberRequestPathKeys);
export interface GetGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const AddGuildMemberRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof AddGuildMemberRequestPath>;
Object.freeze(AddGuildMemberRequestPathKeys);
export interface AddGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const DeleteGuildMemberRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof DeleteGuildMemberRequestPath>;
Object.freeze(DeleteGuildMemberRequestPathKeys);
export interface DeleteGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const UpdateGuildMemberRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof UpdateGuildMemberRequestPath>;
Object.freeze(UpdateGuildMemberRequestPathKeys);
export interface UpdateGuildMemberRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const ListGuildMembersRequestQueryKeys = ["limit","after"] as const satisfies ReadonlyArray<keyof ListGuildMembersRequestQuery>;
Object.freeze(ListGuildMembersRequestQueryKeys);
export interface ListGuildMembersRequestQuery {
    limit?: (number | null);
    after?: (number | null);
}
export const ListGuildMembersRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildMembersRequestPath>;
Object.freeze(ListGuildMembersRequestPathKeys);
export interface ListGuildMembersRequestPath {
    guild_id: Snowflake;
}
export const GetGuildPreviewRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildPreviewRequestPath>;
Object.freeze(GetGuildPreviewRequestPathKeys);
export interface GetGuildPreviewRequestPath {
    guild_id: Snowflake;
}
export const ListGuildInvitesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildInvitesRequestPath>;
Object.freeze(ListGuildInvitesRequestPathKeys);
export interface ListGuildInvitesRequestPath {
    guild_id: Snowflake;
}
export const ListGuildVoiceRegionsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildVoiceRegionsRequestPath>;
Object.freeze(ListGuildVoiceRegionsRequestPathKeys);
export interface ListGuildVoiceRegionsRequestPath {
    guild_id: Snowflake;
}
export const GetGuildEmojiRequestPathKeys = ["guild_id","emoji_id"] as const satisfies ReadonlyArray<keyof GetGuildEmojiRequestPath>;
Object.freeze(GetGuildEmojiRequestPathKeys);
export interface GetGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export const DeleteGuildEmojiRequestPathKeys = ["guild_id","emoji_id"] as const satisfies ReadonlyArray<keyof DeleteGuildEmojiRequestPath>;
Object.freeze(DeleteGuildEmojiRequestPathKeys);
export interface DeleteGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export const UpdateGuildEmojiRequestPathKeys = ["guild_id","emoji_id"] as const satisfies ReadonlyArray<keyof UpdateGuildEmojiRequestPath>;
Object.freeze(UpdateGuildEmojiRequestPathKeys);
export interface UpdateGuildEmojiRequestPath {
    guild_id: Snowflake;
    emoji_id: Snowflake;
}
export const ListGuildEmojisRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildEmojisRequestPath>;
Object.freeze(ListGuildEmojisRequestPathKeys);
export interface ListGuildEmojisRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildEmojiRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildEmojiRequestPath>;
Object.freeze(CreateGuildEmojiRequestPathKeys);
export interface CreateGuildEmojiRequestPath {
    guild_id: Snowflake;
}
export const GetGuildWidgetSettingsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildWidgetSettingsRequestPath>;
Object.freeze(GetGuildWidgetSettingsRequestPathKeys);
export interface GetGuildWidgetSettingsRequestPath {
    guild_id: Snowflake;
}
export const UpdateGuildWidgetSettingsRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof UpdateGuildWidgetSettingsRequestPath>;
Object.freeze(UpdateGuildWidgetSettingsRequestPathKeys);
export interface UpdateGuildWidgetSettingsRequestPath {
    guild_id: Snowflake;
}
export const DeleteGuildRoleRequestPathKeys = ["guild_id","role_id"] as const satisfies ReadonlyArray<keyof DeleteGuildRoleRequestPath>;
Object.freeze(DeleteGuildRoleRequestPathKeys);
export interface DeleteGuildRoleRequestPath {
    guild_id: Snowflake;
    role_id: Snowflake;
}
export const UpdateGuildRoleRequestPathKeys = ["guild_id","role_id"] as const satisfies ReadonlyArray<keyof UpdateGuildRoleRequestPath>;
Object.freeze(UpdateGuildRoleRequestPathKeys);
export interface UpdateGuildRoleRequestPath {
    guild_id: Snowflake;
    role_id: Snowflake;
}
export const ListGuildRolesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildRolesRequestPath>;
Object.freeze(ListGuildRolesRequestPathKeys);
export interface ListGuildRolesRequestPath {
    guild_id: Snowflake;
}
export const CreateGuildRoleRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof CreateGuildRoleRequestPath>;
Object.freeze(CreateGuildRoleRequestPathKeys);
export interface CreateGuildRoleRequestPath {
    guild_id: Snowflake;
}
export const BulkUpdateGuildRolesRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof BulkUpdateGuildRolesRequestPath>;
Object.freeze(BulkUpdateGuildRolesRequestPathKeys);
export interface BulkUpdateGuildRolesRequestPath {
    guild_id: Snowflake;
}
export const PreviewPruneGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof PreviewPruneGuildRequestPath>;
Object.freeze(PreviewPruneGuildRequestPathKeys);
export interface PreviewPruneGuildRequestPath {
    guild_id: Snowflake;
}
export const PruneGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof PruneGuildRequestPath>;
Object.freeze(PruneGuildRequestPathKeys);
export interface PruneGuildRequestPath {
    guild_id: Snowflake;
}
export const GetGuildBanRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof GetGuildBanRequestPath>;
Object.freeze(GetGuildBanRequestPathKeys);
export interface GetGuildBanRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const BanUserFromGuildRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof BanUserFromGuildRequestPath>;
Object.freeze(BanUserFromGuildRequestPathKeys);
export interface BanUserFromGuildRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const UnbanUserFromGuildRequestPathKeys = ["guild_id","user_id"] as const satisfies ReadonlyArray<keyof UnbanUserFromGuildRequestPath>;
Object.freeze(UnbanUserFromGuildRequestPathKeys);
export interface UnbanUserFromGuildRequestPath {
    guild_id: Snowflake;
    user_id: Snowflake;
}
export const ListGuildBansRequestQueryKeys = ["limit","before","after"] as const satisfies ReadonlyArray<keyof ListGuildBansRequestQuery>;
Object.freeze(ListGuildBansRequestQueryKeys);
export interface ListGuildBansRequestQuery {
    limit?: (number | null);
    before?: (Snowflake | null);
    after?: (Snowflake | null);
}
export const ListGuildBansRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof ListGuildBansRequestPath>;
Object.freeze(ListGuildBansRequestPathKeys);
export interface ListGuildBansRequestPath {
    guild_id: Snowflake;
}
export const SetGuildMfaLevelRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof SetGuildMfaLevelRequestPath>;
Object.freeze(SetGuildMfaLevelRequestPathKeys);
export interface SetGuildMfaLevelRequestPath {
    guild_id: Snowflake;
}
export const GetStageInstanceRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof GetStageInstanceRequestPath>;
Object.freeze(GetStageInstanceRequestPathKeys);
export interface GetStageInstanceRequestPath {
    channel_id: Snowflake;
}
export const DeleteStageInstanceRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof DeleteStageInstanceRequestPath>;
Object.freeze(DeleteStageInstanceRequestPathKeys);
export interface DeleteStageInstanceRequestPath {
    channel_id: Snowflake;
}
export const UpdateStageInstanceRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof UpdateStageInstanceRequestPath>;
Object.freeze(UpdateStageInstanceRequestPathKeys);
export interface UpdateStageInstanceRequestPath {
    channel_id: Snowflake;
}
export const GetApplicationRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof GetApplicationRequestPath>;
Object.freeze(GetApplicationRequestPathKeys);
export interface GetApplicationRequestPath {
    application_id: Snowflake;
}
export const UpdateApplicationRequestPathKeys = ["application_id"] as const satisfies ReadonlyArray<keyof UpdateApplicationRequestPath>;
Object.freeze(UpdateApplicationRequestPathKeys);
export interface UpdateApplicationRequestPath {
    application_id: Snowflake;
}
export const GetWebhookByTokenRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof GetWebhookByTokenRequestPath>;
Object.freeze(GetWebhookByTokenRequestPathKeys);
export interface GetWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const ExecuteWebhookRequestQueryKeys = ["wait","thread_id"] as const satisfies ReadonlyArray<keyof ExecuteWebhookRequestQuery>;
Object.freeze(ExecuteWebhookRequestQueryKeys);
export interface ExecuteWebhookRequestQuery {
    wait?: (boolean | null);
    thread_id?: (Snowflake | null);
}
export const ExecuteWebhookRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof ExecuteWebhookRequestPath>;
Object.freeze(ExecuteWebhookRequestPathKeys);
export interface ExecuteWebhookRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const DeleteWebhookByTokenRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof DeleteWebhookByTokenRequestPath>;
Object.freeze(DeleteWebhookByTokenRequestPathKeys);
export interface DeleteWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const UpdateWebhookByTokenRequestPathKeys = ["webhook_id","webhook_token"] as const satisfies ReadonlyArray<keyof UpdateWebhookByTokenRequestPath>;
Object.freeze(UpdateWebhookByTokenRequestPathKeys);
export interface UpdateWebhookByTokenRequestPath {
    webhook_id: Snowflake;
    webhook_token: string;
}
export const GetChannelRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof GetChannelRequestPath>;
Object.freeze(GetChannelRequestPathKeys);
export interface GetChannelRequestPath {
    channel_id: Snowflake;
}
export const DeleteChannelRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof DeleteChannelRequestPath>;
Object.freeze(DeleteChannelRequestPathKeys);
export interface DeleteChannelRequestPath {
    channel_id: Snowflake;
}
export const UpdateChannelRequestPathKeys = ["channel_id"] as const satisfies ReadonlyArray<keyof UpdateChannelRequestPath>;
Object.freeze(UpdateChannelRequestPathKeys);
export interface UpdateChannelRequestPath {
    channel_id: Snowflake;
}
export const GetStickerRequestPathKeys = ["sticker_id"] as const satisfies ReadonlyArray<keyof GetStickerRequestPath>;
Object.freeze(GetStickerRequestPathKeys);
export interface GetStickerRequestPath {
    sticker_id: Snowflake;
}
export const GetWebhookRequestPathKeys = ["webhook_id"] as const satisfies ReadonlyArray<keyof GetWebhookRequestPath>;
Object.freeze(GetWebhookRequestPathKeys);
export interface GetWebhookRequestPath {
    webhook_id: Snowflake;
}
export const DeleteWebhookRequestPathKeys = ["webhook_id"] as const satisfies ReadonlyArray<keyof DeleteWebhookRequestPath>;
Object.freeze(DeleteWebhookRequestPathKeys);
export interface DeleteWebhookRequestPath {
    webhook_id: Snowflake;
}
export const UpdateWebhookRequestPathKeys = ["webhook_id"] as const satisfies ReadonlyArray<keyof UpdateWebhookRequestPath>;
Object.freeze(UpdateWebhookRequestPathKeys);
export interface UpdateWebhookRequestPath {
    webhook_id: Snowflake;
}
export const InviteResolveRequestQueryKeys = ["with_counts","guild_scheduled_event_id"] as const satisfies ReadonlyArray<keyof InviteResolveRequestQuery>;
Object.freeze(InviteResolveRequestQueryKeys);
export interface InviteResolveRequestQuery {
    with_counts?: (boolean | null);
    guild_scheduled_event_id?: (Snowflake | null);
}
export const InviteResolveRequestPathKeys = ["code"] as const satisfies ReadonlyArray<keyof InviteResolveRequestPath>;
Object.freeze(InviteResolveRequestPathKeys);
export interface InviteResolveRequestPath {
    code: string;
}
export const InviteRevokeRequestPathKeys = ["code"] as const satisfies ReadonlyArray<keyof InviteRevokeRequestPath>;
Object.freeze(InviteRevokeRequestPathKeys);
export interface InviteRevokeRequestPath {
    code: string;
}
export const GetGuildRequestQueryKeys = ["with_counts"] as const satisfies ReadonlyArray<keyof GetGuildRequestQuery>;
Object.freeze(GetGuildRequestQueryKeys);
export interface GetGuildRequestQuery {
    with_counts?: (boolean | null);
}
export const GetGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof GetGuildRequestPath>;
Object.freeze(GetGuildRequestPathKeys);
export interface GetGuildRequestPath {
    guild_id: Snowflake;
}
export const DeleteGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof DeleteGuildRequestPath>;
Object.freeze(DeleteGuildRequestPathKeys);
export interface DeleteGuildRequestPath {
    guild_id: Snowflake;
}
export const UpdateGuildRequestPathKeys = ["guild_id"] as const satisfies ReadonlyArray<keyof UpdateGuildRequestPath>;
Object.freeze(UpdateGuildRequestPathKeys);
export interface UpdateGuildRequestPath {
    guild_id: Snowflake;
}
export const GetUserRequestPathKeys = ["user_id"] as const satisfies ReadonlyArray<keyof GetUserRequestPath>;
Object.freeze(GetUserRequestPathKeys);
export interface GetUserRequestPath {
    user_id: Snowflake;
}
export type UpdateMyUserRequestJSON = BotAccountPatchRequestPartial;
export const CreateStageInstanceRequestJSONKeys = ["topic","channel_id","privacy_level","guild_scheduled_event_id","send_start_notification"] as const satisfies ReadonlyArray<keyof CreateStageInstanceRequestJSON>;
Object.freeze(CreateStageInstanceRequestJSONKeys);
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
export const SetGuildApplicationCommandPermissionsRequestJSONKeys = ["permissions"] as const satisfies ReadonlyArray<keyof SetGuildApplicationCommandPermissionsRequestJSON>;
Object.freeze(SetGuildApplicationCommandPermissionsRequestJSONKeys);
export interface SetGuildApplicationCommandPermissionsRequestJSON {
    /**
     * @maxItems 100
     */
    permissions?: (Array<ApplicationCommandPermission> | null);
}
export const UpdateApplicationUserRoleConnectionRequestJSONKeys = ["platform_name","platform_username","metadata"] as const satisfies ReadonlyArray<keyof UpdateApplicationUserRoleConnectionRequestJSON>;
Object.freeze(UpdateApplicationUserRoleConnectionRequestJSONKeys);
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
/**
 * @maxItems 5
 */
export type UpdateApplicationRoleConnectionsMetadataRequestJSON = Array<ApplicationRoleConnectionsMetadataItemRequest> | null;
export const UpdateGuildApplicationCommandRequestJSONKeys = ["name","name_localizations","description","description_localizations","options","default_member_permissions","dm_permission"] as const satisfies ReadonlyArray<keyof UpdateGuildApplicationCommandRequestJSON>;
Object.freeze(UpdateGuildApplicationCommandRequestJSONKeys);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}>;
export const CreateGuildApplicationCommandRequestJSONKeys = ["name","name_localizations","description","description_localizations","options","default_member_permissions","dm_permission","type"] as const satisfies ReadonlyArray<keyof CreateGuildApplicationCommandRequestJSON>;
Object.freeze(CreateGuildApplicationCommandRequestJSONKeys);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}
export const BulkDeleteMessagesRequestJSONKeys = ["messages"] as const satisfies ReadonlyArray<keyof BulkDeleteMessagesRequestJSON>;
Object.freeze(BulkDeleteMessagesRequestJSONKeys);
export interface BulkDeleteMessagesRequestJSON {
    /**
     * @maxItems 1521
     * @distinct 
     */
    messages?: (Array<Snowflake> | null);
}
export type UpdateOriginalWebhookMessageRequestFormData = IncomingWebhookUpdateRequestPartial & {
    "files[0]"?: BinaryData;
    "files[1]"?: BinaryData;
    "files[2]"?: BinaryData;
    "files[3]"?: BinaryData;
    "files[4]"?: BinaryData;
    "files[5]"?: BinaryData;
    "files[6]"?: BinaryData;
    "files[7]"?: BinaryData;
    "files[8]"?: BinaryData;
    "files[9]"?: BinaryData;
};
export type UpdateAutoModerationRuleRequestJSON = DefaultKeywordListUpsertRequestPartial | KeywordUpsertRequestPartial | MLSpamUpsertRequestPartial | MentionSpamUpsertRequestPartial;
export type CreateAutoModerationRuleRequestJSON = DefaultKeywordListUpsertRequest | KeywordUpsertRequest | MLSpamUpsertRequest | MentionSpamUpsertRequest;
export const UpdateSelfVoiceStateRequestJSONKeys = ["request_to_speak_timestamp","suppress","channel_id"] as const satisfies ReadonlyArray<keyof UpdateSelfVoiceStateRequestJSON>;
Object.freeze(UpdateSelfVoiceStateRequestJSONKeys);
export interface UpdateSelfVoiceStateRequestJSON {
    request_to_speak_timestamp?: (ISO8601DateTime | null);
    suppress?: (boolean | null);
    channel_id?: (Snowflake | null);
}
export const UpdateMyGuildMemberRequestJSONKeys = ["nick"] as const satisfies ReadonlyArray<keyof UpdateMyGuildMemberRequestJSON>;
Object.freeze(UpdateMyGuildMemberRequestJSONKeys);
export interface UpdateMyGuildMemberRequestJSON {
    /**
     * @maxLength 32
     */
    nick?: (string | null);
}
export const UpdateApplicationCommandRequestJSONKeys = ["name","name_localizations","description","description_localizations","options","default_member_permissions","dm_permission"] as const satisfies ReadonlyArray<keyof UpdateApplicationCommandRequestJSON>;
Object.freeze(UpdateApplicationCommandRequestJSONKeys);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}>;
export const CreateApplicationCommandRequestJSONKeys = ["name","name_localizations","description","description_localizations","options","default_member_permissions","dm_permission","type"] as const satisfies ReadonlyArray<keyof CreateApplicationCommandRequestJSON>;
Object.freeze(CreateApplicationCommandRequestJSONKeys);
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
     * @maximum 281474976710655
     * @minimum 0
     */
    default_member_permissions?: (number | null);
    dm_permission?: (boolean | null);
    type: ApplicationCommandType;
}
export type CreateInteractionResponseRequestJSON = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export type CreateInteractionResponseRequestURLEncoded = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export type CreateInteractionResponseRequestFormData = ApplicationCommandAutocompleteCallbackRequest | CreateMessageInteractionCallbackRequest | ModalInteractionCallbackRequest | PongInteractionCallbackRequest | UpdateMessageInteractionCallbackRequest;
export const SetChannelPermissionOverwriteRequestJSONKeys = ["type","allow","deny"] as const satisfies ReadonlyArray<keyof SetChannelPermissionOverwriteRequestJSON>;
Object.freeze(SetChannelPermissionOverwriteRequestJSONKeys);
export interface SetChannelPermissionOverwriteRequestJSON {
    type?: (null | ChannelPermissionOverwrite);
    allow?: (number | null);
    deny?: (number | null);
}
export const FollowChannelRequestJSONKeys = ["webhook_channel_id"] as const satisfies ReadonlyArray<keyof FollowChannelRequestJSON>;
Object.freeze(FollowChannelRequestJSONKeys);
export interface FollowChannelRequestJSON {
    webhook_channel_id: Snowflake;
}
export type UpdateMessageRequestFormData = MessageEditRequestPartial & {
    "files[0]"?: BinaryData;
    "files[1]"?: BinaryData;
    "files[2]"?: BinaryData;
    "files[3]"?: BinaryData;
    "files[4]"?: BinaryData;
    "files[5]"?: BinaryData;
    "files[6]"?: BinaryData;
    "files[7]"?: BinaryData;
    "files[8]"?: BinaryData;
    "files[9]"?: BinaryData;
};
export type CreateMessageRequestFormData = MessageCreateRequest & {
    "files[0]"?: BinaryData;
    "files[1]"?: BinaryData;
    "files[2]"?: BinaryData;
    "files[3]"?: BinaryData;
    "files[4]"?: BinaryData;
    "files[5]"?: BinaryData;
    "files[6]"?: BinaryData;
    "files[7]"?: BinaryData;
    "files[8]"?: BinaryData;
    "files[9]"?: BinaryData;
};
export const CreateWebhookRequestJSONKeys = ["name","avatar"] as const satisfies ReadonlyArray<keyof CreateWebhookRequestJSON>;
Object.freeze(CreateWebhookRequestJSONKeys);
export interface CreateWebhookRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name: string;
    avatar?: (Base64String | null);
}
export type CreateChannelInviteRequestJSON = CreateGroupDMInviteRequest | CreateGuildInviteRequest;
export type CreateThreadRequestJSON = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export type CreateThreadRequestURLEncoded = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export type CreateThreadRequestFormData = CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
export type UpdateWebhookMessageRequestFormData = IncomingWebhookUpdateRequestPartial & {
    "files[0]"?: BinaryData;
    "files[1]"?: BinaryData;
    "files[2]"?: BinaryData;
    "files[3]"?: BinaryData;
    "files[4]"?: BinaryData;
    "files[5]"?: BinaryData;
    "files[6]"?: BinaryData;
    "files[7]"?: BinaryData;
    "files[8]"?: BinaryData;
    "files[9]"?: BinaryData;
};
export const CreateGuildFromTemplateRequestJSONKeys = ["name","icon"] as const satisfies ReadonlyArray<keyof CreateGuildFromTemplateRequestJSON>;
Object.freeze(CreateGuildFromTemplateRequestJSONKeys);
export interface CreateGuildFromTemplateRequestJSON {
    /**
     * @maxLength 100
     * @minLength 2
     */
    name: string;
    icon?: (Base64String | null);
}
export type UpdateGuildScheduledEventRequestJSON = ExternalScheduledEventPatchRequestPartial | StageScheduledEventPatchRequestPartial | VoiceScheduledEventPatchRequestPartial;
export type CreateGuildScheduledEventRequestJSON = ExternalScheduledEventCreateRequest | StageScheduledEventCreateRequest | VoiceScheduledEventCreateRequest;
export const UpdateVoiceStateRequestJSONKeys = ["suppress","channel_id"] as const satisfies ReadonlyArray<keyof UpdateVoiceStateRequestJSON>;
Object.freeze(UpdateVoiceStateRequestJSONKeys);
export interface UpdateVoiceStateRequestJSON {
    suppress?: (boolean | null);
    channel_id?: (Snowflake | null);
}
export const UpdateGuildTemplateRequestJSONKeys = ["name","description"] as const satisfies ReadonlyArray<keyof UpdateGuildTemplateRequestJSON>;
Object.freeze(UpdateGuildTemplateRequestJSONKeys);
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
export const CreateGuildTemplateRequestJSONKeys = ["name","description"] as const satisfies ReadonlyArray<keyof CreateGuildTemplateRequestJSON>;
Object.freeze(CreateGuildTemplateRequestJSONKeys);
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
export const UpdateGuildStickerRequestJSONKeys = ["name","tags","description"] as const satisfies ReadonlyArray<keyof UpdateGuildStickerRequestJSON>;
Object.freeze(UpdateGuildStickerRequestJSONKeys);
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
export const CreateGuildStickerRequestFormDataKeys = ["name","tags","description","file"] as const satisfies ReadonlyArray<keyof CreateGuildStickerRequestFormData>;
Object.freeze(CreateGuildStickerRequestFormDataKeys);
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
    file: BinaryData;
}
export const AddGuildMemberRequestJSONKeys = ["nick","roles","mute","deaf","access_token","flags"] as const satisfies ReadonlyArray<keyof AddGuildMemberRequestJSON>;
Object.freeze(AddGuildMemberRequestJSONKeys);
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
export const UpdateGuildMemberRequestJSONKeys = ["nick","roles","mute","deaf","channel_id","communication_disabled_until","flags"] as const satisfies ReadonlyArray<keyof UpdateGuildMemberRequestJSON>;
Object.freeze(UpdateGuildMemberRequestJSONKeys);
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
export const UpdateGuildEmojiRequestJSONKeys = ["name","roles"] as const satisfies ReadonlyArray<keyof UpdateGuildEmojiRequestJSON>;
Object.freeze(UpdateGuildEmojiRequestJSONKeys);
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
export const CreateGuildEmojiRequestJSONKeys = ["name","image","roles"] as const satisfies ReadonlyArray<keyof CreateGuildEmojiRequestJSON>;
Object.freeze(CreateGuildEmojiRequestJSONKeys);
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
export const UpdateGuildWidgetSettingsRequestJSONKeys = ["channel_id","enabled"] as const satisfies ReadonlyArray<keyof UpdateGuildWidgetSettingsRequestJSON>;
Object.freeze(UpdateGuildWidgetSettingsRequestJSONKeys);
export interface UpdateGuildWidgetSettingsRequestJSON {
    channel_id?: (Snowflake | null);
    enabled?: (boolean | null);
}
export const UpdateGuildRoleRequestJSONKeys = ["name","permissions","color","hoist","mentionable","icon","unicode_emoji"] as const satisfies ReadonlyArray<keyof UpdateGuildRoleRequestJSON>;
Object.freeze(UpdateGuildRoleRequestJSONKeys);
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
export type BulkUpdateGuildRolesRequestJSON = Array<{
    id?: (Snowflake | null);
    /**
     * @maximum 2147483647
     * @minimum -2147483648
     */
    position?: (Int32 | null);
}>;
export const SetGuildMfaLevelRequestJSONKeys = ["level"] as const satisfies ReadonlyArray<keyof SetGuildMfaLevelRequestJSON>;
Object.freeze(SetGuildMfaLevelRequestJSONKeys);
export interface SetGuildMfaLevelRequestJSON {
    level: GuildMFALevel;
}
export const UpdateStageInstanceRequestJSONKeys = ["topic","privacy_level"] as const satisfies ReadonlyArray<keyof UpdateStageInstanceRequestJSON>;
Object.freeze(UpdateStageInstanceRequestJSONKeys);
export interface UpdateStageInstanceRequestJSON {
    /**
     * @maxLength 120
     * @minLength 1
     */
    topic?: string;
    privacy_level?: StageInstancesPrivacyLevel;
}
export type ExecuteWebhookRequestJSON = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export type ExecuteWebhookRequestURLEncoded = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export type ExecuteWebhookRequestFormData = IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
export const UpdateWebhookByTokenRequestJSONKeys = ["name","avatar"] as const satisfies ReadonlyArray<keyof UpdateWebhookByTokenRequestJSON>;
Object.freeze(UpdateWebhookByTokenRequestJSONKeys);
export interface UpdateWebhookByTokenRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name?: string;
    avatar?: (Base64String | null);
}
export type UpdateChannelRequestJSON = PrivateChannelRequestPartial | UpdateGuildChannelRequestPartial | UpdateThreadRequestPartial;
export const UpdateWebhookRequestJSONKeys = ["name","avatar","channel_id"] as const satisfies ReadonlyArray<keyof UpdateWebhookRequestJSON>;
Object.freeze(UpdateWebhookRequestJSONKeys);
export interface UpdateWebhookRequestJSON {
    /**
     * @maxLength 80
     * @minLength 1
     */
    name?: string;
    avatar?: (Base64String | null);
    channel_id?: (Snowflake | null);
}
export type ListMyConnectionsResponseJSON = Array<ConnectedAccountResponse> | null;
export type CreateDmResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export type ListMyGuildsResponseJSON = Array<MyGuildResponse> | null;
export type ListVoiceRegionsResponseJSON = Array<VoiceRegionResponse> | null;
export type ListGuildApplicationCommandPermissionsResponseJSON = Array<CommandPermissionsResponse>;
export type GetApplicationRoleConnectionsMetadataResponseJSON = Array<ApplicationRoleConnectionsMetadataItemResponse> | null;
export type UpdateApplicationRoleConnectionsMetadataResponseJSON = Array<ApplicationRoleConnectionsMetadataItemResponse> | null;
export type ListGuildApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export type BulkSetGuildApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export type ListMessageReactionsByEmojiResponseJSON = Array<UserResponse>;
export type ListGuildScheduledEventUsersResponseJSON = Array<ScheduledEventUserResponse> | null;
export type GetAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export type UpdateAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export type ListAutoModerationRulesResponseJSON = Array<(DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse | null)> | null;
export type CreateAutoModerationRuleResponseJSON = DefaultKeywordRuleResponse | KeywordRuleResponse | MLSpamRuleResponse | MentionSpamRuleResponse | SpamLinkRuleResponse;
export type SearchGuildMembersResponseJSON = Array<GuildMemberResponse>;
export type ListApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export type BulkSetApplicationCommandsResponseJSON = Array<ApplicationCommandResponse> | null;
export type ListThreadMembersResponseJSON = Array<ThreadMemberResponse>;
export type AddGroupDmUserResponseJSON = PrivateChannelResponse | PrivateGroupChannelResponse;
export type ListMessagesResponseJSON = Array<MessageResponse> | null;
export type ListChannelWebhooksResponseJSON = Array<(ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)> | null;
export type ListChannelInvitesResponseJSON = Array<(FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse)> | null;
export type CreateChannelInviteResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export type ListPinnedMessagesResponseJSON = Array<MessageResponse> | null;
export type ExecuteSlackCompatibleWebhookResponseJSON = string | null;
export type GetGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export type UpdateGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export type ListGuildScheduledEventsResponseJSON = Array<(ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse)> | null;
export type CreateGuildScheduledEventResponseJSON = ExternalScheduledEventResponse | StageScheduledEventResponse | VoiceScheduledEventResponse;
export type ListGuildIntegrationsResponseJSON = Array<(DiscordIntegrationResponse | ExternalConnectionIntegrationResponse | GuildSubscriptionIntegrationResponse)> | null;
export type BinaryData = ArrayBufferView;
export type ListGuildTemplatesResponseJSON = Array<GuildTemplateResponse> | null;
export type ListGuildChannelsResponseJSON = Array<(GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse | null)> | null;
export type ListGuildStickersResponseJSON = Array<GuildStickerResponse>;
export type GetGuildWebhooksResponseJSON = Array<(ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse)> | null;
export type ListGuildMembersResponseJSON = Array<GuildMemberResponse>;
export type ListGuildInvitesResponseJSON = Array<(FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse)> | null;
export type ListGuildVoiceRegionsResponseJSON = Array<VoiceRegionResponse> | null;
export type ListGuildEmojisResponseJSON = Array<EmojiResponse> | null;
export type ListGuildRolesResponseJSON = Array<GuildRoleResponse>;
export type BulkUpdateGuildRolesResponseJSON = Array<GuildRoleResponse>;
export type ListGuildBansResponseJSON = Array<GuildBanResponse> | null;
export type GetWebhookByTokenResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export type UpdateWebhookByTokenResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export type GetChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export type DeleteChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export type UpdateChannelResponseJSON = GuildChannelResponse | PrivateChannelResponse | PrivateGroupChannelResponse | ThreadResponse;
export type GetStickerResponseJSON = GuildStickerResponse | StandardStickerResponse;
export type GetWebhookResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export type UpdateWebhookResponseJSON = ApplicationIncomingWebhookResponse | ChannelFollowerWebhookResponse | GuildIncomingWebhookResponse;
export type InviteResolveResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export type InviteRevokeResponseJSON = FriendInviteResponse | GroupDMInviteResponse | GuildInviteResponse;
export type Int32 = number;
export type Base64String = string;
export type Int64 = number;