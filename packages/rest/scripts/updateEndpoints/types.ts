import { SchemaObject } from "openapi-typescript";

type AllowedTypes<T> = T extends { readonly type: infer T } ? T extends string ? T : never : never;

export type SchemaObjectTypeMap = { [P in SchemaObject as AllowedTypes<P>]: P };
export type StringSchemaObject = SchemaObjectTypeMap['string'];
export type IntegerSchemaObject = SchemaObjectTypeMap['integer'];
export type ArraySchemaObject = SchemaObjectTypeMap['array'];
export type ObjectSchemaObject = SchemaObjectTypeMap['object'];
