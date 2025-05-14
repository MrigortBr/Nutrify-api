/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("nutri_hour", (table) => {
    table.increments("id").primary();
    table.integer("nutri_id").notNullable().references("id").inTable("user_crn").onDelete("CASCADE");
    table.timestamp("service_init").notNullable();
    table.timestamp("service_final").notNullable();
    table.boolean("void").notNullable().defaultTo(true);
    table.float("price").notNullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("nutri_hour");
};
