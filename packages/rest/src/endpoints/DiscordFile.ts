import { IHttpContent } from "../http";

export class DiscordFile {
    readonly content: IHttpContent;
    readonly name: string | undefined;

    constructor(content: IHttpContent, name?: string) {
        this.content = content;
        this.name = name;
    }
}
