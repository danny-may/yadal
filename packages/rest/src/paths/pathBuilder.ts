type TemplatePathSegment<Path extends SegmentString, Arg> = { route: (arg: Arg) => Path, rateLimit: (arg: Arg) => Path } | ((arg: Arg) => Path);
type PathSegment =
    | SegmentString
    | TemplatePathSegment<SegmentString, never>;
interface PathSegmentNode {
    readonly segment: PathSegment;
    readonly name?: PropertyKey;
    readonly children: readonly PathSegmentNode[];
}
interface NamelessPathSegmentNode<Segment extends PathSegment, Children extends readonly PathSegmentNode[]> {
    readonly segment: Segment;
    readonly children: Children;
}
interface NamedPathSegmentNode<Segment extends PathSegment, Name extends PropertyKey, Children extends readonly PathSegmentNode[]> {
    readonly segment: Segment;
    readonly name: Name;
    readonly children: Children;
}
type SegmentString = `${'/' | '.' | '?' | '#' | `${string}:`}${string}` | '';

type ResolvedPath<Name extends PropertyKey, State extends PathState> =
    State extends PathWithArgState<infer Path, infer Arg>
    ? { [P in Name]: { route: (arg: Arg) => Path, rateLimit: (arg: Arg) => Path } }
    : State extends PathOnlyState<infer Path>
    ? { [P in Name]: { route: () => Path, rateLimit: () => Path } }
    : never
type PathState =
    | PathOnlyState
    | PathWithArgState;
type PathOnlyState<Path extends string = string> = { path: Path; }
type PathWithArgState<Path extends string = string, Arg = unknown> = { path: Path; arg: Arg; }
type AppendSegment<State extends PathState, Segment extends PathSegment> =
    Segment extends TemplatePathSegment<infer SegmentPath, infer SegmentArg> ? (
        State extends PathWithArgState
        ? PathWithArgState<`${State['path']}${SegmentPath}`, { [P in keyof (State['arg'] & SegmentArg)]: (State['arg'] & SegmentArg)[P] }>
        : PathWithArgState<`${State['path']}${SegmentPath}`, SegmentArg>
    )
    : Segment extends SegmentString ? (
        State extends PathWithArgState
        ? PathWithArgState<`${State['path']}${Segment}`, State['arg']>
        : PathOnlyState<`${State['path']}${Segment}`>
    )
    : never;
type ResolvePathSegmentNode<Node extends PathSegmentNode, State extends PathState> =
    Node extends NamedPathSegmentNode<infer Segment, infer Name, infer Children> ? (
        | ResolvedPath<Name, AppendSegment<State, Segment>>
        | ResolvePathSegmentNodes<Children, AppendSegment<State, Segment>>
    )
    : Node extends NamelessPathSegmentNode<infer Segment, infer Children> ? (
        | ResolvePathSegmentNodes<Children, AppendSegment<State, Segment>>
    ) : never

type ResolvePathSegmentNodes<Nodes extends readonly PathSegmentNode[], State extends PathState> = {
    [P in number & keyof Nodes]: ResolvePathSegmentNode<Nodes[P], State>
}[number & keyof Nodes]

export function pathSegment<const Segment extends SegmentString>(segment: Segment): NamelessPathSegmentNode<Segment, []>;
export function pathSegment<const Segment extends SegmentString, const Children extends readonly PathSegmentNode[]>(segment: Segment, children: Children): NamelessPathSegmentNode<Segment, Children>;
export function pathSegment<const Segment extends SegmentString, const Name extends PropertyKey>(segment: Segment, name: Name): NamedPathSegmentNode<Segment, Name, []>;
export function pathSegment<const Segment extends SegmentString, const Name extends PropertyKey, const Children extends readonly PathSegmentNode[]>(segment: Segment, name: Name, children: Children): NamedPathSegmentNode<Segment, Name, Children>;
export function pathSegment<Arg, const Segment extends SegmentString>(segment: TemplatePathSegment<Segment, Arg>): NamelessPathSegmentNode<TemplatePathSegment<Segment, Arg>, []>;
export function pathSegment<Arg, const Segment extends SegmentString, const Children extends readonly PathSegmentNode[]>(segment: TemplatePathSegment<Segment, Arg>, children: Children): NamelessPathSegmentNode<TemplatePathSegment<Segment, Arg>, Children>;
export function pathSegment<Arg, const Segment extends SegmentString, const Name extends PropertyKey>(segment: TemplatePathSegment<Segment, Arg>, name: Name): NamedPathSegmentNode<TemplatePathSegment<Segment, Arg>, Name, []>;
export function pathSegment<Arg, const Segment extends SegmentString, const Name extends PropertyKey, const Children extends readonly PathSegmentNode[]>(segment: TemplatePathSegment<Segment, Arg>, name: Name, children: Children): NamedPathSegmentNode<TemplatePathSegment<Segment, Arg>, Name, Children>;
export function pathSegment(segment: PathSegment, name?: PropertyKey | readonly PathSegmentNode[], children?: readonly PathSegmentNode[]): PathSegmentNode {
    switch (typeof name) {
        case 'symbol':
        case 'string':
        case 'number':
        case 'undefined':
            children ??= [];
            break;
        case 'object':
            children = name;
            name = undefined;
            break;
    }

    return { segment, name, children };
}

export function buildPaths<Nodes extends readonly PathSegmentNode[]>(nodes: Nodes): BuiltPaths<Nodes> {
    const results: Record<PropertyKey, string | { route: (arg: never) => string, rateLimit: (arg: never) => string }> = {};
    for (const signature of resolveNodes(nodes, [])) {
        results[signature.name] = compileSignature(signature.segments);
    }
    return results as BuiltPaths<Nodes>;
}

function* resolveNodes(nodes: Iterable<PathSegmentNode>, segments: PathSegment[]): Iterable<{ name: PropertyKey; segments: PathSegment[]; }> {
    for (const node of nodes) {
        segments.push(node.segment);
        if (node.name !== undefined) {
            yield { name: node.name, segments: [...segments] };
        }
        yield* resolveNodes(node.children, segments);
        segments.pop();
    }
}

function compileSignature(signature: PathSegment[]): { route: (arg: never) => string, rateLimit: (arg: never) => string } {
    const templates: Array<TemplatePathSegment<SegmentString, never>> = [];
    const argName = 'arg';
    const templatesVar = 't';
    const routeSrc = [];
    const rateLimitSrc = [];
    for (const s of signature) {
        if (typeof s === 'string') {
            const str = s.replaceAll(/[$`\\]/g, v => `\\${v}`);
            routeSrc.push(str);
            rateLimitSrc.push(str);
        } else if (typeof s === 'function') {
            const index = templates.length;
            templates.push(s);
            const str = `\${${templatesVar}[${index}](${argName})}`;
            routeSrc.push(str);
            rateLimitSrc.push(str);
        } else {
            const index = templates.length;
            templates.push(s);
            routeSrc.push(`\${${templatesVar}[${index}].route(${argName})}`);
            rateLimitSrc.push(`\${${templatesVar}[${index}].rateLimit(${argName})}`);
        }
    }

    const fnBody = `return { route: (${argName}) => \`${routeSrc.join('')}\`, rateLimit: (${argName}) => \`${rateLimitSrc.join('')}\` }`;

    try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
        return (new Function(templatesVar, fnBody) as (t: typeof templates) => { route: (arg: never) => string, rateLimit: (arg: never) => string })(templates);
    } catch (err) {
        throw err;
    }
}

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type BuiltPathsHelper<Nodes extends readonly PathSegmentNode[]> = ResolvePathSegmentNodes<Nodes, { path: ''; }>
type BuiltPaths<Nodes extends readonly PathSegmentNode[]> = {
    [P in keyof UnionToIntersection<BuiltPathsHelper<Nodes>>]: UnionToIntersection<BuiltPathsHelper<Nodes>>[P]
}
