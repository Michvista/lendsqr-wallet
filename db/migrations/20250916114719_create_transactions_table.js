export async function up(knex) {
  return knex.schema.createTable("transactions", table => {
    table.increments("id").primary();
    table.integer("from_wallet").unsigned().references("id").inTable("wallets");
    table.integer("to_wallet").unsigned().references("id").inTable("wallets");
    table.decimal("amount", 14, 2).notNullable();
    table.enu("type", ["FUND", "TRANSFER", "WITHDRAW"]).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  return knex.schema.dropTable("transactions");
}

