import { Router } from 'express';
import { getAllMovements } from './movements/get-all/get-all-movements.ts';
import { generateReport } from './report/generate/generate-report.ts';
import { postStatements } from './statements/post/post-statements.ts';

const router = Router();

generateReport(router);
getAllMovements(router);
postStatements(router);

export { router };
