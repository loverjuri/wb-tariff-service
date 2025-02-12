import { scheduleJob } from 'node-schedule';
import { WildberriesService } from './services/wildberries';
import { TariffsRepository } from './repositories/tariffs';
import { GoogleSheetsService } from './services/google-sheets';
import { config } from './config';
import { logger } from './logger';

export class Scheduler {
  private wbService = new WildberriesService();
  private tariffsRepo = new TariffsRepository();

  start() {
    // Ежечасное обновление данных
    scheduleJob('0 * * * *', async () => {
      try {
        const tariffs = await this.wbService.fetchTariffs();
        await this.tariffsRepo.upsertDailyTariffs(tariffs);
        logger.info('Tariffs data updated successfully');
      } catch (error) {
        logger.error('Failed to update tariffs:', error);
      }
    });

    // Ежедневный экспорт в Google Sheets в 23:59
    scheduleJob('59 23 * * *', async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const data = await this.tariffsRepo.getDailyData(today);
        
        for (const sheetId of config.google.sheetIds) {
          const sheetsService = new GoogleSheetsService(sheetId);
          await sheetsService.updateSheet(data);
        }
        
        logger.info('Data exported to Google Sheets');
      } catch (error) {
        logger.error('Google Sheets export failed:', error);
      }
    });
  }
}