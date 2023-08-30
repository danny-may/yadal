import { SchemaObject } from "openapi-typescript";
import { Type, TypeReference } from "../types/index.js";

const defaultScheme = Symbol('default');

export class TypeBuilder {
    readonly #schemaNames: Map<SchemaObject, string>;
    readonly #definitions: Map<object, Record<symbol, (context: ParserContext) => TypeReference>>;
    readonly #types: Set<TypeReference>;
    readonly #parser: TypeParser;

    constructor(parser: TypeParser) {
        this.#schemaNames = new Map();
        this.#definitions = new Map();
        this.#types = new Set();
        this.#parser = parser;
    }

    parse(definition: SchemaObject, name: string, scheme: symbol = defaultScheme): void {
        this.#schemaNames.set(definition, name);
        const definitions = this.#definitions.get(definition);
        const factory = (context: ParserContext) => this.#parser.parse(name, definition, context);
        if (definitions !== undefined)
            definitions[scheme] ??= factory;
        else
            this.#definitions.set(definition, { [scheme]: factory });
    }

    define(definition: object, factory: (context: ParserContext) => TypeReference, scheme: symbol = defaultScheme) {
        const definitions = this.#definitions.get(definition);
        if (definitions !== undefined)
            definitions[scheme] = factory;
        else
            this.#definitions.set(definition, { [scheme]: factory });
    }

    register(type: TypeReference): void {
        this.#types.add(type);
    }

    build(): TypeBuilderResult {
        const cache = new Map<object, Record<symbol, TypeReference>>();
        const types = new Set<TypeReference>(this.#types);
        const context: ParserContext = {
            parse: (definition, scheme = defaultScheme) => {
                let result = cache.get(definition);
                if (result === undefined)
                    cache.set(definition, result = {});
                return result[scheme] ??= Lazy(() => this.#parser.parse(undefined, definition, context));
            },
            register: type => {
                types.add(type);
                return type;
            }
        }
        const Lazy = (factory: () => TypeReference): TypeReference =>
            new TypeReference(() => factory().dereference())
        for (const [definition, config] of this.#definitions) {
            let result = cache.get(definition);
            if (result === undefined)
                cache.set(definition, result = {});
            for (const key of Reflect.ownKeys(config) as symbol[]) {
                const factory = config[key]!;
                result[key] = Lazy(() => factory(context));
            }
        }

        const values = new Set<Type>();
        const result = new Map<object, Record<symbol, Type>>();
        for (const [key, references] of cache) {
            const types = {} as Record<symbol, Type>;
            result.set(key, types);
            for (const k of Reflect.ownKeys(references)) {
                const type = references[k as symbol]!.dereference();
                values.add(type);
                types[k as symbol] = type;
            }
        }
        for (const ref of types) {
            const type = ref.dereference();
            values.add(type);
        }

        return {
            get: (definition, scheme = defaultScheme) => result.get(definition)?.[scheme],
            values: values.values.bind(values),
        }
    }
}

export interface TypeBuilderResult {
    get(definition: SchemaObject, scheme?: symbol): Type | undefined;
    values(): Iterable<Type>;
}

export interface TypeParser {
    parse(name: string | undefined, definition: SchemaObject, context: ParserContext): TypeReference;
}

export interface ParserContext {
    parse: (this: void, definition: SchemaObject, scheme?: symbol) => TypeReference;
    register: <T extends TypeReference>(this: void, type: T) => T;
}