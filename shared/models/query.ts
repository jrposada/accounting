import { Request } from 'express';

// TODO: Implement OData
export class Query {
    get filters(): ReadonlyArray<Filter> {
        return structuredClone(this.#filters);
    }

    get sorts(): ReadonlyArray<Sort> {
        return structuredClone(this.#sorts);
    }

    readonly #filters: Filter[] = [];
    readonly #sorts: Sort[] = [];

    constructor(query?: Request['query']) {
        if (!query) return;

        Object.entries(query).forEach(([field, value]) => {
            if (field.startsWith('sort')) {
                console.log('TODO: sorts');
                return;
            }

            this.#filters.push({
                field,
                value: value as string,
            });
        });
    }

    filter(field: string, value?: string): this {
        this.#filters.push({
            field,
            value: value ?? '',
        });

        return this;
    }

    toString(): string {
        let queryString = '?';

        if (this.#filters) {
            queryString += this.#filters
                .map((item) => `${item.field}=${item.value}`)
                .join('&');
        }

        return queryString;
    }
}

export type Filter = {
    field: string;
    value: string;
};

export type Sort = {
    field: string;
    direction: 'asc' | 'desc';
};
