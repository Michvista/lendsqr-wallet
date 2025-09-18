exports.up = function(knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.integer("wallet_id").unsigned().references("id").inTable("wallets");
    table.enum("type", ["deposit", "withdrawal", "transfer"]);
    table.decimal("amount", 14, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("transactions");
};
