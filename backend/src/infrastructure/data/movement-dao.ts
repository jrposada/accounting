import { Model, Sequelize } from 'sequelize';
import { Entity } from 'shared/models/entity.ts';
import { Movement, MovementEntity } from 'shared/models/movement.ts';
import { ObjectKeyPaths } from 'shared/utils/object-key-paths.ts';
/** @ts-ignore */
import movementsDefinition from '../../../definitions/movement.cjs';

type MovementDao = {
    concept: string;
    import: number;
    transactionDate: Date;
    valueDate: Date;
};

export function movementDao(sequelize: Sequelize) {
    return sequelize.define(
        movementsDefinition.MODEL_NAME,
        movementsDefinition.DEFINITION,
    );
}

export function toMovementDao(movement: Movement): MovementDao {
    return {
        concept: movement.concept,
        import: movement.import,
        transactionDate: movement.transactionDate,
        valueDate: movement.valueDate,
    };
}

export function toMovementEntity(model: Model): MovementEntity {
    const dao = model.toJSON<MovementDao & Entity>();
    return {
        concept: dao.concept,
        createdAt: dao.createdAt,
        id: dao.id,
        import: dao.import,
        transactionDate: dao.transactionDate,
        updatedAt: dao.updatedAt,
        valueDate: dao.valueDate,
    };
}

export const MOVEMENT_DAO_MAPPER: Partial<
    Record<ObjectKeyPaths<MovementEntity>, keyof (MovementDao & Entity)>
> = {
    concept: 'concept',
    createdAt: 'createdAt',
    id: 'id',
    import: 'import',
    transactionDate: 'transactionDate',
    updatedAt: 'updatedAt',
    valueDate: 'valueDate',
};
