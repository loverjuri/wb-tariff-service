import { db } from '../db';
import { WbTariff } from '../services/wildberries';

export interface TariffRecord {
  date: string;
  warehouse_id: string;
  coef_box: number;
}

export class TariffsRepository {
  async upsertDailyTariffs(tariffs: WbTariff[]): Promise<void> {
    const today = new Date().toISOString().split('T')[0];
    const records: TariffRecord[] = tariffs.map(t => ({
      date: today,
      warehouse_id: t.warehouseId,
      coef_box: t.coefBox
    }));

    await db('tariffs')
      .insert(records)
      .onConflict(['date', 'warehouse_id'])
      .merge();
  }

  async getDailyData(date: string): Promise<TariffRecord[]> {
    return db('tariffs')
      .select('*')
      .where('date', date)
      .orderBy('coef_box', 'asc');
  }
}