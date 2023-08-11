import { Schema } from './types.js';
import refParser from '@apidevtools/json-schema-ref-parser';

export async function getSchema() {
    return await refParser.dereference({
        $ref: 'https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json'
    }) as Schema;
}
