import { MergeInsertions } from './merge-intersections.ts';

export type WithRequired<T, K extends keyof T> = MergeInsertions<
    T & { [P in K]-?: NonNullable<T[P]> }
>;
