import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import path from 'node:path';
import fs from 'node:fs/promises';
import * as glob from 'glob'
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';

/** @type {import('rollup').RollupOptions} */
const rollupOptions = {
    treeshake: {
        moduleSideEffects: false
    },
    plugins: [
        typescript({
            tsconfig: fileURLToPath(new URL('tsconfig.json', import.meta.url))
        }),
        commonjs(),
        nodeResolve(),
        json({ preferConst: true })
    ],
    external(source, importer) {
        return importer !== undefined
            && !source.startsWith('./')
            && !source.startsWith('../')
            && !source.startsWith('/');
    }
}

// await rmGlob(['src/**/*.mjs', 'src/**/*.js', 'src/**/*.mjs.map', 'src/**/*.js.map']);
// await emptyDir('dist');
await buildBundle(['src/index.ts'], 'dist', { cjs: 'cjs', esm: 'mjs' });
// await buildInline('src', { esm: 'mjs' });
await buildInline('test', { esm: 'mjs' });

async function rollupNext(input) {
    const result = await rollup({
        input,
        ...rollupOptions
    });
    rollupOptions.cache = result.cache
    return result;
}

async function rmGlob(...args) {
    await Promise.all(glob.sync(...args).map(f => fs.rm(f, { force: true, recursive: true })));
}

async function output(source, dirReady, dir, formats) {
    await Promise.all(Object.entries(formats).map(async ([format, ext]) => {
        const result = await source.generate({
            entryFileNames: `[name].${ext}`,
            chunkFileNames: `[name]-[hash].${ext}`,
            dir,
            format,
            sourcemap: true,
            esModule: true
        });
        await dirReady;
        await Promise.all(result.output.map(async x => {
            await fs.mkdir(path.dirname(`${dir}/${x.fileName}`), { recursive: true });
            await fs.writeFile(`${dir}/${x.fileName}`, x.code || x.source)
        }));
    }));
}

async function buildBundle(input, outDir, formats) {
    const distReady = rmGlob([`${outDir}/**`]);
    const source = await rollupNext(input);
    try {
        await output(source, distReady, outDir, formats);
    } finally {
        source.close();
    }
}

async function buildInline(rootDir, formats) {
    const dirReady = rmGlob(['mjs', 'js', 'mjs.map', 'js.map'].map(ext => `${rootDir}/**/*.${ext}`));
    const inputs = glob.sync(`${rootDir}/**/*.ts`);
    if (inputs.length === 0) {
        await dirReady;
        return;
    }
    const source = await rollupNext(Object.fromEntries(inputs.map(file => [
        path.relative(rootDir, file.slice(0, -3)),
        file
    ])));

    try {
        await output(source, dirReady, rootDir, formats);
    } finally {
        source.close();
    }
}