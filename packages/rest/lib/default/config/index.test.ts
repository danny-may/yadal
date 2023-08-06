import { describe, it } from "node:test";
import fs from 'node:fs/promises';
import assert from "node:assert";
import { describeFile } from "../../../../../root.test.util.js";
import { fileURLToPath } from "node:url";

const root = await loadModuleDirectory(fileURLToPath(new URL('./', import.meta.url)));

describeFile(() => describeDir(root));

function describeDir(dir: ModuleDirectory) {
    const exported = new Set(Object.keys(dir.index));
    for (const [key, module] of Object.entries(dir.files)) {
        exported.delete(key);
        it(`Should export the ./${key}.js module as ${key}`, () => {
            assert(key in dir.index, `Should export a ${key} property`);
            assert.strictEqual(dir.index[key], module);
        })
    }
    for (const [key, module] of Object.entries(dir.directories)) {
        it(`Should re-export all modules from the ./${key}/index.js module`, () => {
            const actual = Object.fromEntries(Object.keys(module.index).map(k => [k, dir.index[k]]));
            Object.keys(module.index).forEach(k => exported.delete(k));
            assert.deepStrictEqual(actual, { ...module.index });
        });
        describe(`${key}/index.js`, () => describeDir(module));
    }
    it('Should export nothing else', () => assert.deepStrictEqual([...exported], []))
}

async function loadModuleDirectory(path: string): Promise<ModuleDirectory> {
    const index = import(`${path}/index.js`);
    const items = await fs.readdir(path, { withFileTypes: true });
    const directories = items.filter(f => f.isDirectory() && f.name !== '__test__')
        .map(f => f.name)
        .map(async dir => [dir, await loadModuleDirectory(`${path}/${dir}`)]);
    const files = items.filter(f => f.isFile() && f.name.endsWith('.js') && !f.name.endsWith('.test.js') && f.name !== 'index.js')
        .map(f => f.name.slice(0, -3))
        .map(async f => [f, await import(`${path}/${f}.js`)]);

    return {
        index: await index,
        directories: Object.fromEntries(await Promise.all(directories)),
        files: Object.fromEntries(await Promise.all(files))
    }
}

interface ModuleDirectory {
    readonly index: Record<string, unknown>;
    readonly files: {
        readonly [key: string]: Record<string, unknown>;
    }
    readonly directories: {
        readonly [key: string]: ModuleDirectory;
    }
}