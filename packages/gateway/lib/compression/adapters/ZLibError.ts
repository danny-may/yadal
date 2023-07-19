import { constants } from "node:zlib";

export class ZLibError extends Error {
    errno: number;
    code: string | undefined;

    constructor(context: { msg?: string | null; err: number; }) {
        super(context.msg ?? 'Unknown error');
        this.errno = context.err;
        this.code = errCodeToName[context.err];
    }
}

const errCodeToName = Object.fromEntries(Object.entries(constants).map(([name, code]) => [code, name] as const));
