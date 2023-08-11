import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { TypeReference, exposeViaExport, generateSource } from './types/index.js';

export async function writeTypes(types: Iterable<TypeReference>, url: URL) {
    const content = [...generateSource(types, exposeViaExport)].join('\n');
    await fs.writeFile(fileURLToPath(url), content);
}