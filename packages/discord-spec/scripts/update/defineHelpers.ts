export function defineHelpers(typesUrl: URL) {
    return {
        imports: [
            { file: typesUrl, exported: 'ErrorResponse', isType: true },
            { file: typesUrl, exported: 'RateLimitError', isType: true },
        ],
        contents: [
            ...discordRestError,
            ...discordRateLimitError
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
const discordRateLimitError = `export class DiscordRateLimitError extends Error implements RateLimitError {
    readonly code?: number;
    readonly global: boolean;
    readonly retry_after: number;

    constructor(error: RateLimitError) {
        super(\`[\${error.code ?? 'Rate Limit'}][global: \${error.global}] \${error.message}\`);

        this.code = error.code;
        this.global = error.global;
        this.retry_after = error.retry_after;
    }
}
`.split('\n');