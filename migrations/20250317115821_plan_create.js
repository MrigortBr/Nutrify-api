/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_plan", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.text("picture").notNullable();
    table.text("recipe").notNullable();
    table.string("nameType").notNullable();
    table.string("name").notNullable();
    table.timestamp("dateInit").notNullable();
    table.timestamp("dateFinal").notNullable();
    table.boolean("marked").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("user_plan");
};
