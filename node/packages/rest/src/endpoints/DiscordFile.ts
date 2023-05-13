import { Blob } from "@yadal/dep";


export class DiscordFile {
    readonly content: Blob;
    readonly name: string | undefined;

    constructor(content: Blob, name?: string) {
        this.content = content;
        this.name = name;
    }
}
