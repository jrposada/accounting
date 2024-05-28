import { Movement } from 'shared/models/movement.ts';
import { CsvService } from './csv-service.ts';
import { ApiError } from '../api/helpers/api-error.ts';
import moment from 'moment';
import { MovementService } from './movement-service.ts';
import { PdfService } from './pdf-service.ts';

const DATE_PATTERN = 'DD-MM-YYYY';

type Parser = (buffer: Buffer) => Promise<Record<string, string>[]>;
const parsers: Record<string, Parser> = {
    'text/csv': CsvService.from,
    'application/pdf': PdfService.from,
};

export const VALID_MIMETYPES = ['text/csv', 'application/pdf'];

export class StatementService {
    readonly #movementService = new MovementService();

    async initialize(): Promise<void> {
        await this.#movementService.initialize();
    }

    async import(file: Express.Multer.File): Promise<void> {
        if (!VALID_MIMETYPES.includes(file.mimetype)) {
            throw new ApiError(400, `Invalid file format ${file.mimetype}`);
        }

        const parser = parsers[file.mimetype];
        const entries = await parser(file.buffer);

        const movements = entries.map<Movement>((item) => {
            const importNumber = Number(item.import?.replace(',', ''));
            // FIXME: date timezone
            const transactionDate = moment(item.transactionDate, DATE_PATTERN);
            const valueDate = moment(item.valueDate, DATE_PATTERN);

            if (!item.concept) {
                const message =
                    'CSV file contains invalid data. Empty concept.';
                console.error(message, item);
                throw new ApiError(400, message);
            }

            if (!item.import) {
                const message = 'CSV file contains invalid data. Empty import';
                console.error(message, item);
                throw new ApiError(400, message);
            }

            if (isNaN(importNumber)) {
                const message =
                    'CSV file contains invalid data. Import is not a number';
                console.error(message, item);
                throw new ApiError(400, message);
            }

            if (!transactionDate.isValid()) {
                const message =
                    'CSV file contains invalid data. Invalid transaction date.';
                console.error(message, item);
                throw new ApiError(400, message);
            }

            if (!valueDate.isValid()) {
                const message =
                    'CSV file contains invalid data. Invalid value date';
                console.error(message, item);
                throw new ApiError(400, message);
            }

            const movement: Movement = {
                concept: item.concept,
                import: importNumber,
                transactionDate: transactionDate.toDate(),
                valueDate: valueDate.toDate(),
            };

            return movement;
        });

        this.#movementService.create(movements);
    }
}
