import { LiteralType } from "../types/index.js";

export const snowflake = new LiteralType({
    name: 'Snowflake',
    value: '`${bigint}`',
    documentation: [
        { tag: 'docs', value: 'https://discord.com/developers/docs/reference#snowflakes' }
    ]
})