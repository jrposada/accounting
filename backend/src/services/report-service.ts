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
                        client.literal(
                            `YEAR FROM "valueDate" AT TIME ZONE 'UTC' AT TIME ZONE '+02'`,
                        ),
                    ),
                    'year',
                ],
                [client.fn('SUM', client.col('import')), 'growth'],
                [
                    client.fn(
                        'SUM',
                        client.literal(
                            `CASE WHEN "import" > 0 THEN "import" ELSE 0 END`,
                        ),
                    ),
                    'income',
                ],
                [
                    client.literal(
                        `SUM(CASE WHEN "import" < 0 THEN "import" * -1 ELSE 0 END)`,
                    ),
                    'expense',
                ],
            ],
            group: client.col('year'),
            order: client.col('year'),
            raw: true,
        })) as unknown as {
            expense: number;
            growth: number;
            income: number;
            year: string;
        }[];

        console.log(results);

        return results.map<Report[0]>((item) => ({
            expense: item.expense,
            growth: item.growth,
            income: item.income,
            period: item.year,
        }));
    }
}
