/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("post_comments", (table) => {
    table.increments("id").primary();
    table.integer("post_id").notNullable().references("id").inTable("post").onDelete("CASCADE");
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("comment", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("post_comments");
};
