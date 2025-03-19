/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("post_user_marked", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("post_id").notNullable().references("id").inTable("post").onDelete("CASCADE");
    table
      .enum("status", ["marked", "requested"], {
        useNative: true,
        enumName: "ENUMSatatusMarked",
      })
      .defaultTo("marked")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("post_user_marked");
};
