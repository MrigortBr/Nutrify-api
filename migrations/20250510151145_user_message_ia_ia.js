/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_message_ia", (table) => {
    table.increments("id").primary();
    table.integer("user").notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.string("message").notNullable();
    table
      .enum("sender", ["user", "assistant"], {
        useNative: true,
        enumName: "ENUMSender",
      })
      .defaultTo("user")
      .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("read").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return kenx.schema.dropTable("user_message_ia");
};
