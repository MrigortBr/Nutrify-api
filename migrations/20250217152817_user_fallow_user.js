/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_follow_user", (table) => {
    table.increments("id").primary();
    table.integer("follower").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("following").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.unique(["follower", "following"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  table;
};
