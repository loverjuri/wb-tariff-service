import axios from 'axios';
import { config } from '../config';
import { logger } from '../logger';

export interface WbTariff {
  warehouseId: string;
  coefBox: number;
}

export class WildberriesService {
  private readonly apiUrl = 'https://api.wildberries.ru/tariffs/box';

  async fetchTariffs(): Promise<WbTariff[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: { Authorization: config.wb.apiKey },
        timeout: 10000
      });

      return response.data.map((item: any) => ({
        warehouseId: item.warehouseId.toString(),
        coefBox: Number(item.coefBox)
      }));
    } catch (error) {
      logger.error('Wildberries API error:', error);
      throw error;
    }
  }
}