import { IGatewayMultiConnection } from "./GatewayMultiConnection.js";
import { SessionConfig, connectionLifecycle } from "./connectionLifecycle.js";

export async function sessionLifecycle(connection: IGatewayMultiConnection, config: SessionConfig, signal?: AbortSignal) {
    let closed = false
    using _ = connection.handle({ close: () => closed = true });

    do {
        const result = await connectionLifecycle(connection.connection, config, signal);
        if (closed || !result.reconnect || result.resume === undefined) {
            connection.close(result.code, result.reason);
            return result;
        }

        let url;
        ({ url, config } = result.resume);
        connection.reconnect(url === undefined ? undefined : new URL(url));
    } while (true)
}