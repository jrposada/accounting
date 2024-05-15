import { Entity } from './entity.ts';

export type Movement = {
    concept: string;
    import: number;
    transactionDate: Date;
    valueDate: Date;
};

export type MovementEntity = Movement & Entity;
