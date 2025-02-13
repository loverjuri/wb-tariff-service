import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tariffs', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.string('warehouse_id', 50).notNullable();
    table.decimal('coef_box', 10, 2).notNullable();
    table.timestamps(true, true);
    
    table.unique(['date', 'warehouse_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tariffs');
}