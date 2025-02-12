import { db } from './db';
import { Scheduler } from './jobs';
import { logger } from './logger';

async function bootstrap() {
  try {
    // Проверка подключения к БД
    await db.raw('SELECT 1');
    logger.info('Database connected');

    // Применение миграций
    await db.migrate.latest();
    logger.info('Migrations applied');

    // Запуск планировщика
    new Scheduler().start();
    logger.info('Scheduler started');

  } catch (error) {
    logger.error('Bootstrap failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.destroy();
  logger.info('Application stopped');
  process.exit(0);
});

bootstrap();