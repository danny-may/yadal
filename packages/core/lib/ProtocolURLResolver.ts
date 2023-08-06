export class ProtocolURLResolver implements URlResolver {
    readonly #protocolTransforms: Record<string, (url: URL) => URL>;

    constructor(protocolTransforms: Record<`${string}:`, (url: URL) => URL>) {
        this.#protocolTransforms = protocolTransforms
    }

    resolve(url: URL): URL {
        const transform = this.#protocolTransforms[url.protocol];
        if (transform === undefined)
            return url;

        return transform(url);
    }
}

export interface URlResolver {
    resolve(url: URL): URL;
}

