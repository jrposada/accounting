import { Report } from 'shared/models/report.ts';
import { MovementService } from '../infrastructure/data/movement-service.ts';

export class ReportService {
    readonly #movementService = new MovementService();

    async initialize(): Promise<void> {
        await this.#movementService.initialize();
    }

    async generate(): Promise<Report> {
        const client = this.#movementService.client;
        const results = (await this.#movementService.dao.findAll({
            attributes: [
                [
                    client.fn(
                        'EXTRACT',
                        client.literal(`YEAR FROM "valueDate"`),
                    ),
                    'year',
                ],
                [client.fn('SUM', client.col('import')), 'import'],
            ],
            group: client.col('year'),
            order: client.col('year'),
            raw: true,
        })) as unknown as { year: string; import: number }[];

        console.log(results);

        return results.map<Report[0]>((item) => ({
            data: [item.import],
            period: item.year,
        }));
    }
}
