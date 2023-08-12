import { LiteralType } from "../types/index.js";

export const uriString = new LiteralType({
    name: 'URIString',
    value: '`${\'http\'|\'ws\'}${\'s\'|\'\'}://${string}`',
})