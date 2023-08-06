import { IHttpContent } from "./http/index.js";

export class DiscordFile {
    readonly content: IHttpContent;
    readonly name?: string | undefined;

    constructor(content: IHttpContent, name?: string | undefined) {
        this.content = content;
        this.name = name;
    }
}

export interface DiscordFiles {
    [key: `files[${bigint}]`]: DiscordFile
}