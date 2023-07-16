export type RouteModel<Route extends IRoute> = Route extends IRoute<infer T> ? T : never;
export interface IRoute<T extends object = object> {
    getUrl(model: T): URL;
}
