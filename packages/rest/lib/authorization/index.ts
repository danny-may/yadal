export interface IAuthorizationProvider {
    tryGetAuth(schemes: Record<string, readonly string[]>): string | null | false;
}

export class AuthorizationProvider implements IAuthorizationProvider {
    readonly #schemes: Iterable<[string, (options: readonly string[]) => string | null | false]>;

    constructor(schemes: Record<string, (options: readonly string[]) => string | null | false>) {
        this.#schemes = Object.entries(schemes);
    }

    tryGetAuth(schemes: Record<string, readonly string[]>): string | null | false {
        for (const [scheme, provider] of this.#schemes) {
            const options = schemes[scheme];
            if (options === undefined)
                continue;

            const result = provider(options);
            if (result !== false)
                return result;
        }
        return Object.keys(schemes).length === 0
            ? null
            : false;
    }
}