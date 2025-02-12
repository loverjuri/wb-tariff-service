import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { config } from '../config';
import { logger } from '../logger';
import { TariffRecord } from '../repositories/tariffs';

export class GoogleSheetsService {
  private doc: GoogleSpreadsheet;

  constructor(private sheetId: string) {
    const auth = new JWT({
      email: config.google.serviceAccountEmail,
      key: config.google.privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    this.doc = new GoogleSpreadsheet(sheetId, auth);
  }

  async updateSheet(data: TariffRecord[]): Promise<void> {
    try {
      await this.doc.loadInfo();
      
      const sheet = this.doc.sheetsByTitle['stocks_coefs'] || 
        await this.doc.addSheet({
          title: 'stocks_coefs',
          headerValues: ['Date', 'Warehouse ID', 'Coefficient'],
        });

      // Преобразование данных в правильный формат
      const rows = data.map(item => [
        item.date,
        item.warehouse_id,
        item.coef_box
      ]);

      await sheet.clear();
      await sheet.setHeaderRow(['Date', 'Warehouse ID', 'Coefficient']);
      await sheet.addRows(rows);

      logger.info(`Updated Google Sheet: ${this.sheetId}`);
    } catch (error) {
      logger.error('Google Sheets update failed:', error);
      throw error;
    }
  }
}