declare const Tuple: {
    <T extends readonly unknown[]>(...values: T): T;
    of<T extends readonly unknown[]>(...values: T): T;
    from<T extends readonly unknown[]>(iterable: Iterable<unknown> | ArrayLike<unknown>): T;
    isTuple(value: unknown): value is readonly unknown[];
    isEqual<T extends readonly unknown[]>(x: T, y: T): boolean;
    toArray<T extends readonly unknown[]>(value: T): unknown[];
};
declare const Record: {
    <T extends object>(O: T): T;
    fromEntries<T extends object>(entries: Iterable<readonly [keyof T, unknown]>): T;
    fromObject<T extends object>(O: T): T;
    isRecord(value: unknown): value is object;
    isEqual: <T extends readonly unknown[]>(x: T, y: T) => boolean;
    toObject<T extends object>(value: T): object;
};
export { Tuple, Record };
declare const _default: {
    Tuple: {
        <T extends readonly unknown[]>(...values: T): T;
        of<T extends readonly unknown[]>(...values: T): T;
        from<T extends readonly unknown[]>(iterable: Iterable<unknown> | ArrayLike<unknown>): T;
        isTuple(value: unknown): value is readonly unknown[];
        isEqual<T extends readonly unknown[]>(x: T, y: T): boolean;
        toArray<T extends readonly unknown[]>(value: T): unknown[];
    };
    Record: {
        <T extends object>(O: T): T;
        fromEntries<T extends object>(entries: Iterable<readonly [keyof T, unknown]>): T;
        fromObject<T extends object>(O: T): T;
        isRecord(value: unknown): value is object;
        isEqual: <T extends readonly unknown[]>(x: T, y: T) => boolean;
        toObject<T extends object>(value: T): object;
    };
};
export default _default;
//# sourceMappingURL=defiant.d.ts.map