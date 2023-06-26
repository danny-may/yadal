import { build as esbuild } from 'esbuild';
import { glob } from 'glob';

async function build(entrypoints, outdir, format, ext) {
    const files = await glob(entrypoints);

    await esbuild({
        entryPoints: files,
        bundle: files.length === 1,
        loader: {
            '.ts': 'ts'
        },
        outExtension: {
            '.js': ext
        },
        outdir: outdir,
        sourcemap: true,
        packages: 'external',
        format: format
    })
}

await Promise.all([
    build('src/index.ts', 'dist', 'cjs', '.cjs'),
    build('src/index.ts', 'dist', 'esm', '.mjs'),
    build('test/**/*.test.ts', 'test', 'esm', '.mjs')
])