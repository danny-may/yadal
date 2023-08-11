// export type Schema = typeof import('../../ref/schema.js').default;
// type SchemaComponent = Get<Schema, ['components', 'schemas', string]>;
// export type SchemaOperation = ValueOrArrayElement<Get<Schema, ['paths', `/${string}`, string]>>;
// export type SchemaRequestBody = Get<SchemaOperation, ['requestBody', 'content', string, 'schema']>;
// export type SchemaResponse = Get<SchemaOperation, ['responses', string, 'content', string, 'schema']>;
// export type SchemaObject = Exclude<NestedSchemaObjects<
//     | SchemaComponent
//     | SchemaRequestBody
//     | SchemaResponse
// >, never>;

import { OpenAPI3, OperationObject, SchemaObject, ReferenceObject } from "openapi-typescript";
export type Schema = OpenAPI3;
export type SchemaOperation = OperationObject;
export type SchemaRequestBody = SchemaObject | ReferenceObject;
export type SchemaResponse = SchemaObject | ReferenceObject;
export { type SchemaObject }

// type AllowedTypes<T> = T extends { readonly type: infer T } ? ValueOrArrayElement<T> : never;
type AllowedTypes<T> = T extends { readonly type: infer T } ? T extends string ? T : never : never;

export type SchemaObjectTypeMap = { [P in SchemaObject as AllowedTypes<P>]: P };

export type AnyKeyOf<T> = T extends Record<infer K, any> ? K : never;
export type StringSchemaObject = SchemaObjectTypeMap['string'];
export type IntegerSchemaObject = SchemaObjectTypeMap['integer'];
export type NumberSchemaObject = SchemaObjectTypeMap['number'];
export type ArraySchemaObject = SchemaObjectTypeMap['array'];
export type ObjectSchemaObject = SchemaObjectTypeMap['object'];
export type PickEnumSchemaObject = Extract<SchemaObject, { readonly allOf: readonly any[]; readonly enum: readonly any[]; }>;
export type NonRefSchemaObject = Exclude<SchemaObject, { readonly $ref: any }>;

// type ValueOrArrayElement<T> = T extends readonly (infer Elem)[] ? Elem : T;
// type ValueOf<T> = T extends Record<PropertyKey, infer R> ? R : never;
// type Get<T, K extends readonly PropertyKey[]> = K extends [infer Key, ...infer Rest]
//     ? Get<GetHelper<T, Key>, Extract<Rest, readonly PropertyKey[]>>
//     : T;
// type GetHelper<T, K> = K extends PropertyKey ? T extends Record<K, infer R> ? R : never : never;
// type NestedSchemaObjects<T> =
//     | Extract<T extends readonly (infer R)[] ? R : T, object>
//     | (T extends { oneOf: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { allOf: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { anyOf: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { enum: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { items: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { prefixItems: infer R } ? NestedSchemaObjects<R> : never)
//     | (T extends { additionalProperties: infer R } ? NestedSchemaObjects<ValueOf<R>> : never)
//     | (T extends { properties: infer R } ? NestedSchemaObjects<ValueOf<R>> : never)


