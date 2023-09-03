export interface IAuthorizationValidator {
    validate(schemes: Record<string, readonly string[]>, header: string | undefined): boolean;
}

export class AuthorizationValidator implements IAuthorizationValidator {
    readonly #schemes: Iterable<[string, (options: readonly string[], header: string | undefined) => boolean]>;

    constructor(schemes: Record<string, (options: readonly string[], header: string | undefined) => boolean>) {
        this.#schemes = Object.entries(schemes);
    }

    validate(schemes: Record<string, readonly string[]>, header: string | undefined): boolean {
        for (const [scheme, validator] of this.#schemes) {
            const options = schemes[scheme];
            if (options === undefined)
                continue;

            if (validator(options, header))
                return true;
        }

        return Object.keys(schemes).length === 0;
    }
}