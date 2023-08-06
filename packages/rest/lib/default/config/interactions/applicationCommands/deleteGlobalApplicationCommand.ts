/** @docs https://discord.com/developers/docs/interactions/application-commands#delete-global-application-command */
import { DELETE, applicationId, commandId, IHttpResponse, noContent, byRoute } from "../../../util.js";

export const rateLimit = byRoute;
export const route = DELETE`api:/applications/${applicationId}/commands/${commandId}`;
export function read(response: IHttpResponse) {
    return noContent(response);
}