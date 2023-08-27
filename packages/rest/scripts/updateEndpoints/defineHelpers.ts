export function defineHelpers(typesUrl: URL) {
    return {
        imports: [
            { file: typesUrl, exported: 'ErrorResponse', isType: true }
        ],
        contents: [
            ...discordRestError
        ]
    };
}

const discordRestError = `export class DiscordRestError extends Error {
    readonly response: ErrorResponse | null;

    constructor(response: ErrorResponse | null, message?: string) {
        super(message ?? response?.message ?? 'Unknown discord rest error');
        this.response = response;
    }
}
`.split('\n');