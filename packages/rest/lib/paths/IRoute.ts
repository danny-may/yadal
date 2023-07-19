export type RouteModel<Route extends IRoute> = Route extends IRoute<infer T> ? T : never;
export interface IRoute<T extends object = object> {
    getUrl(model: T): URL;
    segments: Array<string | RouteSegment>;
}
export interface RouteSegment {
    parse(value: string): { success: true; model: Record<PropertyKey, unknown> } | { success: false }
}