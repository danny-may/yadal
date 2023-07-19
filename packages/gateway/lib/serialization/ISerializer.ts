export interface ISerializer {
    serialize(value: unknown): ArrayBufferView;
    deserialize(value: ArrayBufferView): unknown;
}
