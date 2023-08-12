import { LiteralType } from "../types/index.js";

export const isoDateTime = new LiteralType({
    name: 'ISO8601DateTime',
    value: 'string',
    documentation: [
        { tag: 'docs', value: 'https://discord.com/developers/docs/reference#iso8601-datetime' },
        { tag: 'format', value: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX' }
    ]
})