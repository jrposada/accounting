import { Request, Router } from 'express';
import { Query } from 'shared/models/query.ts';
import { MovementService } from '../../../../services/movement-service.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';

function validate(
    query: Request['query'],
    _data: undefined,
): { data: undefined; query: Query } {
    return { data: undefined, query: new Query(query) };
}

async function handler(query: Query) {
    const service = new MovementService();
    await service.initialize();

    const data = await service.get(query);

    return { status: 200, data };
}

export function getAllMovements(router: Router) {
    /**
     * @swagger
     * /movements:
     *  get:
     *      description: Returns complete list of movements.
     *      responses:
     *          200:
     *              description: html content
     */
    router.get('/movements', apiHandler(handler, validate));
}
