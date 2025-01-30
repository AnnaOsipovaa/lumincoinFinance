export type RouteType = {
    route: string,
    title?: string,
    layout?: string,
    content?: string,
    authorization: boolean,
    load(): void,
    styles?: string[],
    scripts?: string[]
} 