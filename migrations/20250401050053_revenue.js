/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("nutri_revenue", function (table) {
    table.increments("id").primary();
    table.integer("nutri_id").notNullable().references("id").inTable("user_crn").onDelete("CASCADE");
    table.text("picture").notNullable();
    table.string("name").notNullable();
    table.string("nameType").notNullable();
    table.timestamp("dateInit").notNullable();
    table.timestamp("dateFinal").notNullable();
    table.float("kcal").notNullable();
    table.text("recipe").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("nutri_revenue");
};
