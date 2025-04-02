/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_nutri", function (table) {
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("nutri_id").notNullable().references("id").inTable("user_crn").onDelete("CASCADE");
    table.integer("id").notNullable().references("id").inTable("nutri_hour").onDelete("CASCADE").unique();
    table.boolean("finished").notNullable().defaultTo(false);
    table.integer("rating").notNullable().defaultTo(6);
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_nutri"); // Remove a tabela "users"
};
