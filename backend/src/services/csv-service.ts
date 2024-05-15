import csvParser from 'csv-parser';
import { Readable } from 'node:stream';

export class CsvService {
    static from(buffer: Buffer): Promise<Record<string, string>[]> {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            Readable.from(buffer)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
}
