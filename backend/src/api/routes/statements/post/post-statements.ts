import { Request, Router } from 'express';
import { apiHandler } from '../../../helpers/api-handler.ts';
import { StatementService } from '../../../../services/statement-service.ts';
import multer from 'multer';
import { ApiError } from '../../../helpers/api-error.ts';

const upload = multer();

function validate(
    _query: Request['query'],
    data: Express.Multer.File,
): { data: Express.Multer.File; query: undefined } {
    if (!data) {
        throw new ApiError(400, 'No file uploaded');
    }

    if (data.mimetype !== 'text/csv') {
        throw new ApiError(400, 'File is not a valid CSV');
    }

    return { data, query: undefined };
}

async function handler(_query: undefined, data: Express.Multer.File) {
    const service = new StatementService();
    await service.initialize();

    await service.import(data);

    return { status: 200 };
}

export function postStatements(router: Router) {
    /**
     * @swagger
     * /statements:
     *  post:
     *      description: Import statements file into the system.
     *      responses:
     *          200:
     *              description: html content
     */
    router.post(
        '/statements',
        upload.single('file'),
        apiHandler(handler, validate),
    );
}
