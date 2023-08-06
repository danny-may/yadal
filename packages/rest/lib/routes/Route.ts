import { HttpMethod } from "../http/index.js";

export type RouteModel<T extends Route> = T extends Route<infer Model> ? Model : never;
export interface Route<Model = any> extends ReadonlyArray<string | { [P in keyof Model]: RouteParameter<P, Model[P]> }[keyof Model]> {
    readonly method: HttpMethod;
}
export interface RouteParameter<Key extends PropertyKey, Value> {
    readonly key: Key;
    readonly pattern: RegExp;
    stringify(value: Value): string;
    parse(value: string): Value;
}
type RouteParameterType<T extends RouteParameter<PropertyKey, any>> = T extends RouteParameter<PropertyKey, infer Value> ? Value : never;

export function route(method: HttpMethod) {
    return <const T extends readonly RouteParameter<PropertyKey, any>[]>(template: readonly string[], ...args: T) => {
        const result: Array<string | T[number]> = [template[0]!];
        for (let i = 1; i < template.length; i++) {
            result.push(args[i - 1]!);
            result.push(template[i]!);
        }
        return Object.assign(result.filter(v => v !== ''), { method }) as Route<{
            [P in T[number]as P['key']]: RouteParameterType<P>
        }>;
    }
}