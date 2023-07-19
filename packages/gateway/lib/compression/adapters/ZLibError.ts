import { constants } from "node:zlib";

export class ZLibError extends Error {
    errno: number;
    code: string | undefined;

    constructor(context: { msg?: string | null; err: number; }) {
        const { msg, err } = context;
        super(msg ?? 'Unknown error');
        this.errno = err;
        this.code = errCodeToName[err];
    }
}

const errCodeToName = Object.fromEntries(
    Object.entries(constants)
        .filter(x => x[0].startsWith('Z_') && x[0].includes('ERR'))
        .map(([name, code]) => [code, name] as const)
);
