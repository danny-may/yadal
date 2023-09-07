import { describeFile } from "../../../../root.test.util.js";
import * as operations from '../../lib/api/index.js';
import { describe, it } from "node:test";
import assert from "node:assert";

describeFile(() => {
    const testData = testDataFn();
    for (const name of Object.keys(operations)) {
        describe(name, () => {
            if (name in testData.createBody) {
                const n = name as keyof typeof testData.createBody;
                const operation = operations[n] as { createBody(model: typeof testData.createBody[typeof n][number]['model']): { type: string; content: ArrayBufferView[]; } | undefined };
                describe('createBody', () => {
                    let i = 0;
                    for (const { model, type, content } of testData.createBody[n]) {
                        it(`Should correctly convert model ${i++} to ${type}`, () => {
                            // arrange

                            // act
                            const result = operation.createBody(model);

                            // assert
                            assert(result !== undefined);
                            const decoded = new TextDecoder().decode(Buffer.concat(result.content.map(chunk => new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength))));
                            if (type instanceof RegExp)
                                assert(type.test(result.type), `${result.type} should match ${type}`)
                            else
                                assert.strictEqual(result.type, type);
                            if (content instanceof RegExp)
                                assert(content.test(decoded), `${decoded} should match ${content}`);
                            else
                                assert.strictEqual(decoded, content);
                        })
                    }
                })
            }
        })
    }
});

function testDataFn(): {
    createBody: CreateBodyTests
} {
    return {
        "createBody": {
            "addGroupDmUser": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildRole": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "pruneGuild": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "banUserFromGuild": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createDm": [
                {
                    model: {
                        access_tokens: ['abc', 'def'],
                        nicks: {
                            xyz: '123',
                            blah: 'foo'
                        },
                        recipient_id: '1234567'
                    },
                    content: '{"recipient_id":"1234567","access_tokens":["abc","def"],"nicks":{"xyz":"123","blah":"foo"}}',
                    type: 'application/json; charset=utf-8'
                },
                {
                    model: {
                    },
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateMyApplication": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateMyUser": [
                {
                    model: {
                        username: 'abc'
                    },
                    content: '{"username":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createStageInstance": [
                {
                    model: {
                        channel_id: '123',
                        topic: 'abc'
                    },
                    content: '{"topic":"abc","channel_id":"123"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuild": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "setGuildApplicationCommandPermissions": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateApplicationUserRoleConnection": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateApplicationRoleConnectionsMetadata": [
                {
                    model: {
                        data: []
                    },
                    content: '[]',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildApplicationCommand": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "bulkSetGuildApplicationCommands": [
                {
                    model: {
                        data: []
                    },
                    content: '[]',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildApplicationCommand": [
                {
                    model: {
                        name: 'abc',
                        type: 1,
                    },
                    content: '{"name":"abc","type":1}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "bulkDeleteMessages": [
                {
                    model: {
                        messages: []
                    },
                    content: '{"messages":[]}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createThreadFromMessage": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateOriginalWebhookMessage": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                },
                ...new Array(10).fill(0).map((_, i) => ({
                    model: {
                        [`files[${i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}]`]: {
                            content: new Uint8Array([1, 2, 3, 4, 5, 6])
                        }
                    },
                    content: new RegExp(`^--boundary-(\\d+-\\d+-\\d+-\\d+)
Content-Disposition: form-data; name="payload_json"
Content-Type: application/json

{}
--boundary-\\1
Content-Disposition: form-data; name=files\\[${i}\\]; filename="files%5B${i}%5D"
Content-Type: application/octet-stream

\x01\x02\x03\x04\x05\x06
--boundary-\\1--$`),
                    type: /^multipart\/form-data; boundary=boundary-\d+-\d+-\d+-\d+; charset=utf-8$/
                }))
            ],
            "updateAutoModerationRule": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createAutoModerationRule": [
                {
                    model: {
                        event_type: 1,
                        name: 'abc',
                        trigger_type: 1
                    },
                    content: '{"name":"abc","event_type":1,"trigger_type":1}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateSelfVoiceState": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateMyGuildMember": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateApplicationCommand": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "bulkSetApplicationCommands": [
                {
                    model: {
                        data: []
                    },
                    content: '[]',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createApplicationCommand": [
                {
                    model: {
                        name: 'abc',
                        type: 1
                    },
                    content: '{"name":"abc","type":1}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createInteractionResponse": [
                {
                    model: {
                        type: 1
                    },
                    content: '{"type":1}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "setChannelPermissionOverwrite": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "followChannel": [
                {
                    model: {
                        webhook_channel_id: '123'
                    },
                    content: '{"webhook_channel_id":"123"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateMessage": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                },
                ...new Array(10).fill(0).map((_, i) => ({
                    model: {
                        [`files[${i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}]`]: {
                            content: new Uint8Array([1, 2, 3, 4, 5, 6])
                        }
                    },
                    content: new RegExp(`^--boundary-(\\d+-\\d+-\\d+-\\d+)
Content-Disposition: form-data; name="payload_json"
Content-Type: application/json

{}
--boundary-\\1
Content-Disposition: form-data; name=files\\[${i}\\]; filename="files%5B${i}%5D"
Content-Type: application/octet-stream

\x01\x02\x03\x04\x05\x06
--boundary-\\1--$`),
                    type: /^multipart\/form-data; boundary=boundary-\d+-\d+-\d+-\d+; charset=utf-8$/
                }))
            ],
            "createMessage": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                },
                ...new Array(10).fill(0).map((_, i) => ({
                    model: {
                        [`files[${i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}]`]: {
                            content: new Uint8Array([1, 2, 3, 4, 5, 6])
                        }
                    },
                    content: new RegExp(`^--boundary-(\\d+-\\d+-\\d+-\\d+)
Content-Disposition: form-data; name="payload_json"
Content-Type: application/json

{}
--boundary-\\1
Content-Disposition: form-data; name=files\\[${i}\\]; filename="files%5B${i}%5D"
Content-Type: application/octet-stream

\x01\x02\x03\x04\x05\x06
--boundary-\\1--$`),
                    type: /^multipart\/form-data; boundary=boundary-\d+-\d+-\d+-\d+; charset=utf-8$/
                }))
            ],
            "createWebhook": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createChannelInvite": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createThread": [
                {
                    model: {
                        message: {},
                        name: 'abc'
                    },
                    content: '{"name":"abc","message":{}}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateWebhookMessage": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                },
                ...new Array(10).fill(0).map((_, i) => ({
                    model: {
                        [`files[${i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}]`]: {
                            content: new Uint8Array([1, 2, 3, 4, 5, 6])
                        }
                    },
                    content: new RegExp(`^--boundary-(\\d+-\\d+-\\d+-\\d+)
Content-Disposition: form-data; name="payload_json"
Content-Type: application/json

{}
--boundary-\\1
Content-Disposition: form-data; name=files\\[${i}\\]; filename="files%5B${i}%5D"
Content-Type: application/octet-stream

\x01\x02\x03\x04\x05\x06
--boundary-\\1--$`),
                    type: /^multipart\/form-data; boundary=boundary-\d+-\d+-\d+-\d+; charset=utf-8$/
                }))
            ],
            "executeGithubCompatibleWebhook": [
                {
                    model: {
                        sender: {
                            avatar_url: 'http://abc',
                            html_url: 'http://def',
                            id: 123,
                            login: 'abc'
                        }
                    },
                    content: '{"sender":{"avatar_url":"http://abc","html_url":"http://def","id":123,"login":"abc"}}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "executeSlackCompatibleWebhook": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildFromTemplate": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildScheduledEvent": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildScheduledEvent": [
                {
                    model: {
                        entity_type: 1,
                        name: 'abc',
                        privacy_level: 2,
                        scheduled_start_time: 'def'
                    },
                    content: '{"name":"abc","scheduled_start_time":"def","privacy_level":2,"entity_type":1}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildWelcomeScreen": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateVoiceState": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "putGuildsOnboarding": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildTemplate": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildTemplate": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildSticker": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildChannel": [
                {
                    model: {
                        name: 'abc'
                    },
                    content: '{"name":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "bulkUpdateGuildChannels": [
                {
                    model: {
                        data: []
                    },
                    content: '[]',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildSticker": [
                {
                    model: {
                        file: {
                            content: new Uint8Array([1, 2, 3, 4, 5, 6])
                        },
                        name: 'abc',
                        tags: 'def'
                    },
                    content: new RegExp(`^--boundary-(\\d+-\\d+-\\d+-\\d+)
Content-Disposition: form-data; name="payload_json"
Content-Type: application\\/json

\\{"name":"abc","tags":"def"\\}
--boundary-\\1
Content-Disposition: form-data; name=file; filename="file"
Content-Type: application\\/octet-stream

\x01\x02\x03\x04\x05\x06
--boundary-\\1--\$`),
                    type: /^multipart\/form-data; boundary=boundary-\d+-\d+-\d+-\d+; charset=utf-8$/
                }
            ],
            "addGuildMember": [
                {
                    model: {
                        access_token: 'abc'
                    },
                    content: '{"access_token":"abc"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildMember": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildEmoji": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "createGuildEmoji": [
                {
                    model: {
                        image: 'data:image/png;base64,123xyz',
                        name: 'abc'
                    },
                    content: '{"name":"abc","image":"data:image/png;base64,123xyz"}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildWidgetSettings": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuildRole": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "bulkUpdateGuildRoles": [
                {
                    model: {
                        data: []
                    },
                    content: '[]',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "setGuildMfaLevel": [
                {
                    model: {
                        level: 0
                    },
                    content: '{"level":0}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateStageInstance": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateApplication": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "executeWebhook": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateWebhookByToken": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateChannel": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateWebhook": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ],
            "updateGuild": [
                {
                    model: {},
                    content: '{}',
                    type: 'application/json; charset=utf-8'
                }
            ]
        }
    }
}

type CreateBodyTests = {
    [P in keyof typeof operations as AssertCreateBody<P, typeof operations>]: ReadonlyArray<{ model: GetCreateBodyModel<typeof operations[P]>; type: RegExp | string; content: string | RegExp; }>
}

type GetCreateBodyModel<T> = T extends { createBody(model: infer Model): { type: string; content: ArrayBufferView[]; } } ? Model : never;
type AssertCreateBody<T extends keyof P, P> = P[T] extends { createBody(model: any): { type: string; content: ArrayBufferView[]; } } ? T : never