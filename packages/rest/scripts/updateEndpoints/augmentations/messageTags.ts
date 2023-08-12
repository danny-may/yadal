import { LiteralType, Type, UnionType } from "../types/index.js";

export const messageTags: Type[] = [
    new LiteralType({ name: 'UserMessageTag', value: '`<@${\'!\'|\'\'}${bigint}>`' }),
    new LiteralType({ name: 'ChannelMessageTag', value: '`<#${bigint}>`' }),
    new LiteralType({ name: 'RoleMessageTag', value: '`<@&${bigint}>`' }),
    new LiteralType({ name: 'SlashCommandMessageTag', value: '`</${string}:${bigint}>`' }),
    new LiteralType({ name: 'CustomEmojiMessageTag', value: '`<${\'a\'|\'\'}:${string}:${bigint}>`' }),
    new LiteralType({ name: 'TimestampMessageTag', value: '`<t:${bigint}${\'\'|`:${\'t\'|\'T\'|\'d\'|\'D\'|\'f\'|\'F\'|\'R\'}`}>`' }),
];
messageTags.push(new UnionType({
    name: 'MessageTag',
    types: [...messageTags]
}));
