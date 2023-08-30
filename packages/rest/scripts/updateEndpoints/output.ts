import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface ImportFromDetails {
    readonly file: URL;
    readonly exported: string;
    readonly name?: string;
    readonly isType: boolean;
}

export interface ExportFromDetails {
    readonly file: URL;
    readonly exported?: string;
    readonly name?: string;
    readonly isType: boolean;
}

export interface SourceFile {
    readonly imports?: Iterable<ImportFromDetails>;
    readonly exports?: Iterable<ExportFromDetails>;
    readonly contents?: Iterable<string>;
}

export async function writeFile({ contents, imports, exports }: SourceFile, url: URL) {
    if (typeof contents === 'string')
        contents = [contents];

    const importMap = {} as Record<string, Set<string>>;
    for (const { exported, file, name, isType } of imports ?? []) {
        const imports = importMap[fileURLToPath(file)] ??= new Set();
        imports.add(`${isType ? 'type ' : ''}${exported}${name !== undefined ? ` as ${name}` : ''}`);
    }
    const exportStar = {} as Record<string, string | undefined>;
    const exportMap = {} as Record<string, Set<string>>;
    for (const { exported, file, name, isType } of exports ?? []) {
        if (exported === undefined)
            exportStar[fileURLToPath(file)] = name;
        else {
            const imports = importMap[fileURLToPath(file)] ??= new Set();
            imports.add(`${isType ? 'type ' : ''}${exported}${name !== undefined ? ` as ${name}` : ''}`);
        }
    }

    const p = fileURLToPath(url);
    await fs.mkdir(path.dirname(p), { recursive: true });
    if (existsSync(p))
        throw new Error(`File already exists ${JSON.stringify(p)}`);
    await fs.writeFile(p, [
        `/*`,
        ` * Auto generated file, do not edit`,
        ` */`,
        ...Object.entries(importMap)
            .map(([from, imports]) => `import { ${[...imports].join(', ')} } from '${importFrom(from, p)}';`),
        ...Object.entries(exportStar)
            .map(([from, alias]) => `export * ${alias === undefined ? '' : `as ${alias} `}from '${importFrom(from, p)}';`),
        ...Object.entries(exportMap)
            .map(([from, exports]) => `export { ${[...exports].join(', ')} } from '${importFrom(from, p)}';`),
        ...contents ?? []
    ].join('\n'));
}
export async function deleteFsItem(url: URL) {
    const p = fileURLToPath(url);
    await fs.rm(p, { force: true, recursive: true });
}
function importFrom(target: string, source: string) {
    let result = path.relative(path.dirname(source), target);
    if (!result.startsWith('.'))
        result = `./${result}`;
    if (result.endsWith('.ts'))
        result = `${result.slice(0, -3)}.js`;
    return result;
}