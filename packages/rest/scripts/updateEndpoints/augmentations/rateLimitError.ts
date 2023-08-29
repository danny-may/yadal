import { InterfaceProperty, InterfaceType, LiteralType } from "../index.js";

export const rateLimitError = new InterfaceType({
    name: 'RateLimitError',
    properties: [
        new InterfaceProperty({
            name: 'code',
            optional: true,
            type: new LiteralType({ value: 'number' })
        }),
        new InterfaceProperty({
            name: 'global',
            type: new LiteralType({ value: 'boolean' })
        }),
        new InterfaceProperty({
            name: 'message',
            type: new LiteralType({ value: 'string' })
        }),
        new InterfaceProperty({
            name: 'retry_after',
            type: new LiteralType({ value: 'number' })
        })
    ]
});