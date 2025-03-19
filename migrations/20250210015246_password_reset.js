/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("password_reset", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("token", 255).notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.raw("NOW()"));
    table.timestamp("expires_at").defaultTo(knex.raw("NOW() + INTERVAL '5 minutes'"));
    table
      .enum("status", ["open", "closed", "expired"], {
        useNative: true,
        enumName: "ENUMstatusPassword",
      })
      .defaultTo("open")
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("password_reset");
};
