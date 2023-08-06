const epoch = 1420070400000n;

export function toTimestamp(snowflake: string | bigint | number) {
    const value = BigInt(snowflake);
    return Number((value >> 22n) + epoch)
}