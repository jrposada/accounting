import { MovementEntity } from 'shared/models/movement.ts';
import { Query } from 'shared/models/query.ts';
import {
    MOVEMENT_DAO_MAPPER,
    movementDao,
    toMovementEntity,
} from '../infrastructure/data/movement-dao.ts';
import { Postgres } from '../infrastructure/data/postgres.ts';

export class MovementService {
    readonly #db: Postgres<'movement'>;

    constructor() {
        if (
            !process.env.PG_DATABASE ||
            !process.env.PG_HOST ||
            !process.env.PG_PASSWORD ||
            !process.env.PG_ACCESS_PORT ||
            !process.env.PG_USER
        ) {
            throw new Error('Missing db connection data');
        }

        this.#db = new Postgres({
            database: process.env.PG_DATABASE,
            entities: {
                movement: {
                    definition: movementDao,
                    mapper: MOVEMENT_DAO_MAPPER,
                },
            },
            host: process.env.PG_HOST,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_ACCESS_PORT,
            user: process.env.PG_USER,
        });
    }

    async initialize(): Promise<void> {
        await this.#db.connect();
    }

    async get(query: Query): Promise<MovementEntity[]> {
        const dbData = await this.#db.query('movement', query);
        const data = dbData.map((item) => toMovementEntity(item));

        return data;
    }
}
