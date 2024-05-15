import { Movement } from 'shared/models/movement.ts';
import { CsvService } from './csv-service.ts';
import { ApiError } from '../api/helpers/api-error.ts';
import moment from 'moment';
import { MovementService } from './movement-service.ts';

const DATE_PATTERN = 'DD-MM-YYYY';

export class StatementService {
    readonly #movementService = new MovementService();

    async initialize(): Promise<void> {
        await this.#movementService.initialize();
    }

    async import(file: Express.Multer.File): Promise<void> {
        const entries = await CsvService.from(file.buffer);

        const movements = entries.map<Movement>((item) => {
            const importNumber = Number(item.import?.replace(',', ''));
            const transactionDate = moment(item.transactionDate, DATE_PATTERN);
            const valueDate = moment(item.valueDate, DATE_PATTERN);

            if (!item.concept) {
                console.error(item);
                throw new ApiError(
                    400,
                    'CSV file contains invalid data. Empty concept.',
                );
            }

            if (!item.import) {
                console.error(item);
                throw new ApiError(
                    400,
                    'CSV file contains invalid data. Empty import',
                );
            }

            if (isNaN(importNumber)) {
                console.error(item);
                throw new ApiError(
                    400,
                    'CSV file contains invalid data. Import is not a number',
                );
            }

            if (!transactionDate.isValid()) {
                console.error(item);
                throw new ApiError(
                    400,
                    'CSV file contains invalid data. Invalid transaction date.',
                );
            }

            if (!valueDate.isValid()) {
                console.error(item);
                throw new ApiError(
                    400,
                    'CSV file contains invalid data. Invalid value date',
                );
            }

            const movement: Movement = {
                concept: item.concept,
                import: importNumber,
                transactionDate: transactionDate.toDate(),
                valueDate: valueDate.toDate(),
            };

            return movement;
        });

        this.#movementService.post(movements);

        console.log(movements);
    }
}
