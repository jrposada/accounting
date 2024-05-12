import {
    DataTypes,
    Model,
    ModelStatic,
    Op,
    Optional,
    Sequelize,
} from 'sequelize';
import { Query } from 'shared/models/query.ts';

type EntityConfig = {
    definition: (sequelize: Sequelize) => ModelStatic<Model>;
    mapper: Record<string, string>;
};

type Entities<TEntityType extends string> = Record<
    TEntityType,
    { dao: ModelStatic<Model>; mapper: EntityConfig['mapper'] }
>;

export class Postgres<TEntityType extends string> {
    readonly #client: Sequelize;
    readonly #entities: Readonly<Entities<TEntityType>>;

    constructor(
        private readonly config: {
            database: string;
            entities: Record<TEntityType, EntityConfig>;
            host: string;
            password: string;
            port: string;
            user: string;
        },
    ) {
        this.#client = new Sequelize(
            `postgres://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}`,
        );

        this.#entities = Object.entries<EntityConfig>(config.entities).reduce<
            Entities<TEntityType>
        >(
            (acc, [key, { definition, mapper }]) => ({
                ...acc,
                [key as TEntityType]: { dao: definition(this.#client), mapper },
            }),
            {} as Entities<TEntityType>,
        );
    }

    async connect() {
        try {
            await this.#client.authenticate();
            console.log(
                'Connection with database has been established successfully.',
            );
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }

    async create<TData extends Optional<any, string> | undefined>(
        type: TEntityType,
        dao: TData,
    ): Promise<Model> {
        const dbData = await this.#entities[type].dao.create(dao);
        return dbData;
    }

    async query(type: TEntityType, query: Query): Promise<Model[]> {
        const entity = this.#entities[type];

        const dbQuery: { where: any } = {
            where: {},
        };
        query.filters.forEach((filter) => {
            const dbField = entity.mapper[filter.field];
            if (!dbField) {
                console.warn('Unknown filter', {
                    field: filter.field,
                    dbField,
                });
                return;
            }

            const attributeType = entity.dao.getAttributes()[dbField].type;

            if (filter.value) {
                dbQuery.where[dbField] = filter.value;
            } else if (attributeType instanceof DataTypes.INTEGER) {
                dbQuery.where[dbField] = {
                    [Op.and]: [
                        {
                            [Op.ne]: null,
                        },
                        {
                            [Op.ne]: 0,
                        },
                    ],
                };
            } else if (attributeType instanceof DataTypes.STRING) {
                dbQuery.where[dbField] = {
                    [Op.and]: [
                        {
                            [Op.ne]: null,
                        },
                        {
                            [Op.ne]: '',
                        },
                    ],
                };
            }
        });

        console.log(dbQuery);
        const dbData = await entity.dao.findAll(dbQuery);
        return dbData;
    }
}
