import { DiscordFile, DiscordRestClient } from "@yadal/rest";

(async () => {
    const client = new DiscordRestClient({
        authHeader: 'Bot ODc2MTA5ODA3MzczOTIyMzM1.YRfS1w.SobOuj06gdGN_L3th_v3FVwp0D0'
    })

    client.createInteractionResponse({
        interactionId: '',
        interactionToken: '',
        files: {
            456: new DiscordFile(null!)
        }
    })
})()
