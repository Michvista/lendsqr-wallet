export async function up(knex) {
  return knex.schema.createTable("wallets", table => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.decimal("balance", 14, 2).notNullable().defaultTo(0.0);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("wallets");
}
