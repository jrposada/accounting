import { Model, Sequelize } from 'sequelize';
import { Entity } from 'shared/models/entity.ts';
import { Movement, MovementEntity } from 'shared/models/movement.ts';
import { ObjectKeyPaths } from 'shared/utils/object-key-paths.ts';
/** @ts-ignore */
import movementsDefinition from '../../../definitions/movement.cjs';

type MovementDao = {};

export function movementDao(sequelize: Sequelize) {
    return sequelize.define(
        movementsDefinition.MODEL_NAME,
        movementsDefinition.DEFINITION,
    );
}

export function toMovementDao(_movement: Movement): MovementDao {
    return {};
}

export function toMovementEntity(model: Model): MovementEntity {
    const dao = model.toJSON<MovementDao & Entity>();
    return {
        createdAt: dao.createdAt,
        id: dao.id,
        updatedAt: dao.updatedAt,
    };
}

export const MOVEMENT_DAO_MAPPER: Partial<
    Record<ObjectKeyPaths<MovementEntity>, keyof (MovementDao & Entity)>
> = {
    createdAt: 'createdAt',
    id: 'id',
    updatedAt: 'updatedAt',
};
