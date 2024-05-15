import { Router } from 'express';
import { getAllMovements } from './movements/get-all/get-all-movements.ts';
import { postStatements } from './statements/post/post-statements.ts';

const router = Router();

getAllMovements(router);
postStatements(router);

export { router };
