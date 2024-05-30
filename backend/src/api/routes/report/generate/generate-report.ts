import { Request, Router } from 'express';
import { ReportService } from '../../../../services/report-service.ts';
import { apiHandler } from '../../../helpers/api-handler.ts';

function validate(
    _query: Request['query'],
    _data: undefined,
): { query: undefined; data: undefined } {
    return { query: undefined, data: undefined };
}

async function handler(_query: undefined, _data: undefined) {
    const service = new ReportService();
    await service.initialize();

    const report = await service.generate();

    return { status: 200, data: report };
}

export function generateReport(router: Router) {
    /**
     * @swagger
     * /report/generate:
     *  post:
     *      description: Generate report.
     *      responses:
     *          200:
     *              description: html content
     */
    router.post('/report/generate', apiHandler(handler, validate));
}
