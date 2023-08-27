import refParser from '@apidevtools/json-schema-ref-parser';
import { OpenAPI3 } from 'openapi-typescript';

export async function getSchema() {
    return await refParser.dereference({
        $ref: 'https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json'
    }) as OpenAPI3;
}
