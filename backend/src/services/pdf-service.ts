import pdf from 'pdf-parse';

const transactionPattern =
    / *(?:\d{2}-\d{2}-\d{2})* +(\d{2}-\d{2}-\d{2}) +(\d{2}-\d{2}-\d{2}) +\d+ +(.+?(?=\s\s)) +([\d,\.]+) ([DH])/g;

export class PdfService {
    static from(buffer: Buffer): Promise<Record<string, string>[]> {
        return new Promise(async (resolve) => {
            const data = await pdf(buffer);
            const results: any[] = [];

            let match;
            while ((match = transactionPattern.exec(data.text)) !== null) {
                const importValue = `${match[5] === 'H' ? '+' : '-'}${match[4].replace(/\./g, '').replace(/,/g, '.')}`;
                results.push({
                    import: importValue,
                    concept: match[3].trim(),
                    transactionDate: match[2],
                    valueDate: match[1],
                });
            }

            resolve(results);
        });
    }
}
