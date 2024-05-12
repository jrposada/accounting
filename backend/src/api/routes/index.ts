import { Router } from 'express';
import { getAllMovements } from './movements/get-all/get-all-movements.ts';

const router = Router();

getAllMovements(router);

export { router };
